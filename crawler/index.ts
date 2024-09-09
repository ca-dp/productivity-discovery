import FirecrawlApp, { type MapResponse } from "@mendable/firecrawl-js";

const app = new FirecrawlApp({ apiKey: "fc-YOUR_API_KEY" });

const mapResult = (await app.mapUrl("https://firecrawl.dev")) as MapResponse;

if (!mapResult.success) {
	throw new Error(`Failed to map: ${mapResult.error}`);
}

console.log(mapResult);
