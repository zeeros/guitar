ORG_FILE  = Fingerboard-Anatomy.org
HTML_FILE = index.html
PUBLIC    = public

SVG_SRC       = img/fretboard-diagram.svg
SVG_MINIFIED  = img/fretboard-diagram.min.svg

ASSETS = styles.css diagram.js manifest.json sw.js offline.html
FONTS  = et-book/et-book-roman-line-figures/et-book-roman-line-figures.woff2
ICONS  = icon-192.webp icon-512.webp icon-192.png icon-512.png

HTML_MINIFIER = npx html-minifier
TERSER        = npx terser
SVGO          = npx svgo

.PHONY: all
all: $(PUBLIC)/index.html \
     $(addprefix $(PUBLIC)/, $(ASSETS) $(ICONS)) \
     $(PUBLIC)/$(FONTS)

$(SVG_MINIFIED): $(SVG_SRC)
	$(SVGO) --config svgo.config.mjs --pretty --indent 2 -i $< -o $@

$(PUBLIC)/index.html: $(HTML_FILE)
	mkdir -p $(PUBLIC)
	$(HTML_MINIFIER) --collapse-whitespace --remove-comments \
	  --remove-redundant-attributes \
	  --remove-script-type-attributes --remove-tag-whitespace \
	  --use-short-doctype -o $@ $<

$(HTML_FILE): $(ORG_FILE) $(SVG_MINIFIED)
	emacs --batch $(ORG_FILE) \
	  --eval "(org-html-export-to-html)" \
	  --kill
	mv Fingerboard-Anatomy.html $(HTML_FILE)
	python3 -c "\
import re, pathlib;\
html = pathlib.Path('$(HTML_FILE)').read_text();\
svg  = pathlib.Path('$(SVG_MINIFIED)').read_text();\
html = re.sub(r'<object\b[^>]*fretboard-diagram[^>]*/?>(?:</object>)?', svg, html);\
pathlib.Path('$(HTML_FILE)').write_text(html)\
"

$(PUBLIC)/styles.css: styles.css
	mkdir -p $(PUBLIC)
	cp $< $@

$(PUBLIC)/diagram.js: diagram.js
	mkdir -p $(PUBLIC)
	$(TERSER) --compress passes=2 --mangle reserved=['showInterval','getSvgDoc'] -o $@ -- $<

$(PUBLIC)/offline.html: offline.html
	mkdir -p $(PUBLIC)
	$(HTML_MINIFIER) --collapse-whitespace --remove-comments -o $@ $<

$(PUBLIC)/sw.js: sw.js
	mkdir -p $(PUBLIC)
	$(TERSER) --compress --mangle -o $@ -- $<

$(PUBLIC)/manifest.json: manifest.json
	mkdir -p $(PUBLIC)
	cp $< $@

$(PUBLIC)/%.png: %.webp
	mkdir -p $(PUBLIC)
	convert $< $@

$(PUBLIC)/%.webp: %.webp
	mkdir -p $(PUBLIC)
	cp $< $@

$(PUBLIC)/et-book/%: et-book/%
	mkdir -p $(dir $@)
	cp $< $@

.PHONY: clean
clean:
	rm -rf $(PUBLIC)
	rm -f $(HTML_FILE) $(SVG_MINIFIED)
