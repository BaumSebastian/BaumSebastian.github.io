/* ======================================================================
   EDIT THIS BLOCK — the only place you need to touch for personal data
   ====================================================================== */
const CONFIG = {
  githubUser: "BaumSebastian",
  links: [
    ["github", "https://github.com/BaumSebastian"],
    ["orcid", "https://orcid.org/0009-0001-0604-8764"],
    ["scholar", "https://scholar.google.com/citations?user=_0U53GAAAAAJ"],
    ["stackoverflow", "https://stackoverflow.com/users/11621951/sebastian-baum"],
    ["kaggle", "https://www.kaggle.com/baumsebastian"],
    ["huggingface", "https://huggingface.co/BaumSebastian"],
  ],
};
/* ====================================================================== */

/* Pinned repos live in pinned.json (list of "owner/repo" strings). */

const $ = (id) => document.getElementById(id);

/* ---------- theme toggle ---------- */
const toggle = $("theme-toggle");
function syncToggleLabel() {
  toggle.textContent = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
}
toggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
  syncToggleLabel();
});
syncToggleLabel();

/* ---------- helpers ---------- */
function relTime(iso) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  const units = [[31536000, "y"], [2592000, "mo"], [604800, "w"], [86400, "d"], [3600, "h"], [60, "m"]];
  for (const [sec, label] of units) {
    if (s >= sec) return `${Math.floor(s / sec)}${label} ago`;
  }
  return "just now";
}

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------- link icons (inline SVG paths from simple-icons, CC0) ---------- */
const ICONS = {
  github:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  orcid:
    "M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z",
  scholar:
    "M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z",
  stackoverflow:
    "M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.154z",
  kaggle:
    "M.1025 7.3475c-.0681 0-.1022.0341-.1022.102v6.752c0 .0681.034.1022.1022.1022h.7049c.068 0 .1022-.034.1022-.1023v-1.481l.4187-.3985 1.5016 1.91c.041.0477.0884.0716.143.0716h.9091c.0476 0 .0748-.0135.0817-.0407.0135-.041.0066-.075-.0206-.1023l-1.9816-2.4618 1.9002-1.8384c.0204-.0205.0237-.051.01-.092-.0137-.0339-.0408-.051-.0816-.051h-.9398c-.0477 0-.0953.024-.143.0716L.9096 11.607V7.4496c0-.0679-.0342-.102-.1022-.102zm18.0417 0c-.068 0-.102.0341-.102.102v6.752c0 .0681.034.102.102.102h.705c.068 0 .102-.034.102-.102v-6.752c0-.068-.034-.102-.102-.102zM5.961 9.6254c-.5653 0-1.11.1806-1.6343.5415-.0545.0545-.0648.102-.0307.143l.3676.5208c.0272.0477.0717.0545.133.0204.3948-.2722.783-.4086 1.1644-.4086.2927 0 .5158.0886.669.2656.1532.1771.2197.3917.1992.6436-.6606.0681-1.1545.1495-1.4813.245-.8308.2383-1.2461.6913-1.2461 1.3586 0 .4222.1533.7695.4598 1.0419.3132.2654.6845.3982 1.1134.3982.4698 0 .8545-.1125 1.1542-.3372v.1432c0 .0682.0374.102.1123.102h.7048c.068 0 .102-.0338.102-.102V11.372c0-.6604-.2245-1.1406-.6739-1.4403-.3065-.2043-.6776-.3063-1.1134-.3063zm4.3225 0c-.6742 0-1.195.2622-1.5627.7865-.3133.4359-.4699.9671-.4699 1.5936 0 .6604.1634 1.2087.4903 1.6444.3744.4972.892.7455 1.5526.7455.5313 0 .9567-.1327 1.2768-.3982v.531c0 .858-.4122 1.287-1.236 1.287-.361 0-.732-.1907-1.1132-.572a.098.098 0 00-.0716-.0306c-.034 0-.0613.0102-.0817.0307l-.4802.48c-.0408.0613-.0375.1124.0103.1532.1361.1157.2554.2129.3576.2911.102.0783.1905.1413.2656.189.354.1975.7284.2961 1.1235.2961.6808 0 1.207-.1925 1.5781-.577.3711-.3848.5567-.9484.5567-1.6903V9.8196c0-.068-.034-.102-.102-.102h-.705c-.0682 0-.1021.034-.1021.102v.2043c-.3471-.2657-.7763-.3985-1.287-.3985zm4.8021 0c-.6742 0-1.195.2622-1.5627.7865-.3132.4359-.4699.9671-.4699 1.5936 0 .6604.1633 1.2087.4903 1.6444.3744.4972.892.7455 1.5526.7455.5311 0 .9566-.1327 1.2768-.3982v.531c0 .858-.4122 1.287-1.236 1.287-.361 0-.732-.1907-1.1133-.572a.098.098 0 00-.0716-.0306c-.034 0-.0612.0102-.0816.0307l-.48.48c-.0409.0613-.0376.1124.01.1532.1363.1157.2555.2129.3576.2911.1021.0783.1906.1413.2657.189.354.1975.7285.2961 1.1237.2961.6808 0 1.2068-.1925 1.5781-.577.371-.3848.5565-.9484.5565-1.6903V9.8196c0-.068-.034-.102-.102-.102h-.7049c-.0682 0-.1022.034-.1022.102v.2043c-.3474-.2657-.7763-.3985-1.287-.3985zm6.7457 0c-.6537 0-1.185.211-1.5936.6332-.4427.4632-.664 1.0283-.664 1.6956 0 .7083.225 1.2905.6743 1.7467.463.463 1.042.6945 1.7366.6945.6467 0 1.2154-.1838 1.7057-.5515.0545-.041.0545-.0884 0-.143l-.4802-.4903c-.041-.0409-.0919-.0409-.1533 0-.2998.2112-.6368.3167-1.0112.3167-.4222 0-.7729-.119-1.052-.3576-.2452-.2248-.3882-.5038-.429-.8375h3.3197c.0679 0 .1022-.0341.1022-.1023l.01-.2244c.0341-.6878-.1668-1.26-.6025-1.7162-.4224-.4426-.9432-.664-1.5627-.664zm-.0206.7865c.3268 0 .6062.1056.8377.3166.2452.211.371.4734.378.7865h-2.4618c.0613-.3269.2077-.5925.4392-.7968.2313-.2042.5004-.3063.8069-.3063zm-11.4249.102c.6196 0 1.0146.2181 1.1848.6538v1.6854c-.1702.4358-.5755.6538-1.2155.6538-.3133 0-.5687-.0986-.7661-.2963-.2656-.2518-.3983-.6538-.3983-1.2053 0-.9941.3984-1.4914 1.1951-1.4914zm4.802 0c.6196 0 1.0148.2181 1.1851.6538h-.0002v1.6854c-.1703.4358-.5755.6538-1.2155.6538-.3132 0-.5686-.0986-.7661-.2963-.2655-.2518-.3983-.6538-.3983-1.2053 0-.9941.3983-1.4914 1.195-1.4914zm-8.3586 1.6547v1.0215c-.286.286-.6675.412-1.1441.3779-.1703-.0135-.32-.0663-.4493-.1582-.1294-.0919-.2045-.2129-.2249-.3627-.0341-.2657.1158-.47.4495-.6129.2452-.1088.7013-.1974 1.3688-.2656z",
  huggingface:
    "M1.4446 11.5059c0 1.1021.1673 2.1585.4847 3.1563-.0378-.0028-.0691-.0058-.1058-.0058-.4209 0-.8015.16-1.0704.4512-.3454.3737-.4984.8335-.4316 1.293a1.576 1.576 0 0 0 .2148.5978c-.2319.1864-.4018.4456-.4844.7578-.0646.2448-.131.7543.2149 1.2794a1.4552 1.4552 0 0 0-.0625.1055c-.208.3923-.2207.8372-.0371 1.25.2783.6258.9696 1.1175 2.3126 1.6467.8356.3292 1.5988.5411 1.6056.543 1.1046.2847 2.104.4277 2.969.4277 1.4173 0 2.4754-.3849 3.1525-1.1446 1.538.2651 2.791.1403 3.592.006.6773.7555 1.7332 1.1387 3.1467 1.1387.8649 0 1.8643-.143 2.969-.4278.0068-.0019.77-.2138 1.6056-.543 1.343-.5292 2.0343-1.0208 2.3126-1.6466.1836-.4129.171-.8577-.037-1.25a1.4685 1.4685 0 0 0-.0626-.1056c.346-.525.2795-1.0346.2149-1.2793-.0826-.3122-.2525-.5714-.4844-.7579.11-.1816.1831-.3788.2148-.5977.0669-.4595-.0862-.9193-.4316-1.293-.2688-.2913-.6495-.4513-1.0704-.4513-.0209 0-.0376.0008-.0588.0018.3162-.9966.4846-2.0518.4846-3.1523 0-5.807-4.7362-10.5144-10.5789-10.5144-5.8426 0-10.5788 4.7073-10.5788 10.5144Zm10.5788-9.4831c5.2727 0 9.5476 4.246 9.5476 9.483a9.4201 9.4201 0 0 1-.2696 2.2365c-.0039-.0047-.0079-.011-.0117-.0156-.274-.3255-.6679-.5059-1.1075-.5059-.352 0-.714.1155-1.0763.3438-.2403.1517-.5058.422-.7793.7598-.2534-.3492-.608-.5832-1.0137-.6465a1.5174 1.5174 0 0 0-.2344-.0176c-.9263 0-1.4828.7993-1.6935 1.5177-.1046.2426-.6065 1.3482-1.3614 2.0978-1.1681 1.1601-1.4458 2.3534-.8396 3.6382-.843.1029-1.5836.0927-2.365-.006.5906-1.212.3626-2.4388-.8426-3.6322-.755-.7496-1.2568-1.8552-1.3614-2.0978-.2107-.7184-.7673-1.5177-1.6935-1.5177-.078 0-.1568.0054-.2344.0176-.4057.0633-.7604.2973-1.0137.6465-.2735-.3379-.539-.6081-.7794-.7598-.3622-.2283-.7243-.3438-1.0762-.3438-.4266 0-.8094.171-1.0821.4786a9.4208 9.4208 0 0 1-.2598-2.1936c0-5.237 4.2749-9.483 9.5475-9.483zM8.6443 7.0036c-.4838.0043-.9503.2667-1.1934.7227-.3536.6633-.1006 1.4873.5645 1.84.351.1862.4883-.5261.836-.6485.3107-.1095.841.399 1.0078.086.3536-.6634.1025-1.4874-.5625-1.84a1.3659 1.3659 0 0 0-.6524-.1602Zm6.8403 0c-.2199-.002-.4426.05-.6504.1602-.665.3526-.9181 1.1766-.5645 1.84.1669.313.6971-.1955 1.0079-.086.3476.1224.4867.8347.838.6485.6649-.3527.916-1.1767.5624-1.84-.243-.456-.7096-.7184-1.1934-.7227Zm-9.7565 1.418a.8768.8768 0 0 0-.877.877c0 .4846.3925.877.877.877a.8768.8768 0 0 0 .877-.877.8768.8768 0 0 0-.877-.877zm12.6434 0c-.4845 0-.879.3925-.879.877 0 .4846.3945.877.879.877a.8768.8768 0 0 0 .877-.877.8768.8768 0 0 0-.877-.877zM8.7927 11.459c-.179-.003-.2793.1107-.2793.416 0 .8097.3874 2.125 1.4279 2.924.207-.7123 1.3453-1.2832 1.5079-1.2012.2315.1167.2191.4417.6074.7266.3884-.285.374-.6098.6056-.7266.1627-.082 1.3009.4889 1.5079 1.2012 1.0404-.799 1.4278-2.1144 1.4278-2.924 0-1.2212-1.583.6402-3.5413.6485-1.4686-.0061-2.7266-1.0558-3.2639-1.0645zM4.312 14.4768c.5792.365 1.6964 2.2751 2.1056 3.0177.1371.2488.371.3536.582.3536.4188 0 .7465-.4138.0391-.9395-1.0636-.791-.6914-2.0846-.1836-2.1642a.4302.4302 0 0 1 .0664-.004c.4616 0 .666.7892.666.7892s.5959 1.4898 1.6213 2.508c.942.9356 1.062 1.703.4961 2.6661-.0164-.004-.0159.0236-.1484.2149-.1853.2673-.4322.4688-.7188.6152-.5062.2269-1.1397.2696-1.7833.2696-1.037 0-2.1017-.1824-2.6975-.336-.0293-.0075-3.6505-.9567-3.1916-1.8224.0771-.1454.2033-.2031.3633-.2031.6463 0 1.823.9551 2.3283.9551.113 0 .196-.0865.2285-.2031.2249-.8045-3.2787-1.0522-2.9846-2.1642.0519-.1967.193-.2757.3907-.2754.854 0 2.7704 1.4923 3.172 1.4923.0307 0 .0525-.0085.0645-.0274.2012-.3227.1096-.5865-1.3087-1.4395-1.4182-.8533-2.4315-1.329-1.8653-1.9416.0651-.0707.1574-.1015.2695-.1015.8611.0002 2.8948 1.84 2.8948 1.84s.5487.5683.8809.5683c.0762 0 .1416-.0315.1855-.1054.2355-.3946-2.1858-2.2183-2.3224-2.971-.0926-.51.0641-.7676.3555-.7676-.0006.008.1701-.0285.4942.1759zm16.2257.5918c-.1366.7526-2.5579 2.5764-2.3224 2.9709.044.074.1092.1055.1855.1055.3321 0 .881-.5684.881-.5684s2.0336-1.8397 2.8947-1.84c.1121 0 .2044.0308.2695.1016.5662.6125-.447 1.0882-1.8653 1.9415-1.4183.853-1.51 1.1168-1.3087 1.4396.012.0188.0337.0273.0644.0273.4016 0 2.3181-1.4923 3.1721-1.4923.1977-.0002.3388.0787.3907.2754.294 1.112-3.2095 1.3597-2.9846 2.1642.0325.1166.1156.2032.2285.2032.5054 0 1.682-.9552 2.3283-.9552.16 0 .2862.0577.3633.2032.459.8656-3.1623 1.8149-3.1916 1.8224-.5958.1535-1.6605.336-2.6975.336-.6351 0-1.261-.0409-1.7638-.2599-.2949-.1472-.5488-.3516-.7383-.625-.0411-.0682-.1026-.1476-.1426-.205-.5726-.9679-.455-1.7371.4903-2.676 1.0254-1.0182 1.6212-2.508 1.6212-2.508s.2044-.7891.666-.7891a.4318.4318 0 0 1 .0665.0039c.5078.0796.88 1.3732-.1836 2.1642-.7074.5257-.3797.9395.039.9395.211 0 .445-.1047.5821-.3535.4092-.7426 1.5264-2.6527 2.1056-3.0178.5588-.3524.99-.1816.8497.5918z",
};

function iconSvg(name) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("class", "icon");
  svg.setAttribute("aria-hidden", "true");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", ICONS[name]);
  svg.appendChild(path);
  return svg;
}

/* ---------- about ---------- */
function renderAbout() {
  $("source-link").href = `https://github.com/${CONFIG.githubUser}/${CONFIG.githubUser}.github.io`;
  const links = $("contact-links");
  for (const [label, href] of CONFIG.links) {
    const a = el("a", "contact-link");
    a.href = href;
    if (ICONS[label]) a.appendChild(iconSvg(label));
    a.appendChild(el("span", null, label));
    links.appendChild(a);
    links.appendChild(document.createTextNode(" "));
  }
}

/* ---------- publications (from publications.json, refreshed by CI) ---------- */
async function renderPublications() {
  const meta = $("pub-meta");
  try {
    const res = await fetch("publications.json", { cache: "no-cache" });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    const pubs = (data.publications || []).sort((a, b) => (b.year || 0) - (a.year || 0));

    if (!pubs.length) {
      meta.textContent = "no publications found — check the fetch action logs";
      return;
    }
    meta.textContent = data.updated
      ? `${pubs.length} entries · updated ${data.updated.slice(0, 10)}`
      : `${pubs.length} entries`;

    const list = $("pub-list");
    for (const p of pubs) {
      const li = el("li");
      const text = el("div", "pub-text");
      const title = el("a", "pub-title", p.title);
      if (p.url) title.href = p.url;
      text.appendChild(title);

      const detail = el("span", "pub-detail");
      detail.innerHTML =
        `<span class="pub-year">${p.year || ""}</span>` +
        (p.venue ? ` · ${escapeHtml(p.venue)}` : "") +
        (p.authors ? ` · ${escapeHtml(p.authors)}` : "");
      text.appendChild(detail);
      li.appendChild(text);

      // Optional visualization to the right (set "image" in publications.json).
      if (p.image) {
        const img = el("img", "pub-image");
        img.src = p.image;
        img.alt = "";
        img.loading = "lazy";
        img.addEventListener("error", () => img.remove());
        li.appendChild(img);
      }
      list.appendChild(li);
    }
  } catch (err) {
    meta.textContent = `could not load publications.json (${err.message})`;
  }
}

/* ---------- pinned repos (live from the public GitHub API) ---------- */
async function renderRepos() {
  const container = $("repo-list");
  let pinned;
  try {
    pinned = await (await fetch("pinned.json", { cache: "no-cache" })).json();
  } catch {
    container.textContent = "could not load pinned.json";
    return;
  }
  container.textContent = "";

  const cards = await Promise.all(pinned.map(async (entry) => {
    const full = typeof entry === "string" ? entry : entry.repo;
    const slug = full.includes("/") ? full : `${CONFIG.githubUser}/${full}`;
    try {
      const repo = await ghJson(`https://api.github.com/repos/${slug}`);
      // Prefer the latest release ("new patch"), fall back to the latest commit.
      let update;
      const rel = await ghJson(`https://api.github.com/repos/${slug}/releases/latest`).catch(() => null);
      if (rel && rel.tag_name) {
        update = { label: `release ${rel.tag_name}`, when: rel.published_at, url: rel.html_url };
      } else {
        update = { label: "last push", when: repo.pushed_at, url: repo.html_url };
      }
      return { repo, update, icon: typeof entry === "object" ? entry.icon : null };
    } catch {
      return { error: slug };
    }
  }));

  for (const c of cards) {
    if (c.error) {
      container.appendChild(el("p", "muted small", `could not fetch ${c.error}`));
      continue;
    }
    const { repo, update } = c;
    const card = el("div", "repo-card");

    const main = el("div", "repo-main");
    const name = el("a", "repo-name", repo.full_name);
    name.href = repo.html_url;
    main.appendChild(name);

    if (repo.description) main.appendChild(el("p", "repo-desc", repo.description));

    const upd = el("p", "repo-update");
    const updLink = el("a", null, update.label);
    updLink.href = update.url;
    upd.appendChild(updLink);
    upd.appendChild(el("span", "when", ` · ${relTime(update.when)}`));
    main.appendChild(upd);
    card.appendChild(main);

    // Right column: stars on top, repo icon (from pinned.json) below.
    const side = el("div", "repo-side");
    side.appendChild(el("span", "stars", `★ ${repo.stargazers_count}`));
    if (c.icon) {
      const icon = el("img", "repo-icon");
      icon.src = c.icon;
      icon.alt = "";
      icon.loading = "lazy";
      icon.addEventListener("error", () => icon.remove());
      side.appendChild(icon);
    }
    card.appendChild(side);

    container.appendChild(card);
  }
}

/* ---------- attendances (from attendances.json) ---------- */
async function renderAttendances() {
  const list = $("attendance-list");
  try {
    const items = await (await fetch("attendances.json", { cache: "no-cache" })).json();
    list.textContent = "";
    items.sort((a, b) => (b.year || 0) - (a.year || 0));
    for (const it of items) {
      const li = el("li");
      const text = el("div", "pub-text");
      const title = el(it.url ? "a" : "span", "pub-title", it.title);
      if (it.url) title.href = it.url;
      text.appendChild(title);

      const detail = el("span", "pub-detail");
      detail.innerHTML =
        `<span class="pub-year">${it.year || ""}</span>` +
        (it.type ? ` · ${escapeHtml(it.type)}` : "") +
        (it.location ? ` · ${escapeHtml(it.location)}` : "");
      text.appendChild(detail);

      if (it.project) {
        const proj = el("span", "pub-detail");
        proj.appendChild(document.createTextNode("project: "));
        const a = el("a", null, it.project.title);
        if (it.project.url) a.href = it.project.url;
        proj.appendChild(a);
        text.appendChild(proj);
      }
      li.appendChild(text);
      list.appendChild(li);
    }
  } catch (err) {
    list.textContent = `could not load attendances.json (${err.message})`;
  }
}

/* ---------- toc: highlight the section in view ---------- */
function watchToc() {
  const links = document.querySelectorAll("#toc a");
  const byId = {};
  links.forEach((a) => (byId[a.getAttribute("href").slice(1)] = a));
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          links.forEach((a) => a.classList.remove("active"));
          byId[e.target.id]?.classList.add("active");
        }
      }
    },
    { rootMargin: "-20% 0px -70% 0px" }
  );
  document.querySelectorAll("main section").forEach((s) => observer.observe(s));
}

async function ghJson(url) {
  const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

renderAbout();
renderPublications();
renderRepos();
renderAttendances();
watchToc();
