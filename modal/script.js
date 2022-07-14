const regex = {
  name: /^[a-zA-Z ]{3,}$/,
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  confirmPassword:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

const main = () => {
  const form = document.querySelector("#form");
  const modal = document.getElementById("modal");
  const open = document.getElementById("modal-btn");
  const close = document.getElementById("close-btn");
  const layer = document.getElementById("modal-layer");

  const input = {
    name: document.querySelector("#name"),
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    confirmPassword: document.querySelector("#confirmPassword"),
  };

  const error = {
    name: document.querySelector('[data-error="name"]'),
    email: document.querySelector('[data-error="email"]'),
    password: document.querySelector('[data-error="password"]'),
    confirmPassword: document.querySelector('[data-error="confirmPassword"]'),
  };

  const message = {
    name: "Name must be at least 3 characters long and contain only letters and spaces",
    email: "Enter a valid email address",
    password:
      "Password must be at least 8 characters long and contain at least one number, one uppercase and one special character",
    confirmPassword:
      "Password must be at least 8 characters long and contain at least one number, one uppercase and one special character",
  };

  const valid = {
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  };

  const required = {
    name: true,
    email: true,
    password: true,
    confirmPassword: true,
  };

  const validate = {};

  Object.keys(input).forEach((key) => {
    validate[key] = () => {
      error[key].innerText =
        input[key].value === "" && required[key]
          ? "This field is required"
          : "";

      valid[key] = regex[key].test(input[key].value);

      valid[key]
        ? input[key].classList.remove("error")
        : input[key].classList.add("error");
      error[key].innerText =
        valid[key] || input[key].value === ""
          ? error[key].innerText
          : message[key];
    };
  });

  const matchPassword = ({ target: element }) => {
    if (!valid.password || !valid.confirmPassword) return true;

    const { id: key } = element;
    const conflict = input.password.value !== input.confirmPassword.value;

    conflict
      ? input[key].classList.add("error")
      : input[key].classList.remove("error");
    conflict && (error[key].innerText = "Passwords do not match");

    return !conflict;
  };

  const resetForm = () => {
    Object.keys(input).forEach((key) => {
      input[key].value = "";
      input[key].classList.remove("error");
      error[key].innerText = "";
      valid[key] = false;
    });
  };

  open.addEventListener("click", resetForm);

  open.addEventListener("click", () => modal.classList.remove("hidden"));
  close.addEventListener("click", () => modal.classList.add("hidden"));
  layer.addEventListener("click", () => modal.classList.add("hidden"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.classList.add("hidden");
  });

  input.name.addEventListener("focus", validate.name);
  input.email.addEventListener("focus", validate.email);
  input.password.addEventListener("focus", validate.password);
  input.confirmPassword.addEventListener("focus", validate.confirmPassword);

  input.name.addEventListener("keyup", validate.name);
  input.email.addEventListener("keyup", validate.email);
  input.password.addEventListener("keyup", validate.password);
  input.confirmPassword.addEventListener("keyup", validate.confirmPassword);

  input.password.addEventListener("keyup", matchPassword);
  input.confirmPassword.addEventListener("keyup", matchPassword);

  input.name.addEventListener("change", validate.name);
  input.email.addEventListener("change", validate.email);
  input.password.addEventListener("change", validate.password);
  input.confirmPassword.addEventListener("change", validate.confirmPassword);

  input.password.addEventListener("change", matchPassword);
  input.confirmPassword.addEventListener("change", matchPassword);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    Object.keys(input).forEach((key) => validate[key]());

    if (valid.name && valid.email && valid.password && valid.confirmPassword) {
      modal.classList.add("hidden");
      resetForm();
    }
  });
};

document.addEventListener("DOMContentLoaded", main);
