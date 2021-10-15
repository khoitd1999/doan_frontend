import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bill} from "../../entity/bill";
import {WarehouseService} from "../../page-admin/warehouse/warehouse.service";
import {Status_Bill, TypeShip} from "../../app.constant";
import {CheckoutService} from "./checkout.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  bill: Bill;
  provinces: any;
  districts: any;
  wards: any;
  client: any
  idPro: any;
  idDis: any;
  idWarType0: any;
  idProType0: any;
  idDisType0: any;
  warehouses: any;
  carts: any;
  cartsNotPurchases: any;
  cartsNotPurchase: any;
  GIAO_HANG_TAN_NOI = TypeShip.GIAO_HANG_TAN_NOI;
  NHAN_TAI_CUA_HANG = TypeShip.NHAN_TAI_CUA_HANG;
  deliveryCharge: any;
  typeShip: string;
  street: any;

  constructor(
    private warehouseService: WarehouseService,
    private checkoutService: CheckoutService
  ) {
  }

  ngOnInit() {
    this.bill = new Bill();
    this.provinces = [];
    this.districts = [];
    this.wards = [];
    this.warehouses = [];
    this.cartsNotPurchases = [];
    this.carts = JSON.parse(sessionStorage.getItem('cart'));
    this.typeShip = this.GIAO_HANG_TAN_NOI;
    this.client = JSON.parse(sessionStorage.getItem('client'));
    this.loadMoreProvince(null);
  }

  loadMoreProvince(searchText?: string) {
    this.warehouseService.getAllArea(
      JSON.stringify({ nameSearch: searchText || '',
        code: null })).subscribe(res => {
      this.provinces = res;
      if (this.typeShip === this.GIAO_HANG_TAN_NOI) {

      } else {
        this.loadMoreDistrict();
        this.loadWarehouse();
      }
    });
  }

  loadMoreDistrict(searchText?: string) {
    const code = this.typeShip === this.GIAO_HANG_TAN_NOI ? this.idProType0 : this.idPro;
    this.warehouseService.getAllArea(
      JSON.stringify({code: code})).subscribe(res => {
        this.districts = res;
    });
  }

  loadMoreWard(searchText?: string) {
    this.warehouseService.getAllArea(
      JSON.stringify({
        code: this.idDisType0})).subscribe(res => {
      this.wards = res;
    });
  }

  onSearch(searchText?): void {
    if (!this.idProType0) {
      this.provinces = [];
      this.districts = [];
      this.wards = [];
      this.loadMoreProvince(searchText);
    } else if (!this.idDisType0) {
      this.districts = [];
      this.wards = [];
      this.idWarType0 = null;
      this.loadMoreDistrict(searchText);
    } else if (!this.idWarType0) {
      this.wards = [];
      this.loadMoreWard(searchText);
    }
  }

  changeAddress(isProvince) {
    if (isProvince) {
      this.idDis = null;
      this.loadMoreDistrict();
    }
    this.loadWarehouse();
  }

  loadWarehouse() {
    const search = JSON.stringify({codeProvince: this.idPro, codeDistrict: this.idDis, listID: this.carts.map(n => n.idPro)});
    this.warehouseService.loadWarehouse(search).subscribe(res => {
      this.warehouses = res;
      if (this.warehouses.length === 0 && this.idPro) {
        this.cartsNotPurchases = JSON.parse(JSON.stringify(this.carts));
      } else {
        this.cartsNotPurchases = [];
      }
      this.warehouses.forEach((n, i) => {
        if (i === 0) {
          n.selected = true;
          this.cartsNotPurchases = this.carts.filter(m => n.unavailable.includes(m.idPro));
        } else {
          n.selected = false;
        }
      });
    });
  }

  changeWarehouse(i) {
    this.warehouses.forEach((n, index) => {
      this.warehouses[index].selected = index === i;
    });
    this.cartsNotPurchases = [];
    this.cartsNotPurchases = this.carts.filter(m => this.warehouses[i].unavailable.includes(m.idPro));
  }

  removeProductFromCart(data) {
    this.cartsNotPurchases = this.cartsNotPurchases.filter(n => n.idPro !== data.idPro);
    this.carts = this.carts.filter(n => n.idPro !== data.idPro);
  }

  ngOnDestroy(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.carts));
  }

  calculateFee() {
    if (this.idWarType0) {
      const address = this.wards.find(n => this.idWarType0 === n.code).name + ' ' + this.districts.find(n => this.idDisType0 === n.code).name
        + ' ' + this.provinces.find(n => this.idProType0 === n.code).name;
      const search = JSON.stringify({codeProvince: this.idProType0, codeDistrict: this.idDisType0, codeWard: this.idWarType0, addressSearch: address, listID: this.carts.map(n => n.idPro)});
      this.warehouseService.calculateFee(search).subscribe(res => {
        this.deliveryCharge = res;
        if (this.deliveryCharge.id) {
          this.deliveryCharge.selected = true;
          this.cartsNotPurchases = [];
          this.cartsNotPurchases = this.carts.filter(m => this.deliveryCharge.unavailable.includes(m.idPro));
        } else {
          this.deliveryCharge = null;
          this.cartsNotPurchases = [];
          this.cartsNotPurchases = JSON.parse(JSON.stringify(this.carts));
        }
        console.log(res);
      });
    }
  }

  changeTypeShip() {
    this.idPro = null;
    this.idProType0 = null;
    this.idDis = null;
    this.idDisType0 = null;
    this.idWarType0 = null;
    this.deliveryCharge = null;
    this.cartsNotPurchases = [];
    this.warehouses = [];
    this.bill = new Bill();
  }

  calculateAmount() {
    let amount = 0;
    this.carts.forEach(n => {
      amount += n.amount;
    });
    return amount;
  }

  calculateTotalAmount() {
    const fee = this.deliveryCharge && this.deliveryCharge.fee > 0 ? this.deliveryCharge.fee : 0;
    return this.calculateAmount() + fee;
  }

  checkErr() {
    if (this.carts.length === 0) {
      return true;
    }
    if (this.typeShip === this.GIAO_HANG_TAN_NOI) {
      if (!this.idWarType0) {
        return true;
      }
    } else if (this.typeShip === this.NHAN_TAI_CUA_HANG) {
      if (!this.idPro) {
        return true;
      }
    }
    if (this.cartsNotPurchases.length > 0) {
      return true;
    }
    return false;
  }

  save() {
    if (this.checkErr()) {
      return;
    }
    this.bill.carts = [];
    this.carts.forEach(res => {
      this.bill.carts.push({idPro: res.idPro, namePro: res.namePro, quantity: res.quantity, price: res.price, amount: res.amount});
    });
    this.bill.typeShip = +this.typeShip;
    this.bill.fee = this.deliveryCharge ? this.deliveryCharge.fee : 0;
    this.bill.status = Status_Bill.DA_XAC_NHAN;
    this.bill.totalAmount = this.calculateTotalAmount();
    this.bill.idCli = this.client.id;
    this.bill.nameCli = this.client.fullName;
    if (this.typeShip === this.GIAO_HANG_TAN_NOI) {
      this.bill.addressClient = (this.street ? (this.street + ' ') : '') + this.wards.find(n => this.idWarType0 === n.code).name + ' ' + this.districts.find(n => this.idDisType0 === n.code).name
        + ' ' + this.provinces.find(n => this.idProType0 === n.code).name;
      this.bill.addressWarehouse = this.deliveryCharge.address;
      this.bill.idWar = this.deliveryCharge.id;
      this.bill.idPol = this.deliveryCharge.idPol;
    } else {
      const warehouse = this.warehouses.find(n => n.selected);
      this.bill.addressWarehouse = warehouse.address;
      this.bill.idWar = warehouse.id;
    }
    this.checkoutService.save(this.bill).subscribe(res => {

    });
  }
}
