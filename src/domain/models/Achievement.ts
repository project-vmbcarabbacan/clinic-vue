/* eslint-disable */
export class Achievement {
  constructor(
    public id: string,
    public user_id: string,
    public title: string,
    public description: string,
    public date: string,
    public image?: string | null
  ) { }
}
