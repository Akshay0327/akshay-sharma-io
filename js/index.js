const footer = document.createElement('footer');
const body = document.querySelector('body');
body.appendChild(footer);

const today = new Date();
const year = today.getFullYear();
const copyright = document.createElement('p');
copyright.innerHTML = `<span>Akshay</span><span>&#169</span><span>${year}</span>`;
footer.appendChild(copyright);


