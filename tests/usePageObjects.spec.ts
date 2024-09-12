import {test,expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('https://localhost:4200/')
})

test('navigate to form page', async ({page})=>{
    
})