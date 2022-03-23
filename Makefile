.PHONY: all lint

VERSION = "v0.8.0"

PROCESS_INPUTS = $(shell find ./preprocessed/ -type f -name '*.md')

# Create a list of all the output files you want to generate
PROCESS_OUTPUTS := $(patsubst ./preprocessed/%.md, ./$(VERSION)/%.md, $(PROCESS_INPUTS))

#
# # The default is to build all the OUTPUTS files
all: $(PROCESS_OUTPUTS)
#
# # Tell make how to build a single output file
./$(VERSION)/%.md : ./preprocessed/%.md
	@mkdir -p "$(@D)"
	markdown-pp $< -o $@

lint: 
	markdownlint .

