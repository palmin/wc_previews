
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
      switch (c) {
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '&': return '&amp;';
          case '\'': return '&apos;';
          case '"': return '&quot;';
      }
  });
}

function textFromLines(arrayOrString) {
  if(!Array.isArray(arrayOrString)) return arrayOrString
  return arrayOrString.join("\n")	
}

function markdownQuotedValue(value) {
let lines = Array.isArray(value) ? value : [value]
var markdown = ""
lines.forEach(line => {
	markdown += "> " + line + "\n"
})
return markdown
}

function appendMarkdown(markdown, element) {
  let html = converter.makeHtml(markdown)
  element.innerHTML += html	
}

function appendMarkdownCell(cell, element) {
  let markdown = textFromLines(cell["source"]) + "\n\n"
  appendMarkdown(markdown, element)
}

function appendHeadingCell(cell, element) {
  let text = textFromLines(cell["source"])
  var level = cell["level"]
  if(!level) level = 3

  let tag = "h" + level;
  let html = "<" + tag + ">" + escapeXml(text) + "</" + tag + ">\n"
  element.innerHTML += html
}

function appendCodeResult(result, element) {
  let data = result["data"]
  Object.keys(data).forEach(mimeType => {
	  // TODO: We probably don't want to show all mimeTypes as text/plain might be 
	  //       a fallback for text/html when available for example
	  let content = data[mimeType] 
  	if(mimeType == "text/html") {
  		html = "\n" + textFromLines(content) + "\n\n"
  		element.innerHTML += html
  	} else if(mimeType == "text/plain") {
  		let markdown = markdownQuotedValue(content)
  		appendMarkdown(markdown, element)
  	} else if(mimeType.indexOf("image/") == 0) {
  		let base64 = content
  		if(!base64) return
			
  		let metadata = result["metadata"]
  		let needsBackground = metadata["needs_background"]
  		let style = needsBackground == "light" ? "style=\"background-color: #EEE\"" : "style=\"background-color: #111\""
  		let html = "<img " + style + " src=\"data:" + mimeType + ";base64," + base64 + "\" />\n\n"
  		element.innerHTML += html

  	} else {
  	    console.warn("Unknown code result mimeType: " + mimeType)			
  	}
  })
}

function appendCodeStream(stream, element) {
  let markdown = markdownQuotedValue(stream["text"])
  appendMarkdown(markdown, element)
}

function appentCodeError(error, element) {
  let name = error["ename"]
  let value = error["evalue"]
  let markdown = "> " + name + ": " + value + "\n\n"
  appendMarkdown(markdown, element)

  // TODO: traceback should be shown but it requires parsing ANSI escape sequences
  //       and I only have objective-c code for this right now
}

function appendCodeCell(cell, element) {
  let markdown = "````\n" + textFromLines(cell["source"]) + "\n````\n\n"
  appendMarkdown(markdown, element)

  let outputs = cell["outputs"]
  outputs && outputs.forEach(output => {
  	let output_type = output["output_type"]
  	if(output_type == "display_data" || output_type == "execute_result") {
  		appendCodeResult(output, element)
  	} else if(output_type == "stream") {
  		appendCodeStream(output, element)
  	} else if(output_type == "error") {
  		appentCodeError(output, element)
  	} else {
  		console.warn("Unknown result cell output_type: " + output_type)
  	}
  })
}

function appendCells(json, element) {
  json["cells"].forEach(cell => {

    let type = cell["cell_type"]
    if(type == "markdown") appendMarkdownCell(cell, element)
 else if(type == "heading") appendHeadingCell(cell, element)
 else if(type == "code") appendCodeCell(cell, element)
    else {
   console.warn("Unknown cell_type: " + type)
    }
  })
}

function renderJupyter(json, element) {
  element.innerHTML = "";
  appendCells(json, element);
  
  let worksheets = json["worksheets"];
  worksheets && worksheets.forEach(worksheet => {
 appendCells(worksheet, element)
  })
  
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
}

function renderPreview(url) {
  fetch(url, { method: 'get' })
    .then(response => response.json())
    .then(jsonData => renderJupyter(jsonData, document.getElementById("content")))
    .catch(err => {
  	console.error(err);	
  })
}
