/*
- open ./assets/The-Adventures-of-Sherlock-Holmes.text
- load the contents into a single (huge string)
- convert string it to an valid HTML string (kinda like lexing/parsing, you've got to find the patterns which distininguish the tag you're creating)
  - What are the distinguishing features?
    - lists: 
    - paragraphs: 
    - headings:
  - hints:
    - you might want to use the split method on the string object
    - you might want to use the replace method on the string object
    - you might want to loop over the text, character by character, like you do in your lexer
      - you can then chunk up the text and work on it in smaller batches
- once ypu have the HTML string, open ./index.html and write the string to the file.
*/
const fs = require("fs");
const { start } = require("repl");

function isRomanNumeral(str) {
  if (str === "I") {
    return true;
  }
  if (str === "II") {
    return true;
  }
  if (str === "III") {
    return true;
  }
  if (str === "IV") {
    return true;
  }
  if (str === "V") {
    return true;
  }
  if (str === "VI") {
    return true;
  }
  if (str === "VII") {
    return true;
  }
  if (str === "VII") {
    return true;
  }
  if (str === "IX") {
    return true;
  }
  if (str === "X") {
    return true;
  }
  if (str === "XI") {
    return true;
  }
  if (str === "XII") {
    return true;
  }
  if (str === "XIII") {
    return true;
  }
}

function startsWithRomanNumeral(line) {
  const splitLine = line.split(".");
  if (splitLine.length != 2) {
    return false;
  }
  if (isRomanNumeral(splitLine[0])) {
    return true;
  }
  return false;
}

const convert = (content) => {
  const lines = content.split("\r\n");
  let result = "";
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line === "The Adventures of Sherlock Holmes") {
      result += `<h1 class="main-title">${line}</h1>\n`;
      continue;
    }
    if (line === "by Arthur Conan Doyle") {
      result += `<span class="author">${line}</span>\n`;
      continue;
    }
    if (line === "Contents") {
      result += `<h2 class="contents-heading">${line}</h2>\n`;
      i += 2; // Skip empty space
      let itemsStr = "";
      while (lines[i] !== "") {
        itemsStr += `  <li>${lines[i]}</li>\n`;
        i++;
      }
      result += `<ol class="contents">\n${itemsStr}</ol>\n`;
      continue;
    }
    if (startsWithRomanNumeral(line)) {
      result += `<h2>${line}</h2>\n`;
      continue;
    }
    if (line === "") {
      continue;
    }
    let paragraphStr = "";
    while (lines[i] !== undefined && lines[i] !== "") {
      paragraphStr += `  ${lines[i]}\n`;
      i++;
    }
    result += `<p>\n${paragraphStr}</p>\n`;
  }
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Adventures of Sherlock Holmes</title>
</head>
<body>
${result}
</body>
</html>`;
};

let content;
try {
  content = fs.readFileSync(
    "./assets/The-Adventures-of-Sherlock-Holmes.txt",
    "utf-8"
  );
} catch (err) {
  console.error(err);
}

const htmlContent = convert(content);

try {
  fs.writeFileSync("./index.html", htmlContent);
} catch (err) {
  console.error(err);
}
