Working Copy previews
=====================

[Working Copy](https://workingcopy.app/) is a Git client for iOS that allows previewing Markdown, Jupyter Notebooks, org-mode and AsciiDoc
and this repository shows how to change and extend this preview feature by adding javascript and css files.

You should start by cloning this repository inside Working Copy. It needs to be at the outermost level. The
files inside `bundle` and `preview.html` are only present to make it clear how previews work and make it easier
to test in the same environment as Working Copy has. Changing these files inside Working Copy will not make
any difference.

The file types a preview mode supports is determined by the filename before the `.js` or `.css` extension.
The javascript file `ipynb.js` would match files all `.ipynb` files. If the preview filename contains `_` this
is used to describe both the files to match and the title of the preview mode as shown to the user. 
The mode `ipynb_Custom.js` still previews all `.ipynb` files but has the title *Custom* instead 
of *Preview* when picking modes.

You can have several preview modes for a single file but they need to have different titles and the modes you
define inside `wc_previews` are preferred over built-in preview modes.

You can have preview modes that match any file with something like `_Hexadecimal.js` where there is nothing
before `_`. 

Inside Working Copy file extensions are mapped to
[highlight.js](https://github.com/highlightjs/highlight.js/tree/master/src/languages) languages and 
you can use these names instead of file extension such that `markdown.js` will match files ending with `.md` 
as well as `.markdown`.

Later on a proper UI will be added to configure preview modes.
