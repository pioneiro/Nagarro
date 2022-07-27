const target = document.getElementById("target");

const buttons = {
  black: document.getElementById("black"),
  blue: document.getElementById("blue"),
  green: document.getElementById("green"),
  yellow: document.getElementById("yellow"),
};

Object.keys(buttons).forEach((key) => {
  buttons[key].addEventListener("click", (e) => {
    const id = e.target.id;
    target.style.backgroundColor = `var(--${id}-primary)`;
    target.style.color = `var(--${id}-secondary)`;
    target.style.borderColor = `var(--${id}-secondary)`;
  });
});
