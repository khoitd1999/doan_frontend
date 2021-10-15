export interface ICart {
  id?: any;
  idPro?: any;
  namePro?: any;
  idBil?: any;
  quantity?: any;
  price?: any;
  amount?: any;
  image?: any;
}

export class Cart implements ICart {
  constructor(
    public id?: any,
    public idPro?: any,
    public namePro?: any,
    public idBil?: any,
    public quantity?: any,
    public price?: any,
    public amount?: any,
    public image?: any
  ) {
  }
}
