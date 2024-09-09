import { createPlaywrightRouter, Page } from 'crawlee';

export const router = createPlaywrightRouter();

async function handleOAuth2Authentication(page: Page) {
    console.log('Handling OAuth2 authentication...');
    // For now, we'll just log the URL and continue
    console.log('OAuth2 URL:', page.url());
    // TODO: Implement actual OAuth2 authentication logic if needed
}

async function handleSSOAuthentication(page: Page) {
    console.log('Handling SSO authentication...');
    // For now, we'll just log the URL and continue
    console.log('SSO URL:', page.url());
    // TODO: Implement actual SSO authentication logic if needed
}

router.addDefaultHandler(async ({ enqueueLinks, log, page }) => {
    const currentUrl = page.url();
    if (currentUrl.includes('authorization.oauth2')) {
        await handleOAuth2Authentication(page);
    } else if (currentUrl.includes('startSSO.ping')) {
        await handleSSOAuthentication(page);
    }

    // Always try to enqueue links, even after authentication attempts
    log.info('Enqueueing new URLs');
    await enqueueLinks({
        globs: ['https://imt.services.isca.jp/imart/**'],
        label: 'detail',
    });
});

router.addHandler('detail', async ({ request, page, log, pushData }) => {
    const title = await page.title();
    log.info(`${title}`, { url: request.loadedUrl });

    await pushData({
        url: request.loadedUrl,
        title,
    });
});
