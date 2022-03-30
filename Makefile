.PHONY: all lint

OUTPUT = "docs"

PROCESS_INPUTS = $(shell find ./preprocessed/ -type f -name '*.md')

# Create a list of all the output files you want to generate
PROCESS_OUTPUTS := $(patsubst ./preprocessed/%.md, ./$(OUTPUT)/%.md, $(PROCESS_INPUTS))

#
# # The default is to build all the OUTPUTS files
all: $(PROCESS_OUTPUTS)
#
# # Tell make how to build a single output file
./$(OUTPUT)/%.md : ./preprocessed/%.md
	@mkdir -p "$(@D)"
	markdown-pp $< -o $@

lint: 
	markdownlint .

