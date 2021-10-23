import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../page-admin/product/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WarehouseService} from "../../page-admin/warehouse/warehouse.service";
import {Cart} from "../../entity/cart";
import {AlertService} from "../../UtilsService/alert.service";
import {Comment, IComment} from "../../entity/comment";
import {InventoryService} from "../../page-admin/inventory/inventory.service";

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
  comments: any;
  comment: Comment;
  rate = 0;
  tooltips = ['Tồi tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];
  quantityInInventory = 0;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private warehouseService: WarehouseService,
    private alertService: AlertService,
    private route: Router,
    private inventoryService: InventoryService
  ) {

  }

  ngOnInit() {
    window.scroll(0, 0);
    this.prices = [];
    this.products = [];
    this.comments = [];
    this.isLoadMore = true;
    this.pageIndex = 1;
    this.pageSize = 8;
    this.quantity = 1;
    this.active = true;
    this.comment = new Comment();
    this.activatedRoute.data.subscribe(data => {
      if (data.product) {
        this.product = data.product;
        this.product.image = 'data:image/jpeg;base64,' + this.product.image;
        this.getAllComment(this.product.id);
        this.loadProvince();
      }
    });
  }

  subtractQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getAllComment(id) {
    this.productService.getAllComment(id).subscribe(res => {
      this.comments = res;
    })
  }

  addQuantity() {
    this.quantity++;
  }

  loadProvince() {
    this.warehouseService.getAllArea(
      JSON.stringify({ code: null })).subscribe(res => {
      this.provinces = res;
      this.codePro = this.provinces.find(n => n.name === 'Thành phố Hà Nội').code;
      this.getQuantityInventory();
    });
  }

  getQuantityInventory() {
    this.quantityInInventory = 0;
    if (this.codePro) {
      this.inventoryService.getQuantityInventory(JSON.stringify({codeProvince: this.codePro})).subscribe(res => {
        this.quantityInInventory = res;
        if (this.quantityInInventory === 0) {
          this.quantity = 1;
        }
      });
    }
  }

  addToCart() {
    let cart = new Cart();
    cart.image = this.product.image;
    cart.quantity = this.quantity;
    cart.namePro = this.product.namePro;
    cart.idPro = this.product.id;
    cart.price = this.product.price;
    cart.amount = this.product.price * this.quantity;

    const str = sessionStorage.getItem('cart');
    let carts;
    if (str) {
      carts = JSON.parse(str);
      let index = carts.map(n => n.idPro).indexOf(cart.idPro);
      if (index > -1) {
        carts[index].quantity += cart.quantity;
        carts[index].amount += cart.amount;
      } else {
        carts.push(cart);
      }
    } else {
      carts = [];
      carts.push(cart);
    }
    sessionStorage.setItem('cart', JSON.stringify(carts));
    this.alertService.success('Thêm vào giỏ hàng thành công');
    this.route.navigate(['/pages']);
  }

  changeActive() {
    this.active = !this.active;
  }

  submitComment() {
    if (this.checkErrComment()) {
      return;
    }
    this.comment.idPro = this.product.id;
    this.productService.submitComment(this.comment).subscribe(res => {
      this.product.rate = res;
      this.getAllComment(this.product.id);
      this.comment = new Comment();
      this.comment.rate = 0;
      this.comment.idPro = this.product.id;
    });
  }

  checkErrComment() {
    if (!this.comment.nameCli) {
      this.alertService.error('Chưa nhập tên');
      return true;
    } else if (!this.comment.comment) {
      this.alertService.error('Chưa nhập đánh giá');
      return true;
    }
    return false;
  }
}
