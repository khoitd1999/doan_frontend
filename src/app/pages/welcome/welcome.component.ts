import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  urlLinkImages: any;
  active: any;
  constructor() { }

  ngOnInit() {
    this.urlLinkImages = [
      "https://cdn.tgdd.vn/2021/10/banner/fold3-830-300-830x300.png",
      "https://cdn.tgdd.vn/2021/09/banner/reno6cb-830-300-830x300.png",
      "https://cdn.tgdd.vn/2021/10/banner/830-300-830x300-1.png",
      "https://cdn.tgdd.vn/2021/09/banner/830-300-830x300-16.png"
    ];
    this.setActiveImage();
  }

  setActiveImage() {
    setInterval(() => {
      if (this.active + 1 < 4) {
        this.active++;
      } else {
        this.active = 0;
      }
    }, 4000);
  }

  changeImage(next) {
    if (next) {
      if (this.active == 3) {
        this.active = 0;
      } else {
        this.active++;
      }
    } else {
      if (this.active == 0) {
        this.active = 3;
      } else {
        this.active--;
      }
    }
  }
}
