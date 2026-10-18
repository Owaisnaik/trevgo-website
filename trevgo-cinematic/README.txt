TREVGO — CINEMATIC WEBSITE REDESIGN
===================================

This build is a new visual direction rather than a revision of the previous geometric-illustration website.

DESIGN APPROACH
- Cinematic full-bleed city motion in the opening scene.
- Large editorial typography integrated into photography/video instead of repeated card grids.
- A single interactive ride scene that switches among Bike, Auto and Taxi.
- A scroll-driven, pinned story scene that changes footage while the chapter copy changes.
- Warm mineral paper, near-black greens and lime accents; no CSS-built vehicle drawings.
- Responsive navigation, restrained transitions and prefers-reduced-motion support.

PREVIEW
1. Extract the ZIP.
2. On a PC or hosted site, open trevgo-cinematic/index.html.
3. On Android when opening directly from Downloads/content://, open index-standalone.html instead; it embeds CSS and JavaScript so the layout does not depend on Chrome reading sibling files.
4. Both previews need internet for remote video and fonts.
3. Use the Ride Options selector to change the scene. Scroll through the story section to see the pinned scene and copy change together.

MEDIA AND THIRD-PARTY ASSETS
This build uses external Pexels video/image URLs and Google Fonts; the media files are not bundled inside the ZIP. A network connection is required for the full cinematic effect. Video is loaded lazily in secondary sections to reduce initial data use. The opening film uses a Pexels night-traffic clip; the ride/story films use Pexels city motorcycle, Indian auto-rickshaw street and night-driving clips. Pexels page references:
- https://www.pexels.com/video/traffic-in-city-at-night-9935078/
- https://www.pexels.com/video/motorcyclist-riding-through-urban-indian-street-34394431/
- https://www.pexels.com/video/busy-urban-street-with-auto-rickshaws-in-india-35298890/
- https://www.pexels.com/video/a-car-driving-through-a-city-at-night-18616134/
Pexels describes these clips as free to use. Before production, confirm each asset's current terms and ensure the footage fits the actual product/market. Replace externally hosted media with optimized, self-hosted assets if preferred.

FUNCTIONALITY AND LIMITATIONS
- Ride selectors are a visual preview only; they do not create bookings or query live prices.
- The contact form creates a draft in the visitor's default email app and does not submit data to a website server. Update hello@trevgo.in if your monitored support inbox differs.
- No payment collection, account sign-in, dispatch, GPS tracking or live service availability is implemented.
- This is a static HTML/CSS/JavaScript website and can be deployed to static hosting after review.

BEFORE PRODUCTION
- Verify TREVGO's legal business identity, address and operating details.
- Confirm the support mailbox is monitored.
- Review Privacy, Terms, Safety and Refund/Cancellation wording with the actual implementation and intended service rules.
- Confirm service availability and partner onboarding wording; do not imply that rides can be booked until they can.
- Review media loading, bandwidth and fallback behavior on real desktop and mobile devices.

Files
- index.html
- about.html
- rides.html
- safety.html
- contact.html
- privacy.html
- terms.html
- refund.html
- styles.css
- script.js
- assets/favicon.svg


TYPOGRAPHY & MOTION REFINEMENT
- Open index-standalone.html for the single-file preview on mobile.
- Typography updated to DM Sans for readable, less geometric text and Instrument Serif italic accents for a warmer editorial feel.
- Motion tuned with softer easing, gentler reveal distances, smoother video fades, and reduced-motion support.
- Google Fonts and Pexels video/poster URLs need an internet connection.


COPY + MOTION POLISH
- Rewrote small labels and helper text in plain, conversational English.
- Replaced widely tracked mono microcopy with clearer DM Sans labels, especially on phones.
- Added restrained pointer lighting in the hero and ride scene on desktop, softer scene changes, gentle link movement and a subtle rotating accent.
- Animations respect reduced-motion preferences; phone labels and ride descriptions are larger and easier to read.
- Open index-standalone.html on Android file previews; it carries its own styles and script.
