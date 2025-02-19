import { log } from "console";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const pathToDB = join(import.meta.dirname, "words.json");

async function loadDBJson(filePath) {
  try {
    const dbData = await readFile(filePath, "utf-8");
    return JSON.parse(dbData);
  } catch (err) {
    console.error(err);
  }
}

async function updateJson(path, data) {
  try {
    await writeFile(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
}
//save DB in memory
const DB = (await loadDBJson(pathToDB)) || {};

//helpers
const searchValue = (id) => (DB[id] ? DB[id] : null);

const updateDB = async () => await updateJson(pathToDB, DB);
// get all words
const sendAllData = () => DB;

// get one word
const sendSingleValue = (id) => {
  if (!searchValue(id)) return new Error("DB: no such value in DataBase");
  return DB[id];
};

// add word to DB
const addValue = async (data) => {
  if (searchValue(data.en))
    console.error(
      "DB: this value already in DataBase, try editValue if you want to change it"
    );
  try {
    DB[data.en] = { en: data.en, ru: data.ru };
    updateDB();
    return true;
  } catch (err) {
    console.error(err);
  }
};

// add many words to DB
const addManyValues = async (data) => {
  try {
    Object.keys(data).forEach(async (value) => {
      await addValue(data[value]);
    });
    return true;
  } catch (err) {
    console.error(err);
  }
};

// edit/replace word
const editValue = async (data) => {
  if (!searchValue(data.en)) return new Error("DB: no such value in DataBase");
  DB[data.en] = { en: data.en, ru: data.ru };
  await updateDB();
};

// remove word
const removeValue = async (id) => {
  if (!searchValue(id)) return new Error("DB: no such value in DataBase");
  delete DB[id];
  console.log(DB);
  await updateDB();
};
