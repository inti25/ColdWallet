import { readFile } from "../utils/fileUtil";

export class Token {
  name?: string;
  address?: string;
  decimals?: number;
  symbol?: string;
  image?: string;
  chainId?: number;

  static async loadTokens(): Promise<Token[]> {
    try {
      const data = await readFile(Token.name);
      return JSON.parse(JSON.stringify(data));
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}
