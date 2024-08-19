document.addEventListener("DOMContentLoaded", function () {
  MathJax.typeset();

  const sliders = [
    {
      slider: document.getElementById("initialPositionX"),
      valueDisplay: document.getElementById("sliderValue1"),
    },
    {
      slider: document.getElementById("initialPositionY"),
      valueDisplay: document.getElementById("sliderValue2"),
    },
    {
      slider: document.getElementById("initialVelocity"),
      valueDisplay: document.getElementById("sliderValue3"),
    },
    {
      slider: document.getElementById("initialAngle"),
      valueDisplay: document.getElementById("sliderValue4"),
    },
    {
      slider: document.getElementById("tmax"),
      valueDisplay: document.getElementById("sliderValue5"),
    },
  ];

  function updateSliderValue(slider, valueDisplay) {
    const units = valueDisplay.getAttribute("data-units");
    const sym = valueDisplay.getAttribute("data-sym");

    valueDisplay.innerHTML = `${sym} ${slider.value} ${units}`;
    MathJax.typeset();
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
