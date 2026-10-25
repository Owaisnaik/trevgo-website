TREVGO ROAD STORIES — DEPLOYMENT PACKAGE

IMPORTANT: This ZIP is packaged with index.html, styles.css, script.js and the assets/ folder at the archive ROOT. Do not upload the outer folder as a nested subfolder.

To deploy to GitHub + Cloudflare Pages:
1. Extract this ZIP.
2. Open the extracted folder and confirm index.html is directly inside it, beside styles.css, script.js and assets/.
3. Upload/replace these files at the ROOT of the GitHub repository (not inside an extra trevgo-website-main folder).
4. Ensure the complete assets/ folder is committed. It contains the images and both MP4 videos.
5. Wait for the Cloudflare Pages deployment to finish.
6. Open https://trevgo.in/?media-check=1 and refresh. If needed, test in a private/incognito tab to bypass cached files.

Media files:
- assets/city-flow.mp4 — supplied city traffic clip for “Every turn has a story.”
- assets/road-ahead.mp4 — supplied road-driving clip for “More of life. Less getting there.”
- Local WebP images created from the user's supplied photographs.

If the images/videos still fail after deploying this root-level package, check the latest Cloudflare Pages deployment and verify that /assets/yellow-taxi.webp, /assets/city-flow.mp4 and /assets/road-ahead.mp4 return successfully. The site must be deployed from the folder containing index.html, not its parent folder.
