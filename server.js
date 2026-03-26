#!/usr/bin/env node

const { serveHTTP, publishToCentral } = require("stremio-addon-sdk")
const addonInterface = require("./addon")
const PORT = process.env.PORT || 56782;
serveHTTP(addonInterface, { port: PORT })

// Automatyczne wykrywanie BASE_URL dla Hugging Face Spaces
if (process.env.BASE_URL) {
    BASE_URL_RESOLVED = process.env.BASE_URL;
} else if (process.env.SPACE_HOST) {
    // Hugging Face Spaces
    BASE_URL_RESOLVED = `https://${process.env.SPACE_HOST}`;
} else if (process.env.SPACE_ID) {
    // Alternatywna metoda dla HF
    const spaceId = process.env.SPACE_ID.replace('/', '-').toLowerCase();
    BASE_URL_RESOLVED = `https://${spaceId}.hf.space`;
} else {
    BASE_URL_RESOLVED = `http://localhost:${PORT}`;
}
console.log(`[Config] Manifest URL: ${BASE_URL_RESOLVED}/manifest.json`);

// when you've deployed your addon, un-comment this line
// publishToCentral("https://my-addon.awesome/manifest.json")
// for more information on deploying, see: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/deploying/README.md
