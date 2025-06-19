let body = $response.body;
let obj = JSON.parse(body);

// Filter promoted content (ads)
if (obj?.data?.children?.length > 0) {
  obj.data.children = obj.data.children.filter(item => {
    return !(item?.data?.is_promoted === true || item?.data?.placement === 1);
  });
}

$done({ body: JSON.stringify(obj) });
