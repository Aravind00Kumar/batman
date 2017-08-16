function waitForElementToBePresent(element){
    browser.wait(function () {
    return element.isPresent();
    },60000);

    browser.wait(function () {
    return element.isDisplayed();
    },60000);
};