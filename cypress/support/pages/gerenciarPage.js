import { fakerPT_BR } from "@faker-js/faker";

export default class GerenciarConta {
  inputNome = "[placeholder='Nome']";
  inputEmail = "[placeholder='E-mail']";
  inputSenha = "[placeholder='Senha']";
  inputConfirmarSenha = "[placeholder='Confirmar senha']";

  buttonCadastrar = ".account-save-button";
  buttonOk = ".modal-actions";
  buttonSalvar = ".account-save-button";
  buttonAlterarSenha = ".account-password-button";

  perfil = "[href='/profile']";
  headerLogin = ".login-content-header";
  headerPerfil = ".profile-header";
  nickName = ".profile-nickname";
  userInfo = ".user-info";
  linkGerenciar = "[href='/account']";
  linkLogout = "[href='/logout']";
  campoFormulario = ".input-container";
  campoTipoUsuario = ".profile-input";

  msgSucesso = ".modal-body > h3";
  msgAtualizacao = ".error-message";
  msgFormulario = ".input-error";

  clickSalvar() {
    cy.get(this.buttonSalvar).click();
  }

  clickOK() {
    cy.get(this.buttonOk).click();
  }

  clickAlterarSenha() {
    cy.get(this.buttonAlterarSenha).click();
  }

  // funcao criar usuario pra logar no site automaticamente
  logarSite() {
    cy.visit("/register");
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
