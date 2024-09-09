import FirecrawlApp, { CrawlParams, CrawlStatusResponse } from '@mendable/firecrawl-js';
import { readFile, writeFile } from 'node:fs/promises';

interface DetailedCookie {
    name: string;
    value: string;
    domain: string;
    path: string;
    expires: number;
    httpOnly: boolean;
    secure: boolean;
}

const cookiesJson = await readFile('technologymap.cag.isca.jp.cookies.json', 'utf-8');
const cookies: DetailedCookie[] = JSON.parse(cookiesJson)
const cookiesMap = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')

const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

// Crawl a website
const crawlResponse = await app.crawlUrl(process.env.CA_TECHNOLOGY_MAP as string, {
    limit: 100,
    scrapeOptions: {
        formats: ['markdown'],
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Cookie': cookiesMap,
            'Dnt': '1',
            'Pragma': 'no-cache',
            'Priority': 'u=0, i',
            'Referer': process.env.CA_TECHNOLOGY_MAP as string,
            'Origin': process.env.CA_TECHNOLOGY_MAP as string,
            'Sec-Ch-Ua': '"Not;A=Brand";v="24", "Chromium";v="128"',
            'Sec-Ch-Ua-Mobile': '?1',
            'Sec-Ch-Ua-Platform': '"Android"',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-User': '?1',
            'Upgrade-insecure-requests': '1',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36',
        }
    },
});

if (!crawlResponse.success) {
    console.error(`Failed to crawl: ${crawlResponse.error}`)
    // throw new Error(`Failed to crawl: ${crawlResponse.error}`)
}

console.log(crawlResponse)
