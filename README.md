# Foit

Foit is a CSS helper CLI. Using Foit you can add custom `box-shadow` to your elements or classes.
<br/>
<br/>
Foit is still under development and the only feature is adding the entire block in case it is not already defined.
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
For instance: `foit shadow index h1 ABC -s large`.