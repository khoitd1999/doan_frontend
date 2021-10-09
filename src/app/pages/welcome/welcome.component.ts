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
      "./assets/images/slide/slide1.png",
      "./assets/images/slide/slide2.png",
      "./assets/images/slide/slide3.png",
      "./assets/images/slide/slide4.png"
    ];
    this.active = 0;
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
