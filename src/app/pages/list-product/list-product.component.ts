import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../page-admin/product/product.service";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
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
  priceFilter: any;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.prices = [
      {id: 1, name: 'Dưới 15 triệu'},
      {id: 2, name: 'Từ 15 - 20 triệu'},
      {id: 3, name: 'Từ 20 - 25 triệu'},
      {id: 4, name: 'Từ 25 - 30 triệu'},
      {id: 5, name: 'Trên 30 triệu'},
    ];
    this.products = [];
    this.isLoadMore = false;
    this.pageIndex = 1;
    this.pageSize = 8;
    this.activatedRoute.data.subscribe(data => {
      if (data.brandes) {
        this.products = [];
        this.priceFilter = null;
        this.brandes = data.brandes;
        this.idBra = this.brandes[0].id;
        this.loadAll();
      }
    });
  }

  loadAll() {
    const searchTerm = JSON.stringify({ idBra: this.idBra, sizeCurrent: this.products.length, priceFilter: this.priceFilter });
    this.productService.loadAllData(this.pageIndex - 1, this.pageSize, searchTerm).subscribe(res => {
      // this.total = res.body[1];
      for (let item of res.body[0]) {
        item.image = 'data:image/jpeg;base64,' + item.image;
      }
      this.products = [...this.products, ...res.body[0]];
      this.isLoadMore = res.isLoadMore;
    })
  }

  loadMore() {
    this.pageIndex++;
    this.loadAll();
  }

  changeBrand(bra) {
    this.pageIndex = 1;
    this.idBra = bra.id;
    this.products = [];
    this.priceFilter = null;
    this.loadAll();
  }

  filterProducts() {
    this.pageIndex = 1;
    this.products = [];
    this.loadAll();
  }
}
