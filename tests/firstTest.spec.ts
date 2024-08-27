import {test, expect} from '@playwright/test'

test.beforeAll(async ({page}) => {
     await page.goto('http://localhost:4200/')
   });

test.beforeAll(async () => {
     // Set timeout for this hook.
     test.setTimeout(60000);
   });

test('the first test', async ({page}) => {
     await page.goto('http://localhost:4200/')
     await page.getByText('Forms').click()
     await page.getByText('Form Layouts').click()
})

test('user facing locators', async ({page}) => {
await page.getByRole ('textbox', {name: "Email"}).first().click()
await page.getByRole('button', {name: "Sign in"}).first().click()
})