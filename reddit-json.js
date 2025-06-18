let obj = JSON.parse($response.body);

if (obj.data && obj.data.children) {
  obj.data.children = obj.data.children.filter(item => {
    return !(item.data && (item.data.isSponsored || item.data.promoted));
  });
}

$done({ body: JSON.stringify(obj) });

