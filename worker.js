function getBrowser(ua) {
  // Samsung Internet must be checked before Chrome
  if (/SamsungBrowser\//i.test(ua)) {
    return "Samsung Internet";
  }
  if (/EdgA\//i.test(ua)) {
    return "Edge Android";
  }
  if (/EdgiOS\//i.test(ua)) {
    return "Edge iOS";
  }
  if (/Edg\//i.test(ua)) {
    return "Edge";
  }
  if (/DuckDuckGo\//i.test(ua)) {
    return "DuckDuckGo";
  }
  if (/FxiOS\//i.test(ua)) {
    return "Firefox iOS";
  }
  if (/Firefox\//i.test(ua)) {
    return "Firefox";
  }
  if (/CriOS\//i.test(ua)) {
    return "Chrome iOS";
  }
  if (/Chrome\//i.test(ua)) {
    return "Chrome";
  }
  // Safari must come after the Chromium checks
  if (/Safari\//i.test(ua)) {
    return "Safari";
  }
  return "Other";
}

function getOS(ua) {
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS/iPadOS";
  if (/Windows/i.test(ua)) return "Windows";
  if (/Macintosh|Mac OS X/i.test(ua)) return "macOS";
  if (/Linux/i.test(ua)) return "Linux";
  return "Other";
}

function getDevice(ua) {
  if (/iPad|Tablet/i.test(ua)) return "Tablet";
  if (/Mobile|Android|iPhone|iPod/i.test(ua)) return "Mobile";
  return "Desktop";
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Log only requests for the home page.
    if (url.pathname === "/") {
      const ua = request.headers.get("User-Agent") || "";

      console.log({
        type: "visitor",
        time: new Date().toISOString(),
        ip: request.headers.get("CF-Connecting-IP"),
        country: request.cf?.country || "Unknown",
        device: getDevice(ua),
        os: getOS(ua),
        browser: getBrowser(ua),
        userAgent: ua,
        path: url.pathname
      });
    }

    return env.ASSETS.fetch(request);
  }
};
