const regex = {
  name: /^[a-zA-Z ]{3,}$/,
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

$(document).ready(() => {
  const form = $("#form");

  const input = {
    name: $("#name"),
    email: $("#email"),
    password: $("#password"),
    confirmPassword: $("#confirmPassword"),
  };

  const error = {
    name: $('[data-error="name"]'),
    email: $('[data-error="email"]'),
    password: $('[data-error="password"]'),
    confirmPassword: $('[data-error="confirmPassword"]'),
  };

  const message = {
    name: "Name must be at least 3 characters long and contain only letters and spaces",
    email: "Enter a valid email address",
    password:
      "Password must be at least 8 characters long and contain at least one number, one uppercase and one special character",
    confirmPassword: "Either password does not match or is empty",
  };

  const valid = {
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  };

  const validate = {};

  Object.keys(input).forEach((key) => {
    validate[key] = () => {
      valid[key] =
        key === "confirmPassword"
          ? valid.password && input[key].val() === input.password.val()
          : regex[key].test(input[key].val());

      valid[key]
        ? input[key].removeClass("error")
        : input[key].addClass("error");
      error[key].text(valid[key] ? "" : message[key]);
    };
  });

  // const validate = {
  //   name: () => {
  //     valid.name = regex.name.test(input.name.val());
  //     valid.name || input.name.val().length === 0
  //       ? error.name.hide()
  //       : error.name.show();
  //     error.name.text(valid.name ? "" : "Name must be at least 3 characters");
  //   },
  //   email: () => {
  //     valid.email = regex.email.test(input.email.val());
  //     valid.email || input.email.val().length === 0
  //       ? error.email.hide()
  //       : error.email.show();
  //     error.email.text(valid.email ? "" : "Email is not valid");
  //   },
  //   password: () => {
  //     valid.password = regex.password.test(input.password.val());
  //     valid.password || input.password.val().length === 0
  //       ? error.password.hide()
  //       : error.password.show();
  //     error.password.text(
  //       valid.password ? "" : "Password must be at least 8 characters"
  //     );
  //   },
  //   confirmPassword: () => {
  //     valid.confirmPassword =
  //       input.password.val() === input.confirmPassword.val();
  //     valid.confirmPassword || input.confirmPassword.val().length === 0
  //       ? error.confirmPassword.hide()
  //       : error.confirmPassword.show();
  //     error.confirmPassword.text(
  //       valid.confirmPassword
  //         ? ""
  //         : "Password and confirm password must be the same"
  //     );
  //   },
  // };

  input.name.on("keyup", validate.name);
  input.email.on("keyup", validate.email);
  input.password.on("keyup", validate.password);
  input.password.on("keyup", validate.confirmPassword);
  input.confirmPassword.on("keyup", validate.confirmPassword);

  input.name.on("change", validate.name);
  input.email.on("change", validate.email);
  input.password.on("change", validate.password);
  input.password.on("change", validate.confirmPassword);
  input.confirmPassword.on("change", validate.confirmPassword);

  form.submit((e) => {
    e.preventDefault();

    Object.keys(input).forEach((key) => validate[key]());

    if (valid.name && valid.email && valid.password && valid.confirmPassword)
      console.log("form submitted");
  });
});
