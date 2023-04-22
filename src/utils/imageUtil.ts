import { QPixmap } from "@nodegui/nodegui";
import { generateFromString } from "generate-avatar";
import axios from "axios";

export async function getPixmap(url: any) {
  const { data } = await axios.get(url, { responseType: "arraybuffer" });
  const pixmap = new QPixmap();
  pixmap.loadFromData(data);
  return pixmap;
}

export function generateQPixmapImage(data: string): QPixmap {
  const pixmap = new QPixmap();
  const iData = Buffer.from(`${generateFromString(data)}`);
  pixmap.loadFromData(iData);
  return pixmap;
}
