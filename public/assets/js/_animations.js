const block = document.querySelector(".lang-modal");
const list = block.querySelector(".lang-modal__all");
let isOpen = false;

const dropDownFadeIn = () => {
  const listHeight = list.getBoundingClientRect().height;

  anime({
    targets: block,
    height: listHeight + 20,
    easing: "easeInOutQuad",
    // easing: "spring(1, 80, 513 0)",
    // easing: "cubicBezier(.5, .05, .1, .3)",
    duration: 300,
  });

  anime({
    targets: list,
    opacity: 1,
    easing: "easeInOutQuad",
    // easing: "spring(1, 80, 13, 0)",
    // easing: "cubicBezier(.5, .05, .1, .3)",
    duration: 300,
    delay: 100,
  });

  anime({
    targets: list.querySelectorAll(".lang-modal__item"),
    translateX: [50, 0],
    opacity: [0, 1],
    easing: "easeInOutQuad",
    // easing: "spring(1, 80, 13, 0)",
    // easing: "cubicBezier(.5, .05, .1, .3)",
    duration: 300,
    delay: anime.stagger(50, { start: 150 }),
  });
};

const dropDownFadeOut = () => {
  anime({
    targets: list.querySelectorAll(".lang-modal__item"),
    opacity: [1, 0],
    easing: "easeInOutQuad",
    // easing: "spring(1, 80, 513 0)",
    // easing: "cubicBezier(.5, .05, .1, .3)",
    duration: 300,
    delay: anime.stagger(50),
  });

  anime({
    targets: list,
    opacity: 0,
    easing: "easeInOutQuad",
    // easing: "spring(1, 80, 13, 0)",
    // easing: "cubicBezier(.5, .05, .1, .3)",
    duration: 300,
  });

  anime({
    targets: block,
    height: 20,
    easing: "easeInOutQuad",
    // easing: "spring(1, 80, 13, 0)",
    // easing: "cubicBezier(.5, .05, .1, .3)",
    duration: 300,
  });
};

const toggleDropDown = () => {
  if (isOpen) {
    dropDownFadeOut();
  } else {
    dropDownFadeIn();
  }
  isOpen = !isOpen;
};

// добавляем обработчик касания на мобильные устройства
block.addEventListener("touchstart", toggleDropDown);
// добавляем обработчик на наведение мыши для десктопов
block.addEventListener("mouseenter", dropDownFadeIn);
block.addEventListener("mouseleave", dropDownFadeOut);
