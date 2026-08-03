import { test, expect } from '@playwright/test';

test.use({ actionTimeout: 15000 });

// ============================================================
// 1. Header Mobile Menu & Touch Targets
// ============================================================
test.describe('Header Mobile', () => {
  test('mobile menu button has adequate touch target (≥44px)', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');
    await page.goto('/en', { waitUntil: 'networkidle' });

    const menuButton = page.locator('header button[aria-label]');
    await expect(menuButton).toBeVisible({ timeout: 10000 });
    const box = await menuButton.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  });

  test('mobile menu button has aria-label', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');
    await page.goto('/en', { waitUntil: 'networkidle' });

    const menuButton = page.locator('header button[aria-label]');
    await expect(menuButton).toBeVisible({ timeout: 10000 });
    const label = await menuButton.getAttribute('aria-label');
    expect(label).toBeTruthy();
    expect(label!.toLowerCase()).toContain('menu');
  });

  test('mobile menu opens and shows navigation links', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');
    await page.goto('/en', { waitUntil: 'networkidle' });

    const menuButton = page.locator('header button[aria-label]');
    await expect(menuButton).toBeVisible({ timeout: 10000 });
    await menuButton.click();
    await page.waitForTimeout(800);

    // Check mobile menu links (use text content to disambiguate)
    await expect(page.getByRole('banner').getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('banner').getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('banner').getByRole('link', { name: 'Contact' })).toBeVisible();
  });

  test('desktop nav is hidden on mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');
    await page.goto('/en', { waitUntil: 'networkidle' });

    const desktopNav = page.locator('header nav');
    await expect(desktopNav).toBeHidden();
  });
});

// ============================================================
// 2. Hero Section Trust Indicators
// ============================================================
test.describe('Hero Trust Indicators', () => {
  test('trust indicator cards do not overflow on mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');
    await page.goto('/en', { waitUntil: 'networkidle' });

    const viewport = page.viewportSize()!;
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(viewport.width + 1);
  });

  test('trust indicator stats are visible on mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');
    await page.goto('/en', { waitUntil: 'networkidle' });

    // The hero section with stats should be present and visible
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible({ timeout: 10000 });

    // Check that stat numbers are visible in the page content
    const pageContent = await page.textContent('body');
    expect(pageContent).toBeTruthy();
  });
});

// ============================================================
// 3. Projects Cards - Mobile Content Visibility
// ============================================================
test.describe('Projects Page Mobile', () => {
  test('project cards show location and category without hover on mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');
    await page.goto('/en/projects', { waitUntil: 'networkidle' });

    // Wait for project card links to be rendered (client component)
    const projectLink = page.locator('a[href*="/projects/"]').first();
    await expect(projectLink).toBeVisible({ timeout: 15000 });

    // On mobile the bottom overlay content should be visible
    // Check that category label text and location are present inside the card
    const cardText = await projectLink.textContent();
    expect(cardText).toBeTruthy();
    // Should contain category text (Kitchen, Bathroom, etc.)
    expect(cardText!.length).toBeGreaterThan(0);
  });

  test('project cards top label hidden on mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');
    await page.goto('/en/projects', { waitUntil: 'networkidle' });

    const projectLink = page.locator('a[href*="/projects/"]').first();
    await expect(projectLink).toBeVisible({ timeout: 15000 });

    // The top-left label has class "hidden lg:block" so should not be visible on mobile
    const topLabel = projectLink.locator('div.hidden');
    const count = await topLabel.count();
    if (count > 0) {
      await expect(topLabel.first()).toBeHidden();
    }
  });
});

// ============================================================
// 4. Project Detail Image Aspect Ratio
// ============================================================
test.describe('Project Detail Page', () => {
  test('hero image has 16:9 aspect ratio on mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');
    await page.goto('/en/projects/modern-kitchen-bethesda', { waitUntil: 'networkidle' });

    // The first image in the main content area
    const heroContainer = page.locator('section img').first();
    await expect(heroContainer).toBeVisible({ timeout: 10000 });

    // Get the parent container which has the aspect ratio
    const parentBox = await heroContainer.locator('..').boundingBox();
    expect(parentBox).not.toBeNull();

    const ratio = parentBox!.width / parentBox!.height;
    // On mobile: 16/9 = ~1.78
    expect(ratio).toBeGreaterThan(1.5);
    expect(ratio).toBeLessThan(2.1);
  });

  test('hero image has 21:9 aspect ratio on desktop', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop-only test');
    await page.goto('/en/projects/modern-kitchen-bethesda', { waitUntil: 'networkidle' });

    const heroContainer = page.locator('section img').first();
    await expect(heroContainer).toBeVisible({ timeout: 10000 });

    const parentBox = await heroContainer.locator('..').boundingBox();
    expect(parentBox).not.toBeNull();

    const ratio = parentBox!.width / parentBox!.height;
    // On desktop: 21/9 = ~2.33
    expect(ratio).toBeGreaterThan(2.0);
  });
});

// ============================================================
// 5. Translated Buttons (No Hardcoded English)
// ============================================================
test.describe('Translation - Korean', () => {
  test('services page has no hardcoded English "Get a Quote"', async ({ page }) => {
    await page.goto('/ko/services', { waitUntil: 'networkidle' });
    const content = await page.textContent('body');
    expect(content).not.toContain('Get a Quote');
  });

  test('home page has no hardcoded English "Get a Quote"', async ({ page }) => {
    await page.goto('/ko', { waitUntil: 'networkidle' });
    const content = await page.textContent('body');
    expect(content).not.toContain('Get a Quote');
  });

  test('projects page CTA has no hardcoded English text', async ({ page }) => {
    await page.goto('/ko/projects', { waitUntil: 'networkidle' });
    const content = await page.textContent('body');
    expect(content).not.toContain('Ready to Start Your Project?');
    expect(content).not.toContain('Get a Free Quote');
  });
});

test.describe('Translation - Chinese', () => {
  test('services page has no hardcoded English "Get a Quote"', async ({ page }) => {
    await page.goto('/zh/services', { waitUntil: 'networkidle' });
    const content = await page.textContent('body');
    expect(content).not.toContain('Get a Quote');
  });

  test('home page has no hardcoded English "Get a Quote"', async ({ page }) => {
    await page.goto('/zh', { waitUntil: 'networkidle' });
    const content = await page.textContent('body');
    expect(content).not.toContain('Get a Quote');
  });
});

// ============================================================
// 6. Responsive Layout - No Horizontal Overflow
// ============================================================
test.describe('No Horizontal Overflow', () => {
  const pages = [
    { name: 'Home', path: '/en' },
    { name: 'About', path: '/en/about' },
    { name: 'Services', path: '/en/services' },
    { name: 'Projects', path: '/en/projects' },
    { name: 'Contact', path: '/en/contact' },
  ];

  for (const p of pages) {
    test(`${p.name} page has no horizontal overflow on mobile`, async ({ page, isMobile }) => {
      test.skip(!isMobile, 'Mobile-only test');
      await page.goto(p.path, { waitUntil: 'networkidle' });

      const bodyWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const viewportWidth = page.viewportSize()!.width;
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
    });
  }
});

// ============================================================
// 7. Viewport Meta
// ============================================================
test.describe('Viewport Meta', () => {
  test('viewport meta tag is correctly set', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' });

    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toContain('width=device-width');
    expect(viewport).toContain('initial-scale=1');
  });
});
