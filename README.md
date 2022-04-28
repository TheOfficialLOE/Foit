# Foit

Foit is a CSS helper CLI. Using Foit you can add custom styles to your elements or classes.
<br/>
<br/>
Foit is still under development. So far, only the only feature is adding custom `box-shadow`.
<br/>
<br/>
Here is the `shadow` command:
<br/>
`foit shadow file element color -s size`
<br/>
* `file` is name of the CSS file in your current dir.
* `element` is name of the tag or class.
* default value for `color` is black. Red, green, and also HEX colors are also supported.
* `-s` determines size of the shadow, valid options are `small` and `large`.
<br/>
e.g `foit shadow index h1 ABC -s large`.
<br/>
<br/>
###Important 
Foit uses a custom implementation of [jotform-css.js](https://github.com/jotform/css.js) (thanks for your great library) under the hood to manage css tree. So far, it's almost a copy of the library, but I'll improve it as much as I can. I also may want to overwrite it with TypeScript in the future.