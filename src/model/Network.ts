export class Network {
  id: number;
  name: string;
  nativeSymbol: string;
  rpc: string;
  blockExplorers: string;

  constructor(id: number, name: string, nativeSymbol: string, rpc: string, blockExplorers: string) {
    this.id = id;
    this.name = name;
    this.nativeSymbol = nativeSymbol;
    this.rpc = rpc;
    this.blockExplorers = blockExplorers;
  }
}