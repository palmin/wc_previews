
function renderBuffer(buffer, target) {
  target.style.fontFamily = "monospace"
    
  let bytes = new Uint8Array(buffer);
  for(let byte of bytes) {
     var text = byte.toString(16)
     if(text.length == 1) text = "0" + text
     target.textContent += text + " "
  }
}

function renderPreview(url) {
  fetch(url, { method: 'get' })
    .then(response => response.arrayBuffer())
    .then(buffer => renderBuffer(buffer, document.getElementById("content")))
    .catch(err => {
  	console.error(err);	
  })
}
