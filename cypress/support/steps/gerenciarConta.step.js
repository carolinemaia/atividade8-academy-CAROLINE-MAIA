import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import GerenciarConta from "../pages/gerenciarConta";
import { faker } from "@faker-js/faker";

const gerenciar = new GerenciarConta();
var idUser;
var newName;
var newSenha;

beforeEach(function () {
  gerenciar.logarSite();
  cy.wait("@post").then(function (intercept) {
    idUser = intercept.response.body.id;
  });
});

Given("que estou na pagina inicial", function () {
  cy.visit("/");
});

Given("que estou logado no site", function () {
  cy.visit("/");
  //cy.wait("@auth");
});

Given("acesso a tela de gerenciamento de Conta", function () {
  cy.get(gerenciar.linkGerenciar).click();
});

When("acesso o endereço do Perfil", function () {
  cy.visit("/profile");
});

When("realizo a edição do nome", function () {
  newName = faker.person.fullName();
  cy.get(gerenciar.inputNome).clear();
  cy.get(gerenciar.inputNome).type(newName);
});

When("confirmo a operação", function () {
  cy.intercept(
    "PUT",
    "https://raromdb-3c39614e42d4.herokuapp.com/api/users/" + idUser
  ).as("put");
  gerenciar.clickSalvar();
});

When("acesso a tela de Perfil", function () {
  cy.get(gerenciar.perfil).click();
});

When("clico em Alterar Senha", function () {
  gerenciar.clickAlterarSenha();
});

When("realizo a edição da senha principal e confirmação de senha", function () {
  newSenha = faker.internet.password(8);
  cy.get(gerenciar.inputSenha).clear();
  cy.get(gerenciar.inputSenha).type(newSenha);
  cy.get(gerenciar.inputConfirmarSenha).clear();
  cy.get(gerenciar.inputConfirmarSenha).type(newSenha);
});

Then("devo ser direcionado para tela de Login", function () {
  cy.get(gerenciar.headerLogin).contains("Login");
  cy.get(gerenciar.headerLogin).contains("Entre com suas credenciais");
  cy.get(".input-container").eq(0);
  cy.get(".input-container").eq(1);
});

Then("consigo visualizar meus dados", function () {
  cy.get(gerenciar.headerPerfil).should("be.visible");
  cy.get(gerenciar.nickName).should("be.visible");
  cy.get(gerenciar.userInfo).should("be.visible");
});

Then("consigo visualizar a opção de gerenciar Conta", function () {
  cy.get(gerenciar.linkGerenciar).should("be.visible");
});

Then("consigo visualizar a opçao de Logout", function () {
  cy.get(gerenciar.linkLogout).should("be.visible");
});

Then("é possivel visualizar informaçoes do seu cadastro", function () {});

Then(
  "a operaçao é finalizada com mensagem de informações atualizadas com sucesso",
  function () {
    cy.get(gerenciar.msgSucesso).contains("Sucesso");
    cy.get(gerenciar.msgAtualizacao).contains("Informações atualizadas");
  }
);

Then("ao clicar OK o nome deve está atualizado", function () {
  gerenciar.clickOK();
  cy.get(gerenciar.inputNome).should("have.value", newName);
});

Then("o botao Ok deve retornar para o formulário", function () {
  gerenciar.clickOK();
  cy.get(gerenciar.campoFormulario).eq(0).should("be.visible");
  cy.get(gerenciar.campoFormulario).eq(1).should("be.visible");
  cy.get(gerenciar.campoFormulario).eq(2).should("be.visible");
  cy.get(gerenciar.campoFormulario).eq(3).should("be.visible");
  cy.get(gerenciar.campoFormulario).eq(4).should("be.visible");
});
