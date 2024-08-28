import {test, expect} from '@playwright/test'

test.beforeEach('navigate to page', async ({page}) => {
     await page.goto('http://localhost:4200/')
   });


test('the first test', async ({page}) => {
     await page.goto('http://localhost:4200/')
     await page.getByText('Forms').click()
     await page.getByText('Form Layouts').click()
});

test('user facing locators', async ({page}) => {
     await page.goto('http://localhost:4200/')
     await page.waitForLoadState('networkidle');
await page.getByRole ('textbox', {name: "Email"}).first().click()
await page.getByRole('button', {name: "Sign in"}).first().click()
});

test('locating child elements', async ({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
     await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")').click()
     await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()
});

test('locating parent elements', async ({page}) => {
     await page.locator ('nb-card', {hasText: "Using the Grid"}).getByRole('textbox',{name:"Email"}).click()
})

test('Resusing the locators', async ({page}) => {
const basicForm = page.locator('nb-card').filter({hasText:"Basic Form"})
const emailField = basicForm.getByRole('textbox',{name: "Email"})
await emailField.fill('test@test.com')
await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
await basicForm.getByRole('button').click()

await expect(emailField).toHaveValue('test@test.com')
})