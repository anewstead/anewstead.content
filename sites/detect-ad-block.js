/**
 * detect if an adblocker is running
 * redirect relative to the importing file
 */

async function detectAdBlock() {
  let detected = false;
  await fetch("https://ad-emea.doubleclick.net", {
    method: "HEAD",
    mode: "no-cors",
    cache: "no-store",
  }).catch(() => {
    detected = true;
  });
  return detected;
}

detectAdBlock().then(function (res) {
  if (res === true) {
    window.location.assign("failover.html");
  } else {
    window.location.assign("feature.html");
  }
});
