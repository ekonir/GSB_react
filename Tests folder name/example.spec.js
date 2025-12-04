// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/GSB Frais/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  // Click the get started link.
  await page.getByRole('link', { name: 'Connexion' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
});

// cas test 1//
test('Login with valid credentials', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  // Click the get started link.
  await page.fill('input[name="login"]', 'Andre');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');

  // Expects page to have a heading with the name of Installation.
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});

// cas test 2 //
test('Login  invalid', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  // Handle the alert dialog.
  page.on('dialog', async (dialog) => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('Échec de la connexion');
    await dialog.accept();
  });

  // Fill login form with invalid credentials.
  await page.fill('input[name="login"]', 'pasAndre');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');

  // Expects user to stay on login page.
  await expect(page).toHaveURL('http://localhost:3000/login');
});



// cas test 3//
test('page reload', async ({ page }) => {

  await page.goto('http://localhost:3000/login');
  await page.fill('input[name="login"]', 'Andre');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');

  // Click the get started link.
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
  await page.reload();

  // Expects page to have a heading with the name of Installation.
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});


// cas test 4//
test('Logout user', async ({ page }) => {

  await page.goto('http://localhost:3000/login');
  await page.fill('input[name="login"]', 'Andre');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000/Dashboard');

  // Click the get started link.
  await page.click('button[name="logout"]'); 

  // Expects page to have a heading with the name of Installation.
  await expect(page).toHaveURL('http://localhost:3000/login');
});
