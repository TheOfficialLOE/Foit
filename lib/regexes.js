export const cssRegex = new RegExp('([\\s\\S]*?){([\\s\\S]*?)}', 'gi');
export const cssMediaQueryRegex = '((@media [\\s\\S]*?){([\\s\\S]*?}\\s*?)})';
export const cssKeyframeRegex = '((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})';
export const combinedCSSRegex = '((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})';
export const cssCommentsRegex = '(\\/\\*[\\s\\S]*?\\*\\/)';
export const cssImportStatementRegex = new RegExp('@import .*?;', 'gi');