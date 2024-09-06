import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})
test.describe('Form Layouts page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" })

        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test2@test.com')


        // generic assertions
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        //locator assertion
        await expect(usingTheGridEmailInput).toHaveText('test2@test.com')

    })

    test('radio buttons', async ({ page }) => {

        const usingTheGridForm = page.locator('nb-card', { hasText: "Using the Grid" })

        await usingTheGridForm.getByLabel('Option 1').check({ force: true })
        const radioStatus = await usingTheGridForm.getByRole('radio', { name: "Option 1" }).isChecked()
        expect(radioStatus).toBeTruthy()
        await expect(usingTheGridForm.getByRole('radio', { name: "Option 1" })).toBeChecked()

    })

    test('list and drpdowns', async ({ page }) => {
        const dropDownMenu = page.locator('ngx-header nb-select')
        await dropDownMenu.click()

        page.getByRole('list')// when the list has a UL tag
        page.getByRole('listitem')//when the list has a LI tag

        //const optionList = page.getByRole ('list').locator.('nb-option')
        const optionList = page.locator('nb-option-list nb-option')
        await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
        await optionList.filter({ hasText: "Cosmic" }).click()


    })
})

test('checkboxes', async ({ page }) => {
    await page.getByText('Models & Overlays').click()
    await page.getByText('Toaster').click()

    await page.getByRole('checkbox', { name: "Hide on click" }).uncheck({ force: true })
    await page.getByRole('checkbox', { name: "Prevent arising of dupilcate toast" }).check({ force: true })

    const allBoxes = page.getByRole('checkbox')
    for (const box of await allBoxes.all()) {
        await box.check({ force: true })
        expect(await box.isChecked()).toBeTruthy()
    }
})

test('dropdown menus and list', async ({ page }) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list') //when the list has a UL tag
    page.getByRole('listitem') //when the list has an LI tag

    //const optionList = page.getByRole('list').locator('nb-options')

    const optionList = page.locator('nb-options-list nb-options')
    await expect(optionList).toHaveText(["Light", " Dark", "Cosmic", "Coroprate"])
    await optionList.filter({ hasText: "Cosmic" }).click()

    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50,50,89)')

    const colors = {
        "Light": "rgb(255,255,255)",
        "Dark": "rgb(34, 43,, 69)",
        "Cosmic": "rgb(50,50,89)",
        "Corporate": "rgb(255,255,255)"
    }

    for (const color in colors) {
        await optionList.filter({ hasText: color }).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if (color != "Corporate")
            await dropDownMenu.click()
    }


})

test('tooltips', async ({ page }) => {
    await page.getByText('Models & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipCard = page.locator('nb-card', { hasText: "Tooltip Placements" })
    await toolTipCard.getByRole('button', { name: "Top" }).hover()

    page.getByRole('tooltip')// if you have arole tooltip created
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')

})

test('dialog box', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
    })

    await page.getByRole('table').locator('tr', { hasText: "mdo@gmail.com" }).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText("mdo@gmail.com")
})

test('web tables', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // get the row by any test in this row
    const targetRow = page.getByRole('row', { name: "twitter@outlook.com" })
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('nb-checkmark').click()

    //get the row based on the value in the specific column
    await page.locator('ng2-smart-pagination-nav').getByText('2').click()
    const targetRowById = page.getByRole('row', { name: "11" }).filter({ has: page.locator('td').nth(1).getByText('11') })
    await targetRow.click()


})

