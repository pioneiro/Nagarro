const apiURL = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "2a0bcb7e6207dc404791b31d1c660fd2";

const main = async () => {
  const form = document.getElementById("form");
  const temp = document.getElementById("temp");
  const feel = document.getElementById("feel");
  const icon = document.getElementById("icon");
  const result = document.getElementById("result");
  const q = document.querySelector('input[name="q"]');

  const getIconURL = (code) =>
    `http://openweathermap.org/img/wn/${code}@2x.png`;

  const getFormData = () => Object.fromEntries(new FormData(form));

  const generateEncodedURI = (searchData) => {
    searchData.units = "metric";
    searchData.appid = apiKey;

    const searchString = encodeURI(
      Object.keys(searchData)
        .map((e) => `${e}=${searchData[e]}`)
        .join("&")
    );

    const url = new URL(apiURL);
    url.search = searchString;

    return url.href;
  };

  const updateWeather = async (formData) => {
    if ("q" in formData && !formData.q) return alert("Invalid Query");

    try {
      const res = await fetch(generateEncodedURI(formData));
      const data = await res.json();

      if (data.cod !== 200) return alert(data.message);

      q.value = `${data.name}, ${data.sys.country}`;
      temp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
      feel.innerHTML = `Feels like ${Math.round(data.main.feels_like)}&deg;C`;
      icon.setAttribute("src", getIconURL(data.weather[0].icon));

      result.style.visibility = "visible";
    } catch {
      alert("Encountered an Error while Fetching Weather");
    }
  };

  const updateLocationWeather = () =>
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lon } = position.coords;

        updateWeather({ lat, lon });
      },
      ({ code }) => {
        if (code === 1)
          alert("Please Allow Location Access to use this Feature");
        else alert("Error using location");
      }
    );

  form.addEventListener("reset", (e) => {
    e.preventDefault();

    result.style.visibility = "hidden";
    updateLocationWeather();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    result.style.visibility = "hidden";
    updateWeather(getFormData());
  });

  const locationPermission = await navigator.permissions.query({
    name: "geolocation",
  });

  if (locationPermission.state !== "denied") updateLocationWeather();
};

document.addEventListener("DOMContentLoaded", main);
