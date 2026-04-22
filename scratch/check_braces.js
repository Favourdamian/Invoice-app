
import fs from 'fs';

const content = fs.readFileSync;
let openBraces = 0;
let closeBraces = 0;
let openParens = 0;
let closeParens = 0;

for (let char of content) {
  if (char === '{') openBraces++;
  if (char === '}') closeBraces++;
  if (char === '(') openParens++;
  if (char === ')') closeParens++;
}

console.log(`Braces: { ${openBraces}, } ${closeBraces}`);
console.log(`Parens: ( ${openParens}, ) ${closeParens}`);
