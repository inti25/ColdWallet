import { User } from "../model/User";
import { EventEmitter } from "events";

export function getGlobalEvent(): EventEmitter {
  if ((global as any).event) {
    return (global as any).event as EventEmitter;
  } else {
    (global as any).event = new EventEmitter();
    return (global as any).event as EventEmitter;
  }
}

export function setPassword(password: string) {
  (global as any).unlockCode = password;
}
export function setUser(user: User) {
  (global as any).user = user;
}

export function getPassword(): string {
  return (global as any).unlockCode;
}

export function getUser(): User {
  return (global as any).user as User;
}
