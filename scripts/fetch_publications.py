"""Fetch publications from the ORCID public API (with Semantic Scholar as
fallback) and write publications.json for the site.

The ORCID record is used as the source of truth for WHICH works belong to
the author. Each work with a DOI is enriched with authors/venue via
Crossref. All APIs are free and keyless.

Configuration via environment variables (set in the workflow file):
  ORCID        e.g. 0000-0002-1825-0097  (preferred)
  S2_AUTHOR_ID Semantic Scholar author id (fallback if no ORCID)
"""

import json
import os
import sys
import urllib.request
from datetime import datetime, timezone

UA = {"User-Agent": "personal-site-publications-bot (github pages site)"}


def get_json(url, accept=None):
    headers = dict(UA)
    if accept:
        headers["Accept"] = accept
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.load(resp)


def crossref_enrich(doi):
    """Return (authors, venue, year) for a DOI, best effort."""
    try:
        msg = get_json(f"https://api.crossref.org/works/{doi}")["message"]
    except Exception:
        return None, None, None
    names = [
        f"{a.get('given', '')} {a.get('family', '')}".strip()
        for a in msg.get("author", [])
        if a.get("family")
    ]
    authors = None
    if names:
        authors = ", ".join(names[:8]) + (" et al." if len(names) > 8 else "")
    venue = (msg.get("container-title") or [None])[0]
    year = None
    parts = (msg.get("issued") or {}).get("date-parts") or [[None]]
    if parts[0][0]:
        year = parts[0][0]
    return authors, venue, year


def from_orcid(orcid):
    data = get_json(
        f"https://pub.orcid.org/v3.0/{orcid}/works", accept="application/json"
    )
    pubs = []
    for group in data.get("group", []):
        ws = group["work-summary"][0]
        title = ((ws.get("title") or {}).get("title") or {}).get("value")
        if not title:
            continue

        year = None
        pub_date = ws.get("publication-date")
        if pub_date and pub_date.get("year"):
            year = int(pub_date["year"]["value"])

        doi = None
        for eid in (ws.get("external-ids") or {}).get("external-id", []):
            if eid.get("external-id-type") == "doi":
                doi = eid.get("external-id-value")
                break

        venue = (ws.get("journal-title") or {}).get("value")
        url = f"https://doi.org/{doi}" if doi else (ws.get("url") or {}).get("value")

        authors = None
        if doi:
            cr_authors, cr_venue, cr_year = crossref_enrich(doi)
            authors = cr_authors
            venue = venue or cr_venue
            year = year or cr_year

        pubs.append(
            {
                "title": title,
                "authors": authors,
                "venue": venue,
                "year": year,
                "url": url,
            }
        )
    return pubs, "ORCID"


def from_semantic_scholar(author_id):
    url = (
        f"https://api.semanticscholar.org/graph/v1/author/{author_id}/papers"
        "?fields=title,year,venue,externalIds,authors&limit=1000"
    )
    data = get_json(url)
    pubs = []
    for p in data.get("data", []):
        doi = (p.get("externalIds") or {}).get("DOI")
        pubs.append(
            {
                "title": p.get("title"),
                "authors": ", ".join(a["name"] for a in p.get("authors", [])[:8]),
                "venue": p.get("venue") or None,
                "year": p.get("year"),
                "url": f"https://doi.org/{doi}" if doi else None,
            }
        )
    return pubs, "Semantic Scholar"


def main():
    orcid = os.environ.get("ORCID", "").strip()
    s2_id = os.environ.get("S2_AUTHOR_ID", "").strip()

    if orcid:
        pubs, source = from_orcid(orcid)
    elif s2_id:
        pubs, source = from_semantic_scholar(s2_id)
    else:
        sys.exit("Set ORCID or S2_AUTHOR_ID in .github/workflows/publications.yml")

    # Drop entries without a title and dedupe by normalized title.
    seen, clean = set(), []
    for p in pubs:
        if not p["title"]:
            continue
        key = "".join(p["title"].lower().split())
        if key in seen:
            continue
        seen.add(key)
        clean.append(p)

    # Preserve manually added "image" fields from the previous file
    # (matched by title), so they survive the weekly regeneration.
    def norm(t):
        return "".join((t or "").lower().split())

    try:
        with open("publications.json", encoding="utf-8") as f:
            images = {
                norm(p.get("title")): p["image"]
                for p in json.load(f).get("publications", [])
                if p.get("image")
            }
    except (OSError, json.JSONDecodeError):
        images = {}
    for p in clean:
        img = images.get(norm(p["title"]))
        if img:
            p["image"] = img

    out = {
        "source": source,
        "updated": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "publications": clean,
    }
    with open("publications.json", "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
    print(f"Wrote {len(clean)} publications from {source}")


if __name__ == "__main__":
    main()
