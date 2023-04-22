import {decrypt, encrypt, hashPassword} from "../utils/encryptionUtil";
import {readFile, saveFile} from "../utils/fileUtil";
import {Account} from "./Account";
import {getPassword} from "../utils/globalUtil";

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
    const code = getPassword();
    if (this.pwd.indexOf('{ENC}') === -1){
      data.password = '{ENC}' + await hashPassword(this.pwd);
    }
    data.wallet = encrypt(this.wallet, code);
    data.accounts = this.accounts.map(acc => {
      acc.privateKey = encrypt(acc.privateKey, code);
      return acc;
    })
    await saveFile(data, User.name);
  }
}

export async function loadUser(): Promise<User | null> {
  try {
    const code = getPassword();
    const data = await readFile(User.name);
    return new User(
        decrypt(data.wallet, code),
        data.accounts.map((acc: any) => {
          return new Account(acc.name, acc.type, acc.index, decrypt(acc.privateKey, code));
        }),
        data.password
    )
  } catch (e) {
    console.error(e);
    return null;
  }
}