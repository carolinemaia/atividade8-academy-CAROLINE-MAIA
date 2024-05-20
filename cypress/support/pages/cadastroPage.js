import { fakerPT_BR } from "@faker-js/faker";

export default class CadastroPage {
  inputNome = "[placeholder='Nome']";
  inputEmail = "[placeholder='E-mail']";
  inputSenha = "[placeholder='Senha']";
  inputConfirmarSenha = "[placeholder='Confirmar senha']";

  buttonCadastrar = ".account-save-button";
  buttonOk = ".modal-actions";

  msgSucesso = "div.modal-body";
  msgErro = ".input-error";
  msgFalhaCadastro = ".modal-body";
  mcsgErroCadastro = ".error-message";
  campoForms = ".input-container";

  perfil = ".movies-page-link";

  typeNome(nome) {
    cy.get(this.inputNome).type(nome);
  }

  typeEmail(email) {
    cy.get(this.inputEmail).type(email);
  }

  typeSenhaValida() {
    cy.get(this.inputSenha).type("123456");
  }

  typeConfirmarSenhaValida() {
    cy.get(this.inputConfirmarSenha).type("123456");
  }

  typeSenhaInvalida(senha) {
    cy.get(this.inputSenha).type(senha);
  }

  typeConfirmarSenhaInvalida(senha) {
    cy.get(this.inputConfirmarSenha).type(senha);
  }

  typeConfirmarSenhaDivergente(senha) {
    cy.get(this.inputConfirmarSenha).type(senha);
  }

  clickCadastrar() {
    cy.get(this.buttonCadastrar).click();
  }

  clickOk() {
    cy.get(this.buttonOk).click();
  }

  registrarUsuario() {
    cy.intercept(
      "POST",
      "https://raromdb-3c39614e42d4.herokuapp.com/api/users"
    ).as("post");
    cy.get(this.inputNome).type("Caroline Maia");
    cy.get(this.inputEmail).type(fakerPT_BR.internet.email());
    cy.get(this.inputSenha).type("123456");
    cy.get(this.inputConfirmarSenha).type("123456");
    cy.intercept(
      "POST",
      "https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login"
    ).as("auth");
    cy.get(this.buttonCadastrar).click();
    cy.get(this.buttonOk).click();
  }
}
