import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
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

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollWindow, true);
  }

}
