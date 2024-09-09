import FirecrawlApp, { type MapResponse, type MapParams } from "@mendable/firecrawl-js";

const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

const mapResult = (await app.mapUrl(process.env.CA_TECHNOLOGY_MAP as string)) as MapResponse;

if (!mapResult.success) {
    throw new Error(`Failed to map: ${mapResult.error}`);
}

console.log(mapResult);
