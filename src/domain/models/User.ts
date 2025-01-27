/* eslint-disable */
import { IUser } from "@/utils/Type";

export class User {
  constructor(public id: string, public name: string, public email: string, public username: string, public role: number, public status: string) { }
}
