import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { fakerPT_BR } from "@faker-js/faker";

Given("que estou na página de Login", function () {
  cy.visit("/login");
});

Given("tenho cadastro", function () {
  cy.intercept("");
});

When("informo e-mail cadastrado", function () {});

When("informo senha", function () {});

When("confirmo operação", function () {});

Then("consigo autenticar com sucesso no site", function () {});
