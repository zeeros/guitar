ORG_FILE  = Fingerboard Anatomy.org
HTML_FILE = index.html
PUBLIC    = public

ASSETS = styles.css diagram.js manifest.json sw.js offline.html
FONTS  = et-book/et-book-roman-line-figures/et-book-roman-line-figures.woff2
ICONS  = icon-192.png icon-512.png

HTML_MINIFIER = npx html-minifier
TERSER        = npx terser
SVGO          = npx svgo

.PHONY: all clean

all: $(PUBLIC)/index.html \
     $(addprefix $(PUBLIC)/, $(ASSETS) $(ICONS)) \
     $(PUBLIC)/$(FONTS)

$(PUBLIC)/index.html: $(HTML_FILE)
	mkdir -p $(PUBLIC)
	$(HTML_MINIFIER) --collapse-whitespace --remove-comments \
	  --remove-optional-tags --remove-redundant-attributes \
	  --remove-script-type-attributes --remove-tag-whitespace \
	  --use-short-doctype -o $@ $<

$(HTML_FILE): "$(ORG_FILE)"
	emacs --batch "$(ORG_FILE)" \
	  --eval "(org-html-export-to-html)" \
	  --kill
	mv "Fingerboard Anatomy.html" $(HTML_FILE)

$(PUBLIC)/styles.css: styles.css
	mkdir -p $(PUBLIC)
	cp $< $@

$(PUBLIC)/diagram.js: diagram.js
	mkdir -p $(PUBLIC)
	$(TERSER) --compress --mangle -o $@ -- $<

$(PUBLIC)/offline.html: offline.html
	mkdir -p $(PUBLIC)
	$(HTML_MINIFIER) --collapse-whitespace --remove-comments -o $@ $<

$(PUBLIC)/sw.js: sw.js
	mkdir -p $(PUBLIC)
	$(TERSER) --compress --mangle -o $@ -- $<

$(PUBLIC)/manifest.json: manifest.json
	mkdir -p $(PUBLIC)
	cp $< $@

$(PUBLIC)/%.png: %.png
	mkdir -p $(PUBLIC)
	cp $< $@

$(PUBLIC)/et-book/%: et-book/%
	mkdir -p $(dir $@)
	cp $< $@

clean:
	rm -rf $(PUBLIC)
	rm -f $(HTML_FILE)
