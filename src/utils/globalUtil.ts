import { User } from "../model/User";
import { EventEmitter } from "events";
import { Account } from "../model/Account";
import { ethers } from "ethers";
import { Signer } from "ethers/src.ts/providers/signer";

export function getGlobalEvent(): EventEmitter {
  if ((global as any).event) {
    return (global as any).event as EventEmitter;
  } else {
    (global as any).event = new EventEmitter();
    return (global as any).event as EventEmitter;
  }
}

export function setProvider(provider: any) {
  (global as any).provider = provider;
  const currentAccount = getCurrentAccount();
  if (currentAccount) {
    (global as any).signer = new ethers.Wallet(
      currentAccount.privateKey,
      provider
    );
  }
}

export function getProvider() {
  return (global as any).provider;
}

export function getSigner(): Signer {
  return (global as any).signer;
}

export function setCurrentAccount(account: Account) {
  (global as any).currentAccount = account;
  const provider = getProvider();
  if (provider) {
    (global as any).signer = new ethers.Wallet(account.privateKey, provider);
  }
}

export function getCurrentAccount() {
  return (global as any).currentAccount;
}

export function setPassword(password: string) {
  (global as any).unlockCode = password;
}
export function setUser(user: User) {
  (global as any).user = user;
  setCurrentAccount(user.accounts[0]);
}

export function getPassword(): string {
  return (global as any).unlockCode;
}

export function getUser(): User {
  return (global as any).user as User;
}
