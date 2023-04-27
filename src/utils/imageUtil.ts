import { QPixmap } from "@nodegui/nodegui";
import { generateFromString } from "generate-avatar";
import axios from "axios";
import { randomString } from "./encryptionUtil";

export async function getPixmap(url: any) {
  if (url) {
    let cache = (global as any).cache;
    if (cache === undefined) cache = {};
    const pixmap = new QPixmap();
    const value = cache[url];
    if (value) {
      pixmap.loadFromData(value);
    } else {
      const { data } = await axios.get(url, { responseType: "arraybuffer" });
      cache[url] = data;
      pixmap.loadFromData(data);
    }
    return pixmap;
  } else {
    return generateQPixmapImage(randomString(10));
  }
}

export function generateQPixmapImage(data: string): QPixmap {
  const pixmap = new QPixmap();
  const iData = Buffer.from(`${generateFromString(data)}`);
  pixmap.loadFromData(iData);
  return pixmap;
}
