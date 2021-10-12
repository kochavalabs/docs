# docs

The latest documentation can be found in the v0.4.2 directory.

## Markdown preprocessor

Markdown files in the preprocessed directory use a [Markdown Preprocessor](https://github.com/jreese/markdown-pp)
syntax to allow importing modules from other documents and transform the documents
that are finalized in the versioned directories.

## Markdown lint

Using [markdownlint](https://github.com/DavidAnson/markdownlint) to enforce
lint rules.

See [Rules](https://github.com/DavidAnson/markdownlint/blob/v0.20.3/doc/Rules.md)
for reference.

## Naming Convention

We use a specific naming convention to allow the ToC on the website to be
formatted correctly. We replace all underscores with spaces in the ToC, and we
remove everything before the first '-' in the name. The main purpose of this
is to allow good formatting and ordering in the ToC without also maintaining
a metadata file. For example 1-Getting_Started.md -> 'Getting Started' in the
ToC.

The exact logic is:

```Javascript
let text = parts[1].replace(/_/g, " ").replace(".md", "");
if (textParts.length > 1) {
  text = textParts.slice(1).join("-");
}
```
