import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AlertService} from "../UtilsService/alert.service";
import {NotificationService} from "../UtilsService/notification.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-welcome',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.css']
})
export class PageAdminComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  user: any;
  subscription: Subscription;

  constructor(private route: Router,
              public alertService: AlertService,
              public notificationService: NotificationService) {
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('employee'));
    this.subscription = this.notificationService.currentMessage.subscribe(msg =>  {
      if (msg) {
        this.alertService.success(msg);
      }
    });
  }

  logout() {
    sessionStorage.removeItem('employee');
    this.route.navigate(['/pages_admin/login']);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
