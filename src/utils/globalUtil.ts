import { User } from "../model/User";

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
