const apiURL = "https://baconipsum.com/api/?type=all";

const generateParagraph = async () => {
  const res = await fetch(apiURL);
  const data = await res.json();

  return data.join(" ");
};

const main = async () => {
  const random = document.getElementById("random");
  const copy = document.getElementById("copy");

  const para = await generateParagraph();

  random.innerHTML = para;

  copy.style.visibility = "visible";
  copy.addEventListener("click", () => {
    navigator.clipboard.writeText(para).then(() => {
      copy.innerHTML = "Copied!";

      setTimeout(() => {
        copy.innerHTML = "Copy";
      }, 1000);
    });
  });
};

document.addEventListener("DOMContentLoaded", main);
