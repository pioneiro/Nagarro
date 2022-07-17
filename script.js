const github = "https://github.com/pioneiro/Nagarro/tree/master/";

const pushState = (url) => window.history.pushState({}, "", url);

const main = () => {
  const links = document.querySelectorAll("button[data-link]");
  const loading = document.getElementById("loading");
  const frame = document.getElementById("frame");
  const title = document.getElementById("title");
  const code = document.getElementById("code");

  const updateFrame = (link) => {
    frame.src = link.dataset.link;
    title.innerText = link.innerText;
    code.setAttribute("href", new URL(link.dataset.link, github).href);
    loading.style.visibility = "visible";
    pushState(`#${link.dataset.link.slice(2)}`);
    frame.contentWindow.focus();
  };

  let current = location.hash.slice(1);

  if (!current) {
    current = "portfolio";
    pushState("#portfolio");
  }

  let active = [...links].filter((link) =>
    link.dataset.link.includes(current)
  )[0];

  if (!active) {
    active = links[0];
    current = "portfolio";
    pushState("#portfolio");
  }

  active.classList.add("active");
  updateFrame(active);

  links.forEach((link) => {
    link.addEventListener("click", () => {
      updateFrame(link);

      active.classList.remove("active");
      link.classList.add("active");
      active = link;
    });
  });

  frame.addEventListener("load", () => {
    loading.style.visibility = "hidden";
    title.innerText = frame.contentDocument.title;
  });
};

document.addEventListener("DOMContentLoaded", main);
