export default class Login {
  inputEmail = "[placeholder='E-mail']";
  inputSenha = "[placeholder='Password']";

  buttonLogin = ".login-button";
  buttonOk = ".modal-actions";

  msgFalha = ".modal-body";
  msgUsuarioInvalido = ".error-message";
  msgFormulario = ".input-error";

  perfil = ".movies-page-link";

  typeEmail(email) {
    cy.get(this.inputEmail).type(email);
  }

  typeSenha(senha) {
    cy.get(this.inputSenha).type(senha);
  }

  clickLogin() {
    cy.get(this.buttonLogin).click();
  }

  clickOK() {
    cy.get(this.buttonOk).click();
  }
}
