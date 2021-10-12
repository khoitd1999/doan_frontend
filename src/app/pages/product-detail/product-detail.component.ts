import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../page-admin/product/product.service";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {WarehouseService} from "../../page-admin/warehouse/warehouse.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  active: any;
  categories: any;
  brandes: any;
  products: any;
  prices: any;
  pageIndex: any;
  pageSize: any;
  isLoadMore: any;
  idCat: any;
  idBra: any;
  product: any;
  quantity: any;
  provinces: any;
  codePro: any;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private warehouseService: WarehouseService
  ) {

  }

  ngOnInit() {
    this.prices = [];
    this.products = [];
    this.isLoadMore = true;
    this.pageIndex = 1;
    this.pageSize = 8;
    this.quantity = 1;
    this.activatedRoute.data.subscribe(data => {
      if (data.product) {
        this.product = data.product;
        this.product.image = 'data:image/jpeg;base64,' + this.product.image;
      }
    });
    this.loadProvince();
  }

  subtractQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }


  addQuantity() {
    this.quantity++;
  }

  loadProvince() {
    this.warehouseService.getAllArea(
      JSON.stringify({ code: null })).subscribe(res => {
      this.provinces = res;
      this.codePro = this.provinces.find(n => n.name === 'Thành phố Hà Nội').code;
    });
  }
}
