# Foit

Foit is a CSS helper CLI. Using Foit you can add custom styles to your elements or classes.
## Commands
### shadow
`foit shadow 'file' 'element' -c 'color' -s 'size'`
<br/>
<br/>
`file` is name of the CSS file in your current dir.
<br/>
<br/>
`element` is name of the tag or class.
<br/>
<br/>
default value for `color` is black. Red, green, and HEX colors are also supported.
<br/>
<br/>
`-s` determines size of the shadow, valid options are `small` and `large`.
<br/>
<br/>
For instance: `foit shadow index h1 -c ABC -s large`.
### border
`foit border 'file' 'element' -p 'position' -w 'width' -s 'style' -c 'color'`
<br/>
<br/>
Default value for `position` is `full`. Valid options are: `full`, `top`, `right`, `bottom`, `left`.
<br/>
<br/>
`width` is width of the border, only `px` unit.
<br/>
<br/>
`style` of the border.
<br/>
<br/>