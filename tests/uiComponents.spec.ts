import {test, expect} from '@playwright/test'

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/')
})
test.describe('Form Layouts page', () => {
    test.beforeEach( async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name:"Email"})
        
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially('test2@test.com')
    

    // generic assertions
    const inputValue = await usingTheGridEmailInput.inputValue()
    expect(inputValue).toEqual('test2@test.com')

    //locator assertion
    await expect(usingTheGridEmailInput).toHaveText('test2@test.com')

    })

    test('radio buttons', async({page}) => {
    
        const usingTheGridForm = page.locator('nb-card' , {hasText: "Using the Grid"})

        await usingTheGridForm.getByLabel('Option 1').check({force: true})
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
        expect (radioStatus).toBeTruthy()
        await expect(usingTheGridForm.getByRole('radio', {name:"Option 1"})).toBeChecked()
    
})

test('list and drpdowns', async ({page}) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list')// when the list has a UL tag
    page.getByRole('listitem')//when the list has a LI tag

    //const optionList = page.getByRole ('list').locator.('nb-option')
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic","Corporate"])
    await optionList.filter ({hasText: "Cosmic"}).click()


})
    })