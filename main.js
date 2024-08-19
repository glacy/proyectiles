// Añadir eventos a los sliders
document
  .getElementById("initialPositionX")
  .addEventListener("input", generarGrafico);
document
  .getElementById("initialPositionY")
  .addEventListener("input", generarGrafico);
document
  .getElementById("initialVelocity")
  .addEventListener("input", generarGrafico);
document.getElementById("tmax").addEventListener("input", generarGrafico);

document
  .getElementById("initialAngle")
  .addEventListener("input", generarGrafico);

document.getElementById("tmax").addEventListener("input", generarGrafico);

let chartXvsT;
let chartYvsT;
let chartYvsX;

const initialPositionX = parseFloat(
  document.getElementById("initialPositionX").value
);

const initialPositionY = parseFloat(
  document.getElementById("initialPositionY").value
);

const initialVelocity = parseFloat(
  document.getElementById("initialVelocity").value
);

const initialAngle = parseFloat(document.getElementById("initialAngle").value);

const tmax = parseFloat(document.getElementById("tmax").value);
function generarGrafico() {
  if (chartXvsT) {
    chartXvsT.destroy(); // Destruir el gráfico anterior si existe
  }

  if (chartYvsT) {
    chartYvsT.destroy();
  }

  if (chartYvsX) {
    chartYvsX.destroy();
  }
  const initialPositionX = parseFloat(
    document.getElementById("initialPositionX").value
  );

  const initialPositionY = parseFloat(
    document.getElementById("initialPositionY").value
  );
  const initialVelocity = parseFloat(
    document.getElementById("initialVelocity").value
  );

  const initialAngle = parseFloat(
    document.getElementById("initialAngle").value
  );

  const timeArray = generarArrayTiempo();

  const XpositionArray = generarArrayPosicionX(
    initialPositionX,
    initialVelocity,
    timeArray,
    initialAngle
  );

  const YpositionArray = generarArrayPosicionY(
    initialPositionY,
    initialVelocity,
    timeArray,
    initialAngle
  );

  const velocityArray = generarArrayVelocidad(
    initialPositionX,
    initialVelocity,
    timeArray,
    initialAngle
  );

  const accelerationArray = generarArrayAceleracion(
    initialPositionX,
    initialVelocity,
    timeArray,
    initialAngle
  );

  const dataXvsT = {
    labels: timeArray,
    datasets: [
      {
        label: `\\(x(t) = ${initialPositionX} + ${initialVelocity}\\cos (${initialAngle} ^{\\circ})  t \\)`,
        borderColor: "rgb(255, 204, 188)",
        data: XpositionArray,
        fill: false,
        pointStyle: false,
      },
    ],
  };

  const dataV = {
    labels: timeArray,
    datasets: [
      {
        label: `\\(v(t) = -${initialPositionX}*${initialVelocity} \\sin(${initialVelocity}  t + ${initialAngle} \\pi)\\)`,
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
        label: `\\(a(t) = -${initialPositionX}*(${initialVelocity})^2 \\cos(${initialVelocity}  t + ${initialAngle} \\pi)\\)`,
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

  chartXvsT = new Chart(ctx, {
    type: "line",
    data: dataXvsT,
    options: opciones,
    plugins: [htmlLegendPlugin],
    // maintainAspectRatio : false,
  });

  chartYvsT = new Chart(ctv, {
    type: "line",
    data: dataV,
    options: opcionesV,
    plugins: [htmlLegendPluginV],
    // maintainAspectRatio : false,
  });

  chartYvsX = new Chart(cta, {
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
    for (let t = 0; t <= tmax; t += 0.1) {
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

function generarArrayPosicionX(
  initialPositionX,
  initialVelocity,
  timeArray,
  initialAngle
) {
  const XpositionArray = [];
  timeArray.forEach((t) => {
    const position =
      initialPositionX +
      initialVelocity * Math.cos((initialAngle * Math.PI) / 180) * t;
    XpositionArray.push(position.toFixed(2));
  });
  return XpositionArray;
}

function generarArrayPosicionY(
  initialPositionX,
  initialVelocity,
  timeArray,
  initialAngle
) {
  const YpositionArray = [];
  timeArray.forEach((t) => {
    const position =
      initialPositionY * Math.cos(initialVelocity * t + initialAngle * Math.PI);
    YpositionArray.push(position.toFixed(2));
  });
  return YpositionArray;
}

function generarArrayVelocidad(
  initialPositionX,
  initialVelocity,
  timeArray,
  initialAngle
) {
  const velocityArray = [];
  timeArray.forEach((t) => {
    const velocity =
      -initialPositionX *
      initialVelocity *
      Math.sin(initialVelocity * t + initialAngle * Math.PI);
    velocityArray.push(velocity.toFixed(2));
  });
  return velocityArray;
}

function generarArrayAceleracion(
  initialPositionX,
  initialVelocity,
  timeArray,
  initialAngle
) {
  const accelerationArray = [];
  timeArray.forEach((t) => {
    const acceleration =
      -1 *
      initialPositionX *
      initialVelocity *
      initialVelocity *
      Math.cos(initialVelocity * t + initialAngle * Math.PI);
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
    const ul = getOrCreateLegendList(chartXvsT, options.containerID);

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
  afterUpdate(chartYvsT, args, options) {
    const ul = getOrCreateLegendList(chartYvsT, options.containerID);

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items =
      chartYvsT.options.plugins.legend.labels.generateLabels(chartYvsT);

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
  afterUpdate(chartYvsX, args, options) {
    const ul = getOrCreateLegendList(chartYvsX, options.containerID);

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items =
      chartYvsX.options.plugins.legend.labels.generateLabels(chartYvsX);

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
  position = document.getElementById("initialPositionX").value;
  velocity = document.getElementById("initialVelocity").value;
  time = document.getElementById("tmax").value;
  initialAngle = document.getElementById("initialAngle").value;
  document.getElementById("initialPositionX").textContent = position;
  document.getElementById("initialVelocity").textContent = velocity;
  document.getElementById("tmax").textContent = time;
  document.getElementById("initialAngle").textContent = initialAngle;
  chartCanvas.data.labels = Array.from({ length: time }, (_, i) => i + 1);
  chartCanvasV.data.labels = Array.from({ length: time }, (_, i) => i + 1);
}
