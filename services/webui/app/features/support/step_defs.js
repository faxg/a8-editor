/**
 * Steps for the Cucumber/Gherken automated acceptance test scenarios 
 * 
 * 
 */
module.exports = function() {

    this.Given('I have loaded the $name page on my $device', function(name, device) {
        // NOTE: webdriver interactions don't work here (liek browser.url(...)) ?
    });

    this.When('I look at the navigation bar "$name"', function(name) {
        browser.url('http://localhost:3000');

        browser.waitForExist('a[class="navbar-brand"]', 10000);

        var s = browser.getText('a[class="navbar-brand"]');
        //console.log(s);
        return s;
    });

    this.Then('I find a navigation item for "$item"', function(item) {
        var s = browser.getText('#navbar > ul > li');
        //console.log(s);
        return s;
    });







    this.Given('I have navigated to "$nav"', function(nav) {
        //console.log(nav);
        return browser.url('http://localhost:3000');
    });

    this.When('I click "$btnLabel"', function(btnLabel) {
        browser.url('http://localhost:3000');
        browser.click('button=' + btnLabel);
        console.log(btnLabel);
        return true;
    });

    this.Then('I see the source code within $timeout seconds', function(timeout) {
        // TODO this does not work easily through iframes -> get rid of those
        return 'pending';
    });


    this.Then('I see the dependency visualization within $timeout seconds', function(timeout) {
        // TODO this does not work easily through iframes -> get rid of those
        return 'pending';
    });




}