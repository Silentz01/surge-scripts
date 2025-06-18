let obj = JSON.parse($response.body);

if (obj && obj.video_autoplay !== undefined) {
  obj.video_autoplay = false;
}
if (obj.settings && obj.settings.autoplay !== undefined) {
  obj.settings.autoplay = false;
}

$done({ body: JSON.stringify(obj) });
