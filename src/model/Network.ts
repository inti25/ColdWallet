import {readFile} from "../utils/fileUtil";

export class Network {
  id?: number;
  name?: string;
  icon?: string;
  nativeSymbol?: string;
  rpc?: string;
  blockExplorers?: string;
}

export async function loadNetworkList() {
  const data = await readFile(Network.name);
  return JSON.parse(JSON.stringify(data)) as Network[];
}