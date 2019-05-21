let height = document.querySelector('body').offsetHeight;

window.onload = () => {
  height = document.querySelector('body').offsetHeight;
  window.parent.postMessage({ frameHeight: height }, '*');
}

window.onresize = () => {
  if (height !== document.querySelector('body').offsetHeight) {
    height = document.querySelector('body').offsetHeight;
    window.parent.postMessage({ frameHeight: height }, '*');
  }
}