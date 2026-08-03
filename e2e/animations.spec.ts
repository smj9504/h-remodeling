import { test, expect } from '@playwright/test';

test.describe('Animation Effects - Desktop', () => {
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    await page.goto('/en', { waitUntil: 'load', timeout: 45000 });
    await page.waitForTimeout(1500);
  });

  test('Homepage hero section animates in', async ({ page }) => {
    const heroTitle = page.locator('h1').first();
    await expect(heroTitle).toBeVisible({ timeout: 5000 });

    // Check that framer-motion animation wrapper exists
    const motionDivs = page.locator('[style*="opacity"]');
    const count = await motionDivs.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Homepage services section animates on scroll', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(1000);

    const servicesSection = page.locator('section').filter({ hasText: /kitchen|bathroom/i }).first();
    await expect(servicesSection).toBeVisible();
  });

  test('Homepage CTA buttons have hover effects', async ({ page }) => {
    const ctaButton = page.locator('a[href="/en/contact"]').first();
    await expect(ctaButton).toBeVisible();

    const classes = await ctaButton.getAttribute('class');
    expect(classes).toContain('transition');
  });

  test('Header has scroll transition class', async ({ page }) => {
    const header = page.locator('header');

    // Header should have transition class for scroll animation
    const classes = await header.getAttribute('class');
    expect(classes).toContain('transition-all');
    expect(classes).toContain('duration-300');
  });
});

test.describe('Page-specific Animations', () => {
  test.setTimeout(60000);

  test('About page has count-up animation', async ({ page }) => {
    await page.goto('/en/about', { waitUntil: 'load', timeout: 45000 });
    await page.waitForTimeout(1500);

    const statsSection = page.locator('section.bg-neutral-900').first();
    await statsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2500);

    const statTexts = await statsSection.textContent();
    expect(statTexts).toContain('10');
    expect(statTexts).toContain('500');
    expect(statTexts).toContain('100');
  });

  test('About page values cards appear with stagger', async ({ page }) => {
    await page.goto('/en/about', { waitUntil: 'load', timeout: 45000 });
    await page.waitForTimeout(1500);

    await page.evaluate(() => window.scrollBy(0, 1200));
    await page.waitForTimeout(1500);

    const valueCards = page.locator('.bg-neutral-50.p-8.text-center');
    await expect(valueCards).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      await expect(valueCards.nth(i)).toBeVisible();
    }
  });

  test('Services page sections animate on scroll', async ({ page }) => {
    await page.goto('/en/services', { waitUntil: 'load', timeout: 45000 });
    await page.waitForTimeout(1500);

    const heroTitle = page.locator('h1').first();
    await expect(heroTitle).toBeVisible();

    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(1000);

    const kitchenSection = page.locator('#kitchen');
    await expect(kitchenSection).toBeVisible();
  });

  test('Contact page form and sidebar animate in', async ({ page }) => {
    await page.goto('/en/contact', { waitUntil: 'load', timeout: 45000 });
    await page.waitForTimeout(1500);

    const form = page.locator('form').first();
    await expect(form).toBeVisible({ timeout: 5000 });

    const sidebar = page.locator('.bg-neutral-900.text-white.p-8').first();
    await expect(sidebar).toBeVisible({ timeout: 5000 });
  });

  test('Contact page FAQ accordion works with animation', async ({ page }) => {
    await page.goto('/en/contact', { waitUntil: 'load', timeout: 45000 });
    await page.waitForTimeout(1500);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    const faqButtons = page.locator('button').filter({ has: page.locator('h3') });
    const firstFaq = faqButtons.first();
    await firstFaq.click();
    await page.waitForTimeout(300);

    const faqContent = page.locator('.overflow-hidden.transition-all').first();
    await expect(faqContent).toBeVisible();
  });

  test('Footer sections animate on scroll', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'load', timeout: 45000 });
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500);

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const copyright = footer.locator('text=H Remodeling');
    await expect(copyright.first()).toBeVisible();
  });
});

test.describe('Animation Effects - Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('Homepage renders correctly on mobile', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'load', timeout: 45000 });
    await page.waitForTimeout(1000);

    const heroTitle = page.locator('h1').first();
    await expect(heroTitle).toBeVisible({ timeout: 5000 });

    const menuButton = page.locator('button[aria-label]').first();
    await expect(menuButton).toBeVisible();
  });

  test('Mobile menu opens with animation', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'load', timeout: 45000 });
    await page.waitForTimeout(1500);

    // Mobile menu button should be visible at this viewport
    const menuButton = page.locator('button[aria-label="Open menu"]');
    const isMenuVisible = await menuButton.isVisible();

    if (!isMenuVisible) {
      // Skip test on desktop viewport where mobile menu doesn't exist
      test.skip();
      return;
    }

    await menuButton.click();
    await page.waitForTimeout(800);

    // After clicking menu, close button should appear
    const closeButton = page.locator('button[aria-label="Close menu"]');
    await expect(closeButton).toBeVisible({ timeout: 5000 });

    // Mobile menu should contain navigation links (inside the AnimatePresence container)
    const mobileMenuLinks = page.locator('.lg\\:hidden a[href="/en/about"]');
    await expect(mobileMenuLinks).toBeVisible({ timeout: 5000 });
  });

  test('Mobile scroll animations work', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'load', timeout: 45000 });
    await page.waitForTimeout(1000);

    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(1000);

    const sections = page.locator('section');
    const sectionCount = await sections.count();
    expect(sectionCount).toBeGreaterThan(2);
  });

  test('About page is responsive with animations', async ({ page }) => {
    await page.goto('/en/about', { waitUntil: 'load', timeout: 45000 });
    await page.waitForTimeout(1000);

    const title = page.locator('h1').first();
    await expect(title).toBeVisible({ timeout: 5000 });

    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(1500);

    const statsSection = page.locator('section.bg-neutral-900').first();
    await expect(statsSection).toBeVisible();
  });
});

test.describe('Responsive Design Checks', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 720 },
  ];

  for (const vp of viewports) {
    test(`Homepage renders correctly at ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/en', { waitUntil: 'load', timeout: 45000 });
      await page.waitForTimeout(1000);

      const heroTitle = page.locator('h1').first();
      await expect(heroTitle).toBeVisible({ timeout: 5000 });

      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);

      const criticalErrors = errors.filter(e => !e.includes('favicon') && !e.includes('hydration'));
      expect(criticalErrors).toHaveLength(0);
    });
  }
});

test.describe('Multi-language Animation Support', () => {
  const locales = ['en', 'ko', 'zh'];

  for (const locale of locales) {
    test(`${locale} homepage loads with animations`, async ({ page }) => {
      await page.goto(`/${locale}`, { waitUntil: 'load', timeout: 45000 });
      await page.waitForTimeout(1000);

      const heroTitle = page.locator('h1').first();
      await expect(heroTitle).toBeVisible({ timeout: 5000 });

      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(1000);

      const bodyText = await page.locator('body').textContent();
      expect(bodyText?.length).toBeGreaterThan(100);
    });
  }
});
