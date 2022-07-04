# Mappae mundi
Educational app for science museums and exhibitions, about cartography, maps, and the geometry of the sphere.

## Features
Browse eight basic map projections (Plate Carrée, Mercator, Gall-Peters, Mollweide, Azimuthal Equidistant, Gnomonic, Stereographic, and Orthographic).

Use four tools to explore the features of each projection (Tissot's indicatrix, geodesic, loxodrome, and change aspect).

## Translations
To make a new translation, you need to translate two things: the user interface (UI), and the explanation texts.
* To translate the UI, edit the file `/txt/ui-translations.json` to include the new language.
  * In the `languages` key, add the [ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and the endonym of the language (the name of the language in that language).
  * In the `dictionary` key, add the translation of each UI item.
* To translate the explanation texts, make a copy of any of the language folders (for instance `/txt/en`), rename it with the ISO code of the new language, and translate all the HTML files inside.

## Credits
Author: Daniel Ramos

Acnowledgements: Museu de Matemàtiques de Catalunya (MMACA), IMAGINARY, Universdade de Lisboa (FCT/CMAF-CIO/UL)

Powered by [d3-geo](https://github.com/d3/d3-geo) by Mike Bostock.

## License
General Public License (GPLv3)
