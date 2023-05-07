export class Account {
  name: string;
  type: AccountType;
  index: number;
  privateKey: string;
  displayIndex: number;

  constructor(
    name: string,
    type: AccountType,
    index: number,
    privateKey: string,
    displayIndex: number
  ) {
    this.name = name;
    this.type = type;
    this.index = index;
    this.privateKey = privateKey;
    this.displayIndex = displayIndex;
  }
}

export enum AccountType {
  INDEX,
  IMPORT,
}
