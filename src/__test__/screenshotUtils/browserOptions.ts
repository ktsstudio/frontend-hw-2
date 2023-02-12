export const BROWSER_OPTIONS = {
  headless: true,
  args: [
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--disable-setuid-sandbox",
    "--no-sandbox",
    "--force-color-profile=srgb",
    "--font-render-hinting=none",
    "--disable-font-subpixel-positioning"
  ]
};
