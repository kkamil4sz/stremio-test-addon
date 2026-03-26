const { addonBuilder } = require("stremio-addon-sdk")

// Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/manifest.md
const manifest = {
	"id": "community.stremio-test-addon",
	"version": "0.0.1",
	"name": "stremio-test-addon",
	"description": "Testing stremio sdk",
	"catalogs": [],
	"resources": [
		"stream"
	],
	"types": [
		"movie",
		"series"
	],
	"behaviorHints": {
        "configurable": false,
        "configurationRequired": false
    }
}
const builder = new addonBuilder(manifest)

builder.defineStreamHandler(({type, id}) => {
	console.log("request for streams: "+type+" "+id)
	// Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/requests/defineStreamHandler.md
	if (type === "movie" && id === "tt26443616") {
		// serve one stream to big buck bunny
		const stream1 = { 
			url: "https://fwcdn.pl/video/f/175/10058575/Hopnieci___zwiastun__2__dubbing_.h265.1080p.mp4",
			name: "Name: Hopnieci___zwiastun__2__dubbing (mp4)",
			description: "Desc: mp4, h265, dubbing, Hopnieci zwiastun 2",
			behaviorHints: {
				filename: "Hopnieci___zwiastun__2__dubbing_.h265.1080p.mp4"
			}
		}
		const stream2 = { 
			url: "https://fwcdn.pl/video/f/175/10058575/Hopnieci___zwiastun__2__dubbing_.vp9.1080p.webm",
			name: "Name: Hopnieci___zwiastun__2__dubbing (webm)",
			description: "Desc: webm, vp9, dubbing, Hopnieci zwiastun 2",
			behaviorHints: {
				filename: "Hopnieci___zwiastun__2__dubbing_.vp9.1080p.webm"
			}
		}
		return Promise.resolve({ streams: [stream1, stream2] })
	}

	// otherwise return no streams
	return Promise.resolve({ streams: [] })
})

module.exports = builder.getInterface()