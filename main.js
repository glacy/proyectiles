// Añadir eventos a los sliders
document
  .getElementById("initialPosition")
  .addEventListener("input", generarGrafico);
document
  .getElementById("initialVelocity")
  .addEventListener("input", generarGrafico);
document.getElementById("tmax").addEventListener("input", generarGrafico);

document.getElementById("Phase").addEventListener("input", generarGrafico);

let chartX;
let chartV;
let chartA;

const initialPosition = parseFloat(
  document.getElementById("initialPosition").value
);
const initialVelocity = parseFloat(
  document.getElementById("initialVelocity").value
);

const Phase = parseFloat(document.getElementById("Phase").value);

function generarGrafico() {
  if (chartX) {
    chartX.destroy(); // Destruir el gráfico anterior si existe
  }

  if (chartV) {
    chartV.destroy();
  }

  if (chartA) {
    chartA.destroy();
  }
  const initialPosition = parseFloat(
    document.getElementById("initialPosition").value
  );
  const initialVelocity = parseFloat(
    document.getElementById("initialVelocity").value
  );

  const Phase = parseFloat(document.getElementById("Phase").value);

  const timeArray = generarArrayTiempo();

  const positionArray = generarArrayPosicion(
    initialPosition,
    initialVelocity,
    timeArray,
    Phase
  );

  const velocityArray = generarArrayVelocidad(
    initialPosition,
    initialVelocity,
    timeArray,
    Phase
  );

  const accelerationArray = generarArrayAceleracion(
    initialPosition,
    initialVelocity,
    timeArray,
    Phase
  );

  const data = {
    labels: timeArray,
    datasets: [
      {
        label: `\\(x(t) = ${initialPosition} \\cos(${initialVelocity}  t + ${Phase} \\pi)\\)`,
        borderColor: "rgb(255, 204, 188)",
        data: positionArray,
        fill: false,
        pointStyle: false,
      },
    ],
  };

  const dataV = {
    labels: timeArray,
    datasets: [
      {
        label: `\\(v(t) = -${initialPosition}*${initialVelocity} \\sin(${initialVelocity}  t + ${Phase} \\pi)\\)`,
        borderColor: "rgb(255, 204, 188)",
        data: velocityArray,
        fill: false,
        pointStyle: false,
      },
    ],
  };

  const dataA = {
    labels: timeArray,
    datasets: [
      {
        label: `\\(a(t) = -${initialPosition}*(${initialVelocity})^2 \\cos(${initialVelocity}  t + ${Phase} \\pi)\\)`,
        borderColor: "rgb(255, 204, 188)",
        data: accelerationArray,
        fill: false,
        pointStyle: false,
      },
    ],
  };

  const opciones = {
    responsive: true,
    animation: false,
    // aspectRatio: 1;
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Tiempo (s)",
          color: "#3a2c60",
          font: {
            family: "monospace",
            size: 12,
            weight: "normal",
            lineHeight: 1.2,
          },
          padding: { top: 20, left: 0, right: 0, bottom: 0 },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Posición (cm)",
          color: "#3a2c60",
          font: {
            family: "monospace",
            size: 12,
            style: "normal",
            lineHeight: 1.2,
          },
          padding: { top: 30, left: 0, right: 0, bottom: 0 },
        },
      },
    },
    plugins: {
      // annotation: {
      // annotations: {
      // annotation3,box1
      // }
      // },
      htmlLegend: {
        // ID of the container to put the legend in
        containerID: "legend-container",
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label = "x= ";
            }
            if (context.parsed.y !== null) {
              label +=
                new Intl.NumberFormat("en-US").format(context.parsed.y) + " cm";
            }
            return label;
          },
        },
      },
    },
  };

  const opcionesV = {
    responsive: true,
    animation: false,
    // aspectRatio: 1;
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Tiempo (s)",
          color: "#3a2c60",
          font: {
            family: "monospace",
            size: 12,
            weight: "normal",
            lineHeight: 1.2,
          },
          padding: { top: 20, left: 0, right: 0, bottom: 0 },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Velocidad (cm/s)",
          color: "#3a2c60",
          font: {
            family: "monospace",
            size: 12,
            style: "normal",
            lineHeight: 1.2,
          },
          padding: { top: 30, left: 0, right: 0, bottom: 0 },
        },
      },
    },
    plugins: {
      // annotation: {
      // annotations: {
      // annotation3,box1
      // }
      // },
      htmlLegendV: {
        // ID of the container to put the legend in
        containerID: "legend-container-v",
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label = "v= ";
            }
            if (context.parsed.y !== null) {
              label +=
                new Intl.NumberFormat("en-US").format(context.parsed.y) +
                " cm/s";
            }
            return label;
          },
        },
      },
    },
  };

  const opcionesA = {
    responsive: true,
    animation: false,
    // aspectRatio: 1;
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Tiempo (s)",
          color: "#3a2c60",
          font: {
            family: "monospace",
            size: 12,
            weight: "normal",
            lineHeight: 1.2,
          },
          padding: { top: 20, left: 0, right: 0, bottom: 0 },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Aceleración (cm/s^2)",
          color: "#3a2c60",
          font: {
            family: "monospace",
            size: 12,
            style: "normal",
            lineHeight: 1.2,
          },
          padding: { top: 30, left: 0, right: 0, bottom: 0 },
        },
      },
    },
    plugins: {
      // annotation: {
      // annotations: {
      // annotation3,box1
      // }
      // },
      htmlLegendA: {
        // ID of the container to put the legend in
        containerID: "legend-container-a",
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label = "a= ";
            }
            if (context.parsed.y !== null) {
              label +=
                new Intl.NumberFormat("en-US").format(context.parsed.y) +
                " cm/s^2";
            }
            return label;
          },
        },
      },
    },
  };

  const ctx = document.getElementById("chartCanvas").getContext("2d");
  const ctv = document.getElementById("chartCanvasV").getContext("2d");
  const cta = document.getElementById("chartCanvas-a").getContext("2d");

  chartX = new Chart(ctx, {
    type: "line",
    data: data,
    options: opciones,
    plugins: [htmlLegendPlugin],
    // maintainAspectRatio : false,
  });

  chartV = new Chart(ctv, {
    type: "line",
    data: dataV,
    options: opcionesV,
    plugins: [htmlLegendPluginV],
    // maintainAspectRatio : false,
  });

  chartA = new Chart(cta, {
    type: "line",
    data: dataA,
    options: opcionesA,
    plugins: [htmlLegendPluginA],
    // maintainAspectRatio : false,
  });
  //chartCanvas.update();
}

function generarArrayTiempo() {
  const tmax = parseFloat(document.getElementById("tmax").value);
  // const omega = parseFloat(document.getElementById("initialVelocity").value);
  // const tmax = (3 * 2 * Math.PI) / omega;
  if (tmax > 0) {
    const timeArray = [];
    for (let t = 0; t <= tmax; t += 0.05) {
      timeArray.push(t.toFixed(2));
    }
    return timeArray;
  } else {
    // Muestra un mensaje de error o realiza otra acción
    alert("El tiempo máximo debe ser mayor que cero.");
    console.error("El tiempo máximo debe ser mayor que cero.");
    return null; // Otra opción: devuelve un valor que indica un error
  }
}

function generarArrayPosicion(
  initialPosition,
  initialVelocity,
  timeArray,
  Phase
) {
  const positionArray = [];
  timeArray.forEach((t) => {
    const position =
      initialPosition * Math.cos(initialVelocity * t + Phase * Math.PI);
    positionArray.push(position.toFixed(2));
  });
  return positionArray;
}

function generarArrayVelocidad(
  initialPosition,
  initialVelocity,
  timeArray,
  Phase
) {
  const velocityArray = [];
  timeArray.forEach((t) => {
    const velocity =
      -initialPosition *
      initialVelocity *
      Math.sin(initialVelocity * t + Phase * Math.PI);
    velocityArray.push(velocity.toFixed(2));
  });
  return velocityArray;
}

function generarArrayAceleracion(
  initialPosition,
  initialVelocity,
  timeArray,
  Phase
) {
  const accelerationArray = [];
  timeArray.forEach((t) => {
    const acceleration =
      -1 *
      initialPosition *
      initialVelocity *
      initialVelocity *
      Math.cos(initialVelocity * t + Phase * Math.PI);
    accelerationArray.push(acceleration.toFixed(2));
  });
  return accelerationArray;
}

const getOrCreateLegendList = (chart, id) => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer.querySelector("ul");

  if (!listContainer) {
    listContainer = document.createElement("ul");
    listContainer.style.display = "flex";
    listContainer.style.flexDirection = "row";
    listContainer.style.margin = 0;
    listContainer.style.padding = 0;

    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};

const htmlLegendPlugin = {
  id: "htmlLegend",
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chartX, options.containerID);

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    items.forEach((item) => {
      const li = document.createElement("li");
      li.style.alignItems = "center";
      li.style.cursor = "pointer";
      li.style.display = "flex";
      li.style.flexDirection = "row";
      li.style.marginLeft = "10px";
      li.style.pointer = "grab";

      // li.onclick = () => {
      // const {type} = chart.config;
      // if (type === 'pie' || type === 'doughnut') {
      // // Pie and doughnut charts only have a single dataset and visibility is per item
      // chart.toggleDataVisibility(item.index);
      // } else {
      // chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
      // }
      // chart.update();
      // };

      // Color box
      const boxSpan = document.createElement("span");
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + "px";
      boxSpan.style.display = "inline-block";
      boxSpan.style.flexShrink = 0;
      boxSpan.style.height = "20px";
      boxSpan.style.marginRight = "10px";
      boxSpan.style.width = "20px";

      // Text
      const textContainer = document.createElement("p");
      textContainer.style.color = item.fontColor;
      textContainer.style.margin = 0;
      textContainer.style.padding = 0;
      textContainer.style.textDecoration = item.hidden ? "line-through" : "";

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);

      MathJax.typeset();
    });
  },
};

const htmlLegendPluginV = {
  id: "htmlLegendV",
  afterUpdate(chartV, args, options) {
    const ul = getOrCreateLegendList(chartV, options.containerID);

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chartV.options.plugins.legend.labels.generateLabels(chartV);

    items.forEach((item) => {
      const li = document.createElement("li");
      li.style.alignItems = "center";
      li.style.cursor = "pointer";
      li.style.display = "flex";
      li.style.flexDirection = "row";
      li.style.marginLeft = "10px";
      li.style.pointer = "grab";

      // li.onclick = () => {
      // const {type} = chart.config;
      // if (type === 'pie' || type === 'doughnut') {
      // // Pie and doughnut charts only have a single dataset and visibility is per item
      // chart.toggleDataVisibility(item.index);
      // } else {
      // chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
      // }
      // chart.update();
      // };

      // Color box
      const boxSpan = document.createElement("span");
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + "px";
      boxSpan.style.display = "inline-block";
      boxSpan.style.flexShrink = 0;
      boxSpan.style.height = "20px";
      boxSpan.style.marginRight = "10px";
      boxSpan.style.width = "20px";

      // Text
      const textContainer = document.createElement("p");
      textContainer.style.color = item.fontColor;
      textContainer.style.margin = 0;
      textContainer.style.padding = 0;
      textContainer.style.textDecoration = item.hidden ? "line-through" : "";

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);

      MathJax.typeset();
    });
  },
};

const htmlLegendPluginA = {
  id: "htmlLegendA",
  afterUpdate(chartA, args, options) {
    const ul = getOrCreateLegendList(chartA, options.containerID);

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chartA.options.plugins.legend.labels.generateLabels(chartA);

    items.forEach((item) => {
      const li = document.createElement("li");
      li.style.alignItems = "center";
      li.style.cursor = "pointer";
      li.style.display = "flex";
      li.style.flexDirection = "row";
      li.style.marginLeft = "10px";
      li.style.pointer = "grab";

      // li.onclick = () => {
      // const {type} = chart.config;
      // if (type === 'pie' || type === 'doughnut') {
      // // Pie and doughnut charts only have a single dataset and visibility is per item
      // chart.toggleDataVisibility(item.index);
      // } else {
      // chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
      // }
      // chart.update();
      // };

      // Color box
      const boxSpan = document.createElement("span");
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + "px";
      boxSpan.style.display = "inline-block";
      boxSpan.style.flexShrink = 0;
      boxSpan.style.height = "20px";
      boxSpan.style.marginRight = "10px";
      boxSpan.style.width = "20px";

      // Text
      const textContainer = document.createElement("p");
      textContainer.style.color = item.fontColor;
      textContainer.style.margin = 0;
      textContainer.style.padding = 0;
      textContainer.style.textDecoration = item.hidden ? "line-through" : "";

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);

      MathJax.typeset();
    });
  },
};

function updateChart() {
  position = document.getElementById("initialPosition").value;
  velocity = document.getElementById("initialVelocity").value;
  time = document.getElementById("tmax").value;
  phase = document.getElementById("Phase").value;
  document.getElementById("initialPosition").textContent = position;
  document.getElementById("initialVelocity").textContent = velocity;
  document.getElementById("tmax").textContent = time;
  document.getElementById("Phase").textContent = phase;
  chartCanvas.data.labels = Array.from({ length: time }, (_, i) => i + 1);
  chartCanvasV.data.labels = Array.from({ length: time }, (_, i) => i + 1);
}
