---
layout: page
permalink: /publications/
title: Publications
description: Publications by categories in reversed chronological order. Currently Publications are in progress but not published yet.
years: []
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f {{ site.scholar.bibliography }} -q @*[year={{y}}]* %}
{% endfor %}

</div>
