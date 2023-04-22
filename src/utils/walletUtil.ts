import {ethers} from "ethers";

const path = "m/44'/60'/0'/0/";

export function getAccount(mnemonic: string, index: number) {
    return ethers.Wallet.fromPhrase(mnemonic).derivePath(path + index);
}