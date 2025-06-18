let body = $response.body;
let obj = JSON.parse(body);

// DEBUG: Uncomment to log everything to Surge log
// console.log("Reddit JSON Feed:", JSON.stringify(obj));

if (obj.data && Array.isArray(obj.data.children)) {
  obj.data.children = obj.data.children.filter(item => {
    const d = item.data || {};

    // Aggressive checks — real ad detection
    const lowerAuthor = (d.author || "").toLowerCase();
    const isAd =
      d.isSponsored ||
      d.promoted ||
      d.adserverClickUrl ||
      d.is_ad ||
      d.is_created_from_ads_ui ||
      lowerAuthor === 'promoted' ||
      (d.post_hint === "link" && d.domain && d.domain.includes("ad")) ||
      (d.url_overridden_by_dest && d.url_overridden_by_dest.includes("utm_source=reddit"));

    // DEBUG:
    // if (isAd) console.log("Filtered ad:", d.title || d.url);

    return !isAd;
  });
}

$done({ body: JSON.stringify(obj) });
