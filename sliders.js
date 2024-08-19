document.addEventListener("DOMContentLoaded", function () {
  const sliders = [
    {
      slider: document.getElementById("initialPosition"),
      valueDisplay: document.getElementById("sliderValue1"),
    },
    {
      slider: document.getElementById("initialVelocity"),
      valueDisplay: document.getElementById("sliderValue2"),
    },
    {
      slider: document.getElementById("Phase"),
      valueDisplay: document.getElementById("sliderValue3"),
    },
    {
      slider: document.getElementById("tmax"),
      valueDisplay: document.getElementById("sliderValue4"),
    },
  ];

  function updateSliderValue(slider, valueDisplay) {
    const units = valueDisplay.getAttribute("data-units");
    const sym = valueDisplay.getAttribute("data-sym");

    valueDisplay.innerHTML = `${sym} ${slider.value} ${units}`;
    MathJax.typesetPromise([valueDisplay]).catch(function (err) {
      console.log("MathJax error: " + err.message);
    });

    // valueDisplay.textContent = sym + slider.value + units;
    // const sliderRect = slider.getBoundingClientRect();
    // const containerRect = slider.parentElement.getBoundingClientRect();
    // const thumbWidth = 20; // Asumimos un ancho del "thumb" de 20px, puedes ajustarlo si es diferente
    // const thumbPosition =
    //   ((slider.value - slider.min) / (slider.max - slider.min)) *
    //     sliderRect.width -
    //   thumbWidth / 2;
    // valueDisplay.style.left = `${thumbPosition + (containerRect.width - sliderRect.width) / 2}px`;
  }

  sliders.forEach(({ slider, valueDisplay }) => {
    if (slider && valueDisplay) {
      slider.addEventListener("input", () =>
        updateSliderValue(slider, valueDisplay)
      );
      window.addEventListener("resize", () =>
        updateSliderValue(slider, valueDisplay)
      );
      // Initialize the value display
      updateSliderValue(slider, valueDisplay);
    }
  });
});
