# SPDX-License-Identifier: GPL-2.0
# Copyright (c) 2020 Benedikt Spranger

CSS_TARGET = assets/css/main.css \
	assets/css/noscript.css

JS_TARGET = assets/js/browser.min.js \
	assets/js/breakpoints.min.js \
	assets/js/util.min.js \
	assets/js/main.min.js \
	assets/js/boomerang.min.js \
	assets/js/vue.min.js

SASS_DIR = sass

MINIFY_JS_CMD = minify --type js > $(JS_TARGET)
#BUNDLE_JS_CMD = browserify-lite $(MAIN_JS)
SASS_FILES = $(wildcard $(SASS_DIR)/*css $(SASS_DIR)/**/*css)

build: build-css build-js

clean:
	rm -f $(CSS_TARGET) $(JS_TARGET)

build-css: $(CSS_TARGET)

build-js: $(JS_TARGET)

assets/js/%.min.js: js/%.js
#	cp $< $@
	uglifyjs.terser --rename -o $@ $<

assets/css/%.css: sass/%.scss
	sassc -t compact $< | minify --type css -o $@

.PHONY: build-css build-js build clean
