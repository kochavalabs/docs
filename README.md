# docs

The latest documentation markdown can be found in the `docs` directory.

## Markdown preprocessor

Markdown files in the preprocessed directory use a [Markdown Preprocessor](https://github.com/jreese/markdown-pp)
syntax to allow importing modules from other documents and transform the documents
that are finalized in the docs directories.  So any updates should be made to the
preprocessed docs.

To build the docs run:

```Bash
make all
```

## Markdown lint

Using [markdownlint](https://github.com/DavidAnson/markdownlint) to enforce
lint rules.

See [Rules](https://github.com/DavidAnson/markdownlint/blob/v0.20.3/doc/Rules.md)
for reference.

## Docusaurus

The website directory contains a website built with [Docusaurus](https://github.com/facebook/docusaurus).
