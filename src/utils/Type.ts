/* eslint-disable */
export type ISignin = {
  username: string;
  password: string
}

export type ISignup = {
  name: string;
  username: string;
  email: string;
  password: string;
  role: number;
}

export type ICreate = {
  name: string;
  username: string;
  email: string;
  password: string;
  status: string;
  role: number;
}

export type iUpdate = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  status: string;
  role: number;
}

export type IChange = {
  id: string;
  value: string;
}

export type Achievement = {
  _id?: string;
  id?: string;
  user_id: string;
  date: string;
  title: string;
  description: string;
  image: string;
}


export type IAchievementAdd = {
  user_id: string;
  title: string;
  description: string;
  date: string;
  image: File | null;
}

export type IAchievementUpdate = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

export type INumber = {
  number: string;
}

export type IUpdateUser = {
  id: string,
  name: string,
  email: string,
  title: string,
  address: string,
  biography: string,
  contact_number: Array<INumber>;
}
type IInformation = {
  title: string;
  status_type: string;
  address: string;
  biography: string;
  contact_number: Array<INumber>;
}

export type ICurrentUser = {
  status: string;
  created_at: string;
  updated_at: string;
  _id: string;
  name: string;
  email: string;
  username: string;
  role: number;
  information: IInformation
  achievements: Array<Achievement>
}

export type IUserRes = {
  message: string;
  user: ICurrentUser;
}

export type IAchievementRes = {
  message: string;
  achievement: Achievement;
}

export type IMessageRes = {
  message: string;
}

export type ISigninRes = {
  message: string;
  rt: string;
}

export type IUser = {
  id: string;
  name: string;
  email: string;
  username: string;
  role: number;
  status: string;
}

