let height = document.querySelector('body').offsetHeight;

window.onresize = () => {
  if (height !== document.querySelector('body').offsetHeight) {
    height = document.querySelector('body').offsetHeight;
    window.parent.postMessage({ frameHeight: height }, '*');
    console.log(height);
  }
}