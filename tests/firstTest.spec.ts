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
     await page.waitForLoadState('load');
     await page.getByText('Form Layouts').getByRole("textbox", {name: "Email"}).first().click()
await page.getByRole('button', {name: "Sign in"}).first().click()
});
// child elements
test('locating child elements', async ({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
     await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")').click()
     await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()
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

//extracting values

test('extracting values', async ({page}) =>{
     const basicForm = page.locator('nb-card').filter({hasText:"Basic form"})
     const buttonText = await basicForm.locator('button').textContent()
     expect(buttonText).toEqual('Submit')

     //all text values
     const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
     expect(allRadioButtonsLabels).toContain("Option 1 ")

     //input value fields

     const emailField = basicForm.getByRole('textbox', {name: "Email"})
     await emailField.fill('test@test.com')
     const emailValue = await emailField.inputValue()
     expect(emailValue).toEqual('test@test.com')

})


