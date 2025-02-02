/* eslint-disable */
import { INumber, Achievement } from "@/utils/Type";

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public username: string,
    public role: number,
    public status: string,
    public title: string,
    public status_type: string,
    public address: string,
    public biography: string,
    public contact_number: Array<INumber>,
    public achievements: Array<Achievement>
  ) { }
}
