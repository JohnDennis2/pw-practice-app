import {Page} from "playwright/test";

export class NavigationPage {

    readonly page: Page

    constructor(page : Page){
        this.page = page

    }

    async formLayoutsPage(){
        await this.page.getByText('Forms').click()
        await this.page.getByText('Forms Layouts').click()
    }
    async datepickerPage(){

    }
    async smartTablePAge(){
        await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    }
    async toasterPage(){
        await page.getByText('Models & Overlays').click()
        await page.getByText('Toaster').click()

    }
    async tooltipPage(){
        await page.getByText('Models & Overlays').click()
        await page.getByText('Tooltip').click()

    }

    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState == "false")
        await groupMenuItem.click()
    }
}