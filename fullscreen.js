function toggleFullScreen(id) {
  const element = document.getElementById(id);
  const button = document.getElementById("fullscreenToggle");

  if (!document.fullscreenElement) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      /* IE/Edge */
      element.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

document.addEventListener("fullscreenchange", () => {
  const button = document.getElementById("fullscreenToggle");
  if (document.fullscreenElement) {
    button.innerHTML =
      '<span class="material-icons" aria-hidden="true">close_fullscreen</span> Cerrar pantalla completa';
  } else {
    button.innerHTML =
      '<span class="material-icons" aria-hidden="true">fullscreen</span> Pantalla completa';
  }
});
