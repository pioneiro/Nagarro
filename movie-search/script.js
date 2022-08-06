const apiURL = "https://www.omdbapi.com";
const apiKey = "thewdb";

const editRuntime = (time) => {
  const min = Number(time.split(" ")[0]);

  if (!min) return null;

  const hours = Math.floor(min / 60);
  const mins = min % 60;

  return (hours ? `${hours} hours ` : "") + (mins ? `${mins} minutes` : "");
};

const main = () => {
  const form = document.getElementById("form");
  const result = document.getElementById("result");
  const error = document.getElementById("error");
  const def = document.getElementById("default");
  const loader = document.getElementById("loader");

  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    loader.classList.add("invisible");

    const data = JSON.parse(xhr.responseText);

    if (data.Response === "False") {
      error.innerText = data.Error;
      error.classList.remove("hidden");
      return;
    }

    data.Runtime = editRuntime(data.Runtime);

    const fields = [...result.querySelectorAll("[data-id]")];

    fields.forEach((field) => {
      if (!data[field.dataset.id]) return;

      if (field.tagName === "IMG")
        field.setAttribute("src", data[field.dataset.id]);
      else field.innerText = data[field.dataset.id];
    });

    result.classList.remove("hidden");
  };

  const getFormData = () => Object.fromEntries(new FormData(form));

  const generateEncodedURI = (searchData) => {
    searchData.r = "json";
    searchData.plot = "full";
    searchData.apikey = apiKey;

    const searchString = encodeURI(
      Object.keys(searchData)
        .map((e) => `${e}=${searchData[e]}`)
        .join("&")
    );

    const url = new URL(apiURL);
    url.search = searchString;

    return url.href;
  };

  const searchMovie = async (e) => {
    e.preventDefault();

    const formData = getFormData();

    xhr.abort();

    result.classList.add("hidden");
    error.classList.add("hidden");
    def.classList.add("hidden");

    if (!formData.t) {
      loader.classList.add("invisible");
      def.classList.remove("hidden");
      return;
    }

    loader.classList.remove("invisible");

    xhr.open("GET", generateEncodedURI(formData));
    xhr.send();
  };

  form.addEventListener("input", searchMovie);
  form.addEventListener("submit", searchMovie);
};

document.addEventListener("DOMContentLoaded", main);
