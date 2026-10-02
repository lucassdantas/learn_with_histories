declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

// Asks AdSense to fill the next empty <ins class="adsbygoogle"> on the page. Call once per slot.
export function pushAd(): boolean {
  try {
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
    return true;
  } catch (e) {
    console.error('AdSense error:', e);
    return false;
  }
}
