
function renderMarkdown(markdown, element) {
  element.innerHTML = htmlFromMarkdown(markdown);
  
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
  
  MathJax.typesetPromise()
}

function renderPreview(url) {
  fetch(url, { method: 'get' })
    .then(response => response.text())
    .then(text => renderMarkdown(text, document.getElementById("content")))
    .catch(err => {
  	console.error(err);	
  })
}
