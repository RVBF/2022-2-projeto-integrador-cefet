// Generated with ❤ by Concordia
// source: C:\Vitor\Faculdade\10º semestre\PIS\2022-2\2022-2-pis-grupo1\front-end\features\testConcordia.testcase
//
// THIS IS A GENERATED FILE - MODIFICATIONS CAN BE LOST !

const assert = require("assert").strict;

Feature("Search");

Scenario("Shows results that correspond to the term | Procurar por concordia no google - 1", async ({I}) => {
    I.amOnPage("https://google.com"); // (11,2)
    I.fillField('q', "concordialang"); // (12,2)
    I.pressKey("Enter"); // (13,4)
    I.wait(2); // (14,4)
    I.see("npm"); // (15,2)
});

