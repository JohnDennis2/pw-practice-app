import {test} from '@playwright/test'

test('the first test',({page}) => {
     page.goto('http://localhost:4200/')
})