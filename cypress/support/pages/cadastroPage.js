export default class CadastroPage {
  inputNome = "[placeholder='Nome']";
  inputEmail = "[placeholder='E-mail']";
  inputSenha = "[placeholder='Senha']";
  inputConfirmarSenha = "[placeholder='Confirmar senha']";

  buttonCadastrar = ".account-save-button";

  msgSucesso = "div.modal-body";
  msgErro = ".input-error";

  typeNome(nome) {
    cy.get(this.inputNome).type(nome);
  }

  typeEmail(email) {
    cy.get(this.inputEmail).type(email);
  }

  typeSenha() {
    cy.get(this.inputSenha).type("123456");
  }

  typeConfirmarSenha() {
    cy.get(this.inputConfirmarSenha).type("123456");
  }

  clickCadastrar() {
    cy.get(this.buttonCadastrar).click();
  }
}
