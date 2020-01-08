Working Copy previews
=====================

Working Copy is a Git client for iOS that allows previewing Markdown, Jupyter Notebooks, org-mode and AsciiDoc
and this repository shows how to change and extend this preview feature by adding javascript and css files.

You should start by cloning this repository inside Working Copy. It needs to be at the outermost level. The
files inside bundle and preview.html are only present to make it clear how previews work and make it easier
to test in the same environment as Working Copy has. Changing these files inside Working Copy will not make
any difference.

Currently there is only a single *Custom Preview* mode which is available for all files and this is the
`jupyter` mode which looks for `jupyter.js` and `jupyter.css` files.

Later on there will be a way to map between the files you want to preview and the preview modes found inside
`wc_previews` repository and even later UI will be added to configure preview modes in a nicer way.