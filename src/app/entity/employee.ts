export interface IEmployee {
  id?: any;
  username?: any;
  password?: any;
  fullName?: any;
  role?: any;
  status?: any;
  rePassword?: any;
}

export class Employee implements IEmployee {
  constructor(
    public id?: any,
    public username?: any,
    public password?: any,
    public fullName?: any,
    public role?: any,
    public status?: any,
    public rePassword?: any
  ) {
  }
}
