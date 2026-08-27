// Report the device from the browser, where iPadOS desktop mode is detectable.
const visitorUserAgent = navigator.userAgent;
const isDesktopModeIPad =
  navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

function getVisitorOS() {
  if (/Android/i.test(visitorUserAgent)) return "Android";
  if (/iPhone|iPad|iPod/i.test(visitorUserAgent) || isDesktopModeIPad) {
    return "iOS/iPadOS";
  }
  if (/Windows/i.test(visitorUserAgent)) return "Windows";
  if (/Macintosh|Mac OS X/i.test(visitorUserAgent)) return "macOS";
  if (/Linux/i.test(visitorUserAgent)) return "Linux";
  return "Other";
}

function getVisitorDevice() {
  if (/iPad|Tablet/i.test(visitorUserAgent) || isDesktopModeIPad) {
    return "Tablet";
  }
  if (/Mobile|Android|iPhone|iPod/i.test(visitorUserAgent)) return "Mobile";
  return "Desktop";
}

const visitorReport = JSON.stringify({
  device: getVisitorDevice(),
  os: getVisitorOS(),
  path: location.pathname
});

if (!navigator.sendBeacon("/__visitor", visitorReport)) {
  fetch("/__visitor", {
    method: "POST",
    body: visitorReport,
    headers: { "Content-Type": "application/json" },
    keepalive: true
  });
}
