const fireworkBtn = document.getElementById("fireworkBtn");
const firework = document.getElementById("firework");

if (fireworkBtn && firework) {
  fireworkBtn.addEventListener("click", () => {

    // restart animation every click
    firework.classList.remove("active");
    void firework.offsetWidth; // force reflow
    firework.classList.add("active");

  });
}
