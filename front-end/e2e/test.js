Feature('test');

Scenario('test something', ({ I }) => {
    I.amOnPage('https://google.com');
    I.see('Brasil');
});
