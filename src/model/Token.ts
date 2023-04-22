export class Token {
  name: string;
  decimals: number;
  symbol: string;

  constructor(name: string, decimals: number, symbol: string) {
    this.name = name;
    this.decimals = decimals;
    this.symbol = symbol;
  }
}
