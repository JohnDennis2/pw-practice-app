import {test, expect} from '@playwright/test'
//before each to naviagte to the URL without having to add in every test
test.beforeEach('navigate to page', async ({page}) => {
     await page.goto('http://localhost:4200/')
   });

//directing the test to a URL and a specific unit
test('the first test', async ({page}) => {
     await page.goto('http://localhost:4200/')
     await page.getByText('Forms').click()
     await page.getByText('Form Layouts').click()
});
//user facing locators
test('user facing locators', async ({page}) => {
     await page.goto('http://localhost:4200/')
     await page.waitForLoadState('networkidle');
await page.getByRole("textbox", {name: "Email"}).first().click()
await page.getByRole('button', {name: "Sign in"}).first().click()
});
// child elements
test('locating child elements', async ({page}) => {
    await page.locator('nb-card-body nb-radio :text-is("Option 1")').click()
     await page.locator('nb-card-body').locator('nb-radio').locator(':text-is("Option 1")').click()
     await page.locator('nb-card-body').getByRole('button', {name: "Sign in"}).first().click()
});
//parent elements
test('locating parent elements', async ({page}) => {
     await page.locator ('nb-card', {hasText: "Using the Grid"}).getByRole('textbox',{name:"Email"}).click()
})
//combining the first parts of locators to make a const for reusing a variable
test('Resusing the locators', async ({page}) => {
const basicForm = page.locator('nb-card').filter({hasText:"Basic Form"})
const emailField = basicForm.getByRole('textbox',{name: "Email"})
await emailField.fill('test@test.com')
await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
await basicForm.getByRole('button').click()

await expect(emailField).toHaveValue('test@test.com')
})