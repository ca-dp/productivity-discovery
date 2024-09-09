import { PlaywrightCrawler, ProxyConfiguration } from 'crawlee';
import { router } from './routes.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const URL = 'https://imt.services.isca.jp/imart/home';
const startUrls = [URL];

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read cookies from the JSON file
const cookiesPath = path.join(__dirname, '..', '..', 'technologymap.cag.isca.jp.cookies.json');
const cookiesData = fs.readFileSync(cookiesPath, 'utf8');
const cookies = JSON.parse(cookiesData);

const crawler = new PlaywrightCrawler({
    // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
    requestHandler: router,
    // Comment this option to scrape the full website.
    maxRequestsPerCrawl: 20,
    preNavigationHooks: [
        async ({ page, request }) => {
            // Set cookies before navigation
            await page.context().addCookies(cookies);

            // Add Authorization header if you have a valid token
            // await page.setExtraHTTPHeaders({
            //     'Authorization': 'Bearer YOUR_OAUTH_TOKEN_HERE'
            // });

            console.log('Cookies and headers set for:', request.url);
        },
    ],
});

await crawler.run(startUrls);
