import fs from "fs";

export async function saveFile(data: any, filename: string) {
  filename = "data/" + filename + ".json";
  if (!filename) {
    console.log(`!file name`);
    return;
  }
  console.log(`Writing deployment info to ${filename}`);
  const content = JSON.stringify(data, null, 2);
  fs.writeFileSync(filename, content, { encoding: "utf-8" });
  return true;
}

export async function readFile(filename: string) {
  const content = fs.readFileSync("data/" + filename + ".json", { encoding: "utf8" });
  return JSON.parse(content);
}

async function fileExists(path: string) {
  try {
    fs.accessSync(path);
    return true;
  } catch (e) {
    return false;
  }
}
