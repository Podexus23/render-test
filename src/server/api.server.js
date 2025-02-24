import { addValue, sendAllData, sendSingleValue } from "../db/controller.db.js";
import { parse } from "url";

const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

function generateRandomWords(wordsArr, quantity = 5) {
  if (quantity > wordsArr.length) {
    console.error(
      `generateRandomWords: to much to words add, try less than ${wordsArr.length}`
    );
    return null;
  }
  const chosenWords = [];
  for (let i = 0; i < quantity; i++) {
    const newWord = wordsArr[getRandom(0, wordsArr.length - 1)];
    const chosenMap = chosenWords.map((e) => e.en);
    if (!chosenMap.includes(newWord.en)) chosenWords.push(newWord);
    else i--;
  }
  return chosenWords;
}

//GET
export function getRouting(res, address) {
  if (address.startsWith("/api/all")) {
    // all words
    const data = sendAllData();
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify({ data: data }));
  }
  // one word
  else if (address.startsWith("/api/word")) {
    const parsedUrl = parse(address, true);
    if (parsedUrl.query.en_word) {
      const data = sendSingleValue(parsedUrl.query.en_word);

      if (!(data instanceof Error)) {
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ data: data }));
      } else {
        res.writeHead(404, { "Content-type": "application/json" });
        res.end(JSON.stringify({ data: "No data for this word" }));
      }
    }
  }
  // five words to test
  else if (address.startsWith("/api/quiz")) {
    const data = sendAllData();
    const dataArr = Object.values(data);
    const result = generateRandomWords(dataArr);
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify({ data: result }));
  } else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(JSON.stringify({ data: "Page not found" }));
  }
}

// POST
export function postRouting(res, req) {
  // add one word
  if (req.url.startsWith("/api/word")) {
    let body = "";

    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      const { en_word: en, ru_word: ru } = JSON.parse(body);
      const dataToDB = { en, ru };
      addValue(dataToDB);
      console.log(body);
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify({ data: "data came" }));
    });
  }
}

// PUT
// update word data

// DELETE
// delete word from DB
