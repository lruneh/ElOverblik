export interface IRefreshToken {
  token: string;
  date: string
}

export class RefreshToken implements IRefreshToken {
  token: string = "";
  date: string = "";
}
