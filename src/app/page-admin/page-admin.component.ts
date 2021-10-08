import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AlertService} from "../UtilsService/alert.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.css']
})
export class PageAdminComponent implements OnInit {
  isCollapsed = false;
  user: any;
  constructor(private route: Router,
              public alertService: AlertService) { }
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('employee'));
  }

  logout() {
    sessionStorage.removeItem('employee');
    this.route.navigate(['/pages_admin/login']);
  }
}
