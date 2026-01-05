const fireworkBtn = document.getElementById("fireworkBtn");
const firework = document.getElementById("firework");

if (fireworkBtn && firework) {
  fireworkBtn.addEventListener("click", () => {
    firework.classList.add("active");

    setTimeout(() => {
      firework.classList.remove("active");
    }, 1000);

    // play only once
    fireworkBtn.disabled = true;
    fireworkBtn.style.opacity = "0.5";
  });
}
