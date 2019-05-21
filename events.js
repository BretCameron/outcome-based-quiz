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

document.querySelectorAll('button').forEach(el => el.addEventListener('click', () => {
  setTimeout(() => {
    if (height !== document.querySelector('body').offsetHeight) {
      height = document.querySelector('body').offsetHeight;
      window.parent.postMessage({ frameHeight: height }, '*');
    };
  }, 10);
}));