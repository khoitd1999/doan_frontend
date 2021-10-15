import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  active: any;
  carts: any;

  constructor(
  ) {

  }

  ngOnInit() {
    this.carts = [];
    if (sessionStorage.getItem('cart')) {
      this.carts = JSON.parse(sessionStorage.getItem('cart'));
    }
  }

  ngOnDestroy(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.carts));
  }

  remove(i: number) {
    this.carts.splice(i, 1);
  }

  changeQuantity(i) {
    const t: any = document.getElementById('quantity' + i);
    this.carts[i].quantity = +t.value;
    this.carts[i].amount = this.carts[i].quantity * this.carts[i].price;
  }
}
