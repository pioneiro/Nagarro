const github = "https://github.com/pioneiro/Nagarro/tree/master/";

const pushState = (url) => window.history.pushState({}, "", url);
const replaceState = (url) => window.history.replaceState({}, "", url);

const main = () => {
  const links = document.querySelectorAll("nav > button");
  const loading = document.getElementById("loading");
  const frame = document.getElementById("frame");
  const title = document.getElementById("title");
  const code = document.getElementById("code");

  let active = null;

  const updateWindow = () => {
    let current = location.hash.slice(1);

    if (!current) {
      current = "portfolio";
      replaceState("#portfolio");
    }

    active?.classList.remove("active");

    active = [...links].filter((link) =>
      link.dataset.link?.includes(current)
    )[0];

    if (!active) {
      active = links[0];
      current = "portfolio";
      replaceState("#portfolio");
    }

    active.classList.add("active");
    updateFrame(active);
  };

  const updateFrame = (link) => {
    frame.contentWindow.location.replace(link.dataset.link);
    title.innerText = link.innerText;
    document.title = `Nagarro Projects | ${link.innerText}`;
    code.setAttribute("href", new URL(link.dataset.link, github).href);
    loading.style.visibility = "visible";
    frame.contentWindow.focus();
  };

  updateWindow();

  window.addEventListener("popstate", updateWindow);

  links.forEach((link) => {
    "link" in link.dataset &&
      link.addEventListener("click", () => {
        pushState(`#${link.dataset.link.slice(2)}`);
        updateFrame(link);

        active.classList.remove("active");
        link.classList.add("active");
        active = link;
      });

    "github" in link.dataset &&
      link.addEventListener("click", () => {
        window.open(new URL(link.dataset.github, github).href, "_blank");
      });

    "url" in link.dataset &&
      link.addEventListener("click", () => {
        window.open(link.dataset.url, "_blank");
      });
  });

  frame.addEventListener("load", () => {
    loading.style.visibility = "hidden";
    title.innerText = frame.contentDocument.title;
    document.title = `Nagarro Projects | ${frame.contentDocument.title}`;
  });
};

document.addEventListener("DOMContentLoaded", main);
