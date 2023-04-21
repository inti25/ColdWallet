export class Account {
  name: string;
  type: AccountType;
  index: number;
  privateKey: string;

  constructor(name: string, type: AccountType, index: number, privateKey: string) {
    this.name = name;
    this.type = type;
    this.index = index;
    this.privateKey = privateKey;
  }
}

export enum AccountType {
  INDEX,
  IMPORT
}