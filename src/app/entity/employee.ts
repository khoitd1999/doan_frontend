export interface IEmployee {
  id?: any;
  username?: any;
  password?: any;
  fullname?: any;
  role?: any;
}

export class Employee implements IEmployee {
  constructor(
    public id?: any,
    public username?: any,
    public password?: any,
    public fullname?: any,
    public role?: any
  ) {
  }
}
