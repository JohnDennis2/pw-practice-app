import {test,expect} from '@playwright/test'
import {NavigationPage} from  '../pageObjects/navigationPage'

test.beforeEach(async({page}) => {
    await page.goto('https://localhost:4200/')
})

test('navigate to form page', async ({page})=>{
    const navigateTo= new NavigationPage(page)
    await navigateTo.formLayoutsPage()

})