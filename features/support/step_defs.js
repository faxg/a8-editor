/**
 * Steps for the Cucumber automated acceptance tests.
 * Sweet. May be useful for end-to-end resiliency testing fixtures as well...
 * 
 * 
 */
module.exports = function() {


    /**
     * Opens a url in the browser
     */
    this.When('I open "$name"', function(name) {
        browser.url(name);
    });

    /**
     * Looks into the Bootstrap navbar for an link containing the given item text
     */
    this.Then('there is a navigation menu item for "$item"', function(item) {
        return browser.waitForExist('//ul[@class="nav navbar-nav"]/li/a[text()="' + item + '"]');
    });



    /**
     * Clicks on a <button> given the label (= text content)
     */
    this.When('I click the button "$btnLabel"', function(btnLabel) {
        var selector = `button=${btnLabel}`;
        browser.waitForExist(selector);
        browser.element(selector).click();
    });

    /**
     * Clicks on the first link <a> with a given text found on the page
     */
    this.When('I click on "$linkText"', function(linkText) {
        browser.waitForExist('a=' + linkText);
        browser.element('a=' + linkText).click();
    });

    /**
     * This looks for a <label> element, extracts the input's id from the "for" attribute, 
     * sets new text into the corresponding <input> element, and then blur() the input to trigger data binding updates  
     */
    this.Then('I can set the input text for "$inputLabel" to "$inputText"', function(inputLabel, inputText) {
        var inputId = browser.getAttribute('//label[text()="' + inputLabel + '"]', 'for');
        browser.setValue('#' + inputId, inputText);
        // HACK inject JQuery to blur() and trigger data binding 
        browser.execute(function(id) {
            $('#' + id).blur();
        }, inputId);
    });


    /**
     * This looks for some text string anywhere inside the page
     */
    this.Then('I find the text "$text" on the page', function(text) {
        browser.waitForText('//*[text()="' + text + '"]');
    });



    /**
     * This checks if the named source code editor will be visible within a given timeframe.
     * Note naming convention for the pre tag hosting the editor: <div id="editor<EDITOR_NAME>">
     */
    this.Then('I can see the source editor for "$editorName" within $timeout seconds', function(editorName, timeout) {
        browser.waitForVisible('//div[@id="editor' + editorName + '"]', timeout);

    });

    this.Then('I see a "$visualization" visualization within $timeout seconds', function(visualization, timeout) {
        browser.waitForVisible(`//div[@id="${visualization}ViewContainer"]`, timeout);
    });





}