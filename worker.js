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

function getOS(ua, cfDeviceType = "") {
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS/iPadOS";
  if (/Windows/i.test(ua)) return "Windows";
  // iPadOS can identify itself as Macintosh when "Request Desktop Website"
  // is enabled. CF-Device-Type supplies the device signal that the UA omits.
  if (
    /Macintosh|Mac OS X/i.test(ua) &&
    /^(mobile|tablet)$/i.test(cfDeviceType)
  ) {
    return "iOS/iPadOS";
  }
  if (/Macintosh|Mac OS X/i.test(ua)) return "macOS";
  if (/Linux/i.test(ua)) return "Linux";
  return "Other";
}

function getDevice(ua, cfDeviceType = "") {
  // Cloudflare's device classification handles iPadOS desktop-mode UAs,
  // which look like desktop Safari and contain neither "iPad" nor "Tablet".
  if (/^(mobile|tablet|desktop)$/i.test(cfDeviceType)) {
    return cfDeviceType[0].toUpperCase() + cfDeviceType.slice(1).toLowerCase();
  }
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
      const cfDeviceType = request.headers.get("CF-Device-Type") || "";

      console.log({
        type: "visitor",
        time: new Date().toISOString(),
        ip: request.headers.get("CF-Connecting-IP"),
        country: request.cf?.country || "Unknown",
        device: getDevice(ua, cfDeviceType),
        os: getOS(ua, cfDeviceType),
        browser: getBrowser(ua),
        userAgent: ua,
        path: url.pathname
      });
    }

    return env.ASSETS.fetch(request);
  }
};
