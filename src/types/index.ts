export interface IMsg {
  [key: string]: any;
}

export interface IMessages {
  [index: number]: IMsg;
}

export interface IButtonConnect {
  type: string;
  userName: string;
  idRoom: string;
  isActive: boolean;
}