let body = $response.body;
let obj = JSON.parse(body);

// Set to true to see logs in Surge
const debug = false;

if (obj?.data?.children?.length) {
  obj.data.children = obj.data.children.filter(item => {
    const d = item.data || {};

    const author = (d.author || "").toLowerCase();
    const domain = d.domain || "";
    const url = d.url_overridden_by_dest || "";

    const isAd =
      d.is_ad === true ||
      d.isSponsored === true ||
      d.promoted === true ||
      d.adserverClickUrl ||
      d.is_created_from_ads_ui === true ||
      author === "promoted" ||
      (d.post_category && d.post_category === "advertiser") ||
      (url.includes("utm_source=reddit")) ||
      (domain.includes("ad") && d.post_hint === "link");

    if (debug && isAd) {
      console.log("🔴 Blocked ad:", d.title || url || domain);
    }

    return !isAd;
  });
}

$done({ body: JSON.stringify(obj) });
