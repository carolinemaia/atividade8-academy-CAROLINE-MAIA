import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { fakerPT_BR } from "@faker-js/faker";
import Login from "../pages/authPage";

const loginUser = new Login();

var dadoLoginEmail = fakerPT_BR.internet.email();
var dadoLoginSenha = fakerPT_BR.internet.password(8);

Given("que estou na página de Login", function () {
  cy.visit("/login");
});

Given("tenho cadastro", function () {
  cy.request({
    method: "POST",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users",
    body: {
      name: "Carol M",
      email: dadoLoginEmail,
      password: dadoLoginSenha,
    },
  });
});

When("informo e-mail cadastrado", function () {
  cy.get("[placeholder='E-mail']").type(dadoLoginEmail);
});

When("informo senha", function () {
  cy.get("[placeholder='Password']").type(dadoLoginSenha);
});

When("confirmo operação", function () {
  cy.intercept(
    "POST",
    "https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login"
  ).as("auth");
  loginUser.clickLogin();
});

When("informo e-mail nao cadastrado", function () {
  cy.get("[placeholder='E-mail']").type(
    "essemmailcomcertezanaoexiste123@hot.com"
  );
});

Then("consigo autenticar com sucesso no site", function () {
  cy.wait("@auth");

  cy.url().should(
    "equal",
    "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/"
  );
});

Then(
  "nao consigo autenticar com mensagem informando usuário inválido",
  function () {
    cy.wait("@auth");
    cy.get(loginUser.msgFalha).contains("Falha ao autenticar");
    cy.get(loginUser.msgUsuarioInvalido).contains(
      "Usuário ou senha inválidos."
    );
  }
);
