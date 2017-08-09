let pageURL = browser.baseUrl;
beforeEach(function () {
    isAngularSite(false); // isAngularSite(true), if it's an Angular app!
});

describe('Batman home page', function () {

    it('should load', function () {
        browser.driver.get(pageURL);
        pageLoad.then(function () {
            expect(browser.getCurrentUrl()).toBe(pageURL);
            browser.driver.findElement(by.id('_tile1'))
                .then(function (tile) {
                    return tile.findElements(by.tagName('a'));
                }).then(function (links) {
                    expect(links.length).toEqual(2)
                }).catch(function (e) {
                    console.log(e)
                })
        });

    });
    it('should navigate to the demo example page', function () {
        browser.driver.get(pageURL);
        pageLoad.then(function () {
            expect(browser.getCurrentUrl()).toBe(pageURL);
            browser.driver.findElement(by.id('_tile1_item1'))
                .then(function (demoLink) {
                    return demoLink.click()
                }).then(function (links) {
                    expect(browser.getCurrentUrl()).toBe(pageURL + 'public/index.html');
                }).catch(function (e) {
                    console.log(e)
                })
        });
    });
    it('should navigate to the JavaScript example page', function () {
        browser.driver.get(pageURL + 'public/index.html');
        pageLoad.then(function () {
            browser.driver.findElement(by.id('_js'))
                .then(function (jslink) {
                    return jslink.click()
                }).then(function (links) {
                    debugger;
                    expect(browser.getCurrentUrl()).toBe(pageURL + 'public/js/src/index.html#');
                }).catch(function (e) {
                    console.log(e)
                })
        });
    });
});

