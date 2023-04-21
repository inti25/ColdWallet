import {decrypt, encrypt, hashPassword} from "../utils/encryptionUtil";
import {readFile, saveFile} from "../utils/fileUtil";
import {Account} from "./Account";

export class User {
  wallet: string;
  accounts: Account[];
  pwd: string;

  constructor(wallet: string, accounts: Account[], pwd: string) {
    this.wallet = wallet;
    this.accounts = accounts;
    this.pwd = pwd;
  }

  async save() {
    const data: any = {};
    data.wallet = encrypt(this.wallet);
    if (this.pwd.indexOf('{ENC}') === -1){
      data.password = await hashPassword(this.pwd);
    }
    data.accounts = this.accounts.map(acc => {
      acc.privateKey = encrypt(acc.privateKey);
      return acc;
    })
    await saveFile(data, User.name);
  }

  async load(): Promise<User | null> {
    try {
      const data = await readFile(User.name);
      return new User(
        decrypt(data.wallet),
        data.accounts.map((acc: any) => {
          return new Account(acc.name, acc.type, acc.index, decrypt(acc.privateKey));
        }),
        data.pwd
      )
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}