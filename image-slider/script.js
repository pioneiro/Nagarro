const imageSource = [
  "https://images.pexels.com/photos/36744/agriculture-arable-clouds-countryside.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/70577/sunset-birds-flying-sky-70577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/7645177/pexels-photo-7645177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/7645259/pexels-photo-7645259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/219998/pexels-photo-219998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const main = () => {
  let animating = false;

  const slider = document.getElementById("slider");
  const left = document.getElementById("left");
  const right = document.getElementById("right");
  const dots = document.getElementById("dots");

  const len = imageSource.length;

  const index = {
    left: len - 1,
    active: 0,
    right: 1,
  };

  const elements = [];

  let activeDot = null;

  const updateBackground = () => {
    document.body.style.backgroundImage = `url(${imageSource[index.active]})`;
  };

  const setActiveDot = (index) => {
    activeDot?.classList.remove("active");
    activeDot = dots.childNodes[index];
    activeDot.classList.add("active");
  };

  const animate = (el, animation) => {
    animating = true;
    el.classList.add(animation);

    setTimeout(() => {
      animating = false;
      el.classList.remove(animation);
    }, 500);
  };

  const slide = {
    left: () => {
      elements[index.right].classList.remove("right");

      index.right = index.active;
      index.active = index.left;
      index.left = (index.left + len - 1) % len;

      elements[index.right].classList.remove("active");
      elements[index.right].classList.add("right");
      animate(elements[index.right], "exit-right");

      elements[index.active].classList.remove("left");
      elements[index.active].classList.add("active");
      animate(elements[index.active], "enter-left");

      elements[index.left].classList.add("left");

      setActiveDot(index.active);
      updateBackground();
    },
    right: () => {
      elements[index.left].classList.remove("left");

      index.left = index.active;
      index.active = index.right;
      index.right = (index.right + 1) % len;

      elements[index.left].classList.remove("active");
      elements[index.left].classList.add("left");
      animate(elements[index.left], "exit-left");

      elements[index.active].classList.remove("right");
      elements[index.active].classList.add("active");
      animate(elements[index.active], "enter-right");

      elements[index.right].classList.add("right");

      setActiveDot(index.active);
      updateBackground();
    },
  };

  imageSource.forEach((src, i) => {
    const img = document.createElement("img");
    const dot = document.createElement("span");

    img.src = src;
    img.classList.add("slider-img");
    dot.classList.add("dot");
    dot.id = i;

    slider.appendChild(img);
    dots.appendChild(dot);
    elements.push(img);

    if (i === index.left) img.classList.add("left");
    if (i === index.right) img.classList.add("right");
    if (i === index.active) {
      img.classList.add("active");
      updateBackground();
      setActiveDot(i);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (animating) return;

    switch (e.key) {
      case "ArrowRight":
        slide.right();
        break;
      case "ArrowLeft":
        slide.left();
        break;
    }
  });

  left.addEventListener("click", !animating && slide.left);
  right.addEventListener("click", !animating && slide.right);

  dots.addEventListener("click", async (e) => {
    if (!e.target.id.match(/[0-9]/)) return;

    const target = Number(e.target.id);

    if (target === index.active) return;

    while (target > index.active) {
      slide.right();
      await new Promise((res) => setTimeout(res, 100));
    }

    while (target < index.active) {
      slide.left();
      await new Promise((res) => setTimeout(res, 100));
    }
  });
};

document.addEventListener("DOMContentLoaded", main);
