export const scrollToId = (id) => {
  if (window.lenis) {
    window.lenis.scrollTo(id, { offset: -90, duration: 1.4 });
  } else {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }
};
