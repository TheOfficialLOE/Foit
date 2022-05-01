# Foit

Foit is a CSS helper CLI. Using Foit you can add custom styles to your elements or classes.
<br/>
<br/>
Foit is still under development. So far, only the only feature is adding custom `box-shadow`.

## Commands
### shadow
`foit shadow file element color -s size`
<br/>
<br/>
`file` is name of the CSS file in your current dir.
<br/>
<br/>
`element` is name of the tag or class.
<br/>
default value for `color` is black. Red, green, and also HEX colors are also supported.
<br/>
<br/>
`-s` determines size of the shadow, valid options are `small` and `large`.
<br/>
<br/>
For instance: `foit shadow index h1 ABC -s large`.
<br/>
<br/>
### Important 
Foit uses a custom implementation of [jotform-css.js](https://github.com/jotform/css.js) (thanks for your great library) under the hood to manage css tree. The original library had bugs for css comment lines ,and I tried to fix them. I also may want to overwrite it with TypeScript in the future.