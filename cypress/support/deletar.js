// deletar usuario

//falta verificar como pegar o id do usuario

//Logar
cy.request({
  method: "POST",
  url: "https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login",
  body: {
    email: email,
    password: senha,
  },
}).then(function (response) {
  token = response.body.accessToken;

  //tornar admin e deletar
  cy.request({
    method: "PATCH",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/admin",
    auth: {
      bearer: token,
    },
  }).then(function () {
    cy.request({
      method: "DELETE",
      url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/" + id,
      auth: {
        bearer: token,
      },
    });
  });
});
