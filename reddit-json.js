(function () {
  // Attempt to parse incoming arguments; use defaults if parsing fails.
  let options = {};
  try {
    options = JSON.parse($argument);
  } catch (e) {
    options = { blockPromoted: true, debug: false };
  }
  const blockPromoted = options.blockPromoted !== undefined ? options.blockPromoted : true;
  const debug = options.debug !== undefined ? options.debug : false;
  
  if (debug) {
    console.log("Reddit-json: Options loaded:", options);
  }

  try {
    // Parse the intercepted response body as JSON.
    let responseObj = JSON.parse($response.body);

    // Check for the expected structure: responseObj.data.children should be an array.
    if (responseObj && responseObj.data && Array.isArray(responseObj.data.children)) {
      if (debug) {
        console.log("Reddit-json: Processing", responseObj.data.children.length, "items.");
      }
      
      // If the blockPromoted option is true, filter out promoted/ads entries.
      if (blockPromoted) {
        responseObj.data.children = responseObj.data.children.filter((child) => {
          // Check if the entry contains ad-related flags. Adjust or add additional flags as needed.
          if (child && child.data) {
            if (child.data.promoted === true || child.data.is_ad === true) {
              if (debug) {
                console.log("Reddit-json: Filtered out promoted post:", child.data.title || child.data.id);
              }
              return false;
            }
          }
          return true;
        });
      } else {
        if (debug) {
          console.log("Reddit-json: blockPromoted is false, skipping filtering.");
        }
      }
    } else {
      if (debug) {
        console.log("Reddit-json: Response structure not as expected, no filtering applied.");
      }
    }

    // Return the modified JSON.
    $done({ body: JSON.stringify(responseObj) });
  } catch (err) {
    // If any error occurs, log it if debug is enabled and return the original body.
    if (debug) {
      console.error("Reddit-json: Error processing response:", err);
    }
    $done({ body: $response.body });
  }
})();
