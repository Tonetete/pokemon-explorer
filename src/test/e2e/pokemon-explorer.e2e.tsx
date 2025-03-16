import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:4010'

test('should load the homepage and check elements', async ({ page }) => {
  await page.goto(BASE_URL)

  await expect(page).toHaveTitle(/Pokemon Explorer/i)

  const cards = await page.locator('.pokemon-card')
  await expect(cards).toHaveCount(20)

  const favoriteButtons = await page.locator('.favorite-button')
  await expect(favoriteButtons).toHaveCount(20)

  const goToFavoritesButton = page.locator('text=Go to favorites')
  await expect(goToFavoritesButton).toBeVisible()
})

test(`should navigate to Pokemon Detail and favorite a Pokemon and then go to favorites and check the favorite pokemon and then unfavorited and check the message`, async ({
  page,
}) => {
  await page.goto(BASE_URL)

  await page.locator('a.pokemon-detail-link').first().click()

  await expect(page).toHaveURL(/pokemon-explorer\/pokemon-detail\/\d+/)

  const favoriteButton = await page.locator('.favorite-button')
  await favoriteButton.click()

  const goToFavoritesButton = page.locator('text=Go to favorites')
  await goToFavoritesButton.click()

  await expect(page).toHaveURL(/pokemon-explorer\/favorites/)

  const favoriteCards = await page.locator('.pokemon-card')
  await expect(favoriteCards).toHaveCount(1)

  const unfavoriteButton = await page.locator('.favorite-button')
  await unfavoriteButton.click()

  const text = await page.locator('text=No favorites yet!')
  await expect(text).toBeVisible()
})

test(`should navigate to Pokemon Detail and favorite a Pokemon and then go back and click favorite button again and check the favorite pokemon is still there`, async ({
  page,
}) => {
  await page.goto(BASE_URL)

  await page.locator('a.pokemon-detail-link').first().click()

  await expect(page).toHaveURL(/pokemon-explorer\/pokemon-detail\/\d+/)

  const favoriteButton = await page.locator('.favorite-button')
  await favoriteButton.click()

  let goToFavoritesButton = page.locator('text=Go to favorites')
  await goToFavoritesButton.click()

  await expect(page).toHaveURL(/pokemon-explorer\/favorites/)

  let favoriteCards = await page.locator('.pokemon-card')
  await expect(favoriteCards).toHaveCount(1)

  page.goBack()

  goToFavoritesButton = page.locator('text=Go to favorites')
  await goToFavoritesButton.click()

  favoriteCards = await page.locator('.pokemon-card')
  await expect(favoriteCards).toHaveCount(1)
})

test(`should navigate to Pokemon Detail and favorite a Pokemon and then go back clicking in the breadcrumb and then going to favorites and check the favorite pokemon`, async ({
  page,
}) => {
  await page.goto(BASE_URL)

  await page.locator('a.pokemon-detail-link').first().click()

  await expect(page).toHaveURL(/pokemon-explorer\/pokemon-detail\/\d+/)

  const favoriteButton = await page.locator('.favorite-button')
  await favoriteButton.click()

  let goToFavoritesButton = page.locator('text=Go to favorites')
  await goToFavoritesButton.click()

  await expect(page).toHaveURL(/pokemon-explorer\/favorites/)

  let favoriteCards = await page.locator('.pokemon-card')
  await expect(favoriteCards).toHaveCount(1)

  const pokemonListLink = await page.locator('text=Pokémon List')
  await pokemonListLink.click()

  goToFavoritesButton = page.locator('text=Go to favorites')
  await goToFavoritesButton.click()

  favoriteCards = await page.locator('.pokemon-card')
  await expect(favoriteCards).toHaveCount(1)
})
