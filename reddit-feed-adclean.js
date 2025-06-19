// reddit-ad-filter.js
let obj = JSON.parse($response.body);

// Clean out promoted (ad) posts
if (obj?.data?.children && Array.isArray(obj.data.children)) {
  obj.data.children = obj.data.children.filter(
    i => !(i.data && i.data.is_promoted)
  );
}

$done({ body: JSON.stringify(obj) });
