import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  client: any;
  constructor(
    private route: Router
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem('client') !== null) {
      this.client = JSON.parse(sessionStorage.getItem('client'));
    }
    window.addEventListener('scroll', this.scrollWindow, true);
  }

  scrollWindow() {
    let header = document.getElementById('sticky-header-with-topbar');
    var scroll = window.pageYOffset || document.documentElement.scrollTop;
    if (scroll < 245) {
      header.classList.remove("scroll-header");
    } else {
      header.classList.add("scroll-header");
    }
  }

  changeStatus() {
    if (this.client) {
      sessionStorage.removeItem('client');
      sessionStorage.removeItem('cart');
    }
    this.route.navigate(['/pages/login']);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollWindow, true);
  }

}
