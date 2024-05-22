import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import GerenciarConta from "../pages/gerenciarPage";
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

Given("que estou logado no site como usuario comum", function () {
  cy.visit("/");
});

Given("acessei a tela de Perfil", function () {
  cy.get(gerenciar.perfil).click();
});

Given("acesso a tela de gerenciamento de Conta", function () {
  cy.get(gerenciar.linkGerenciar).click();
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

When("altero a senha principal", function () {
  newSenha = faker.internet.password(8);
  cy.get(gerenciar.inputSenha).type(newSenha);
});

When("os campos de senhas ficam habilitados", function () {
  cy.get(gerenciar.inputSenha).should("be.enabled");
  cy.get(gerenciar.inputConfirmarSenha).should("be.enabled");
});

When("clico em cancelar", function () {
  gerenciar.clickCancelar();
});

When("nao confirmo a senha", function () {});

When("altero senha");

When("altero a senha principal {string}", function (senha) {
  cy.get(gerenciar.inputSenha).type(senha);
});

When("confirmo a senha principal {string}", function (senha) {
  cy.get(gerenciar.inputConfirmarSenha).type(senha);
});

Then("consigo visualizar meus dados", function () {
  cy.get(gerenciar.headerPerfil).should("be.visible");
  cy.get(gerenciar.nickName).should("be.visible");
});

Then("consigo visualizar a opção de gerenciar Conta", function () {
  cy.get(gerenciar.linkGerenciar).should("be.visible");
});

Then("consigo visualizar a opçao de Logout", function () {
  cy.get(gerenciar.linkLogout).should("be.visible");
});

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

Then("os campos de senhas ficam desabilitados", function () {
  cy.get(gerenciar.inputSenha).should("be.disabled");
  cy.get(gerenciar.inputConfirmarSenha).should("be.disabled");
});

Then("o campo de alterar usuario nao deve estar disponível", function () {
  cy.get(gerenciar.campoTipoUsuario).eq(2).should("be.disabled");
});

Then("o campo de alterar email não deve estar disponível", function () {
  cy.get(gerenciar.inputEmail).should("be.disabled");
});

Then(
  "o site verifica que o campo Confirmar senha está limpo com alerta no formulario",
  function () {
    cy.get(gerenciar.inputConfirmarSenha).invoke("val").should("be.empty");
    cy.get(gerenciar.msgFormulario).contains("As senhas devem ser iguais.");
  }
);

Then(
  "a operação de registro não poderá ser concluida com alerta no formulario {string}",
  function (alerta) {
    cy.get(gerenciar.msgFormulario).contains(alerta);
  }
);

Then(
  "a operação de registro não poderá ser concluida com alerta no formulario informando quantidade minima",
  function () {
    cy.get(gerenciar.msgFormulario).contains(
      "A senha deve ter pelo menos 6 dígitos"
    );
  }
);

Then(
  "a operação de registro não poderá ser concluida com alerta no formulario informando quantidade máxima",
  function () {
    cy.contains("A senha deve ter no máximo 12 dígitos.");
  }
);
