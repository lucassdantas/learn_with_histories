export const ADS_CONFIG = {
  // Use Google's test publisher ID
  //publisherId: 'ca-pub-3940256099942544',
  // slots: {
  //   banner: '6300978111',
  //   sidebar: '6300978111', // Reusing banner for side if needed
  // },

  // Lucas's own account (upgraded from AdMob, same number). Must match public/ads.txt and
  // the ads.txt on the root domain (devdantas.com.br/ads.txt).
  publisherId: 'ca-pub-2495329310301889',
  // Ad unit IDs (data-ad-slot) from AdSense → Ads → By ad unit. Empty = that ad isn't rendered.
  slots: {
    banner: '8653188006', // "LWH - Banner horizontal" (display, responsive)
    sidebar: '5671626430', // "LWH - Lateral 300x600" (display, fixed)
  },
  isTest: false,
};
