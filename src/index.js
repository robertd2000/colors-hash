const cols = document.querySelectorAll(".col");

document.addEventListener("keydown", (e) => {
  e.preventDefault();

  if (e.code.toLowerCase() === "space") {
    setRandomColors();
  }
});

document.addEventListener("click", (e) => {
  const type = e.target.dataset.type;

  if (type === "lock") {
    const node =
      e.target.tagName.toLowerCase() === "i" ? e.target : e.target.children[0];
    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyToClpkboard(e.target.textContent);
  }
});

// const gnerateRandomColor = () => {
//   const hexCodes = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
//   }
//   return color;
// };

const setTextColor = (text, color) => {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
};

const setRandomColors = (isInitial = false) => {
  const colors = isInitial ? getColorsFromHassh() : [];
  cols.forEach((col, i) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const title = col.querySelector("h2");
    const color = isInitial && colors[i] ? colors[i] : chroma.random();
    const button = col.querySelector("button");

    if (isLocked) {
      colors.push(title.textContent);
      return;
    }

    if (!isInitial) {
      colors.push(color);
    }

    col.style.background = color;
    title.textContent = color;
    setTextColor(title, color);
    setTextColor(button, color);
  });

  updateColorsHash(colors);
};

const copyToClpkboard = (text) => {
  return navigator.clipboard.writeText(text);
};

const updateColorsHash = (colors) => {
  document.location.hash = colors
    .map((color) => color.toString().substring(1))
    .join("-");
};

const getColorsFromHassh = () => {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }

  return [];
};

setRandomColors(true);
