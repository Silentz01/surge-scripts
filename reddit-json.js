let body = $response.body;
let obj = JSON.parse(body);

if (obj.data && Array.isArray(obj.data.children)) {
  obj.data.children = obj.data.children.filter(item => {
    const d = item.data || {};

    // Aggressive filtering of promoted/ads
    const isAd = d.isSponsored ||
                 d.promoted ||
                 d.adserverClickUrl ||
                 d.author === 'Promoted' ||
                 d.name?.includes('t3_') && d.url_overridden_by_dest?.includes('utm_source=reddit');

    return !isAd;
  });
}

$done({ body: JSON.stringify(obj) });
