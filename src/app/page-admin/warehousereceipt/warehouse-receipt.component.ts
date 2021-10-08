import {Component, OnInit} from '@angular/core';
import {WarehouseReceiptService} from "./warehouse-receipt.service";
import {AlertService} from "../../UtilsService/alert.service";
import {NzModalService} from "ng-zorro-antd";
import {WareHouseReceipt} from "../../entity/warehousereceipt";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './warehouse-receipt.component.html',
  styleUrls: ['./warehouse-receipt.component.css']
})
export class WarehouseReceiptComponent implements OnInit {
  wareHouseReceipts: any;
  total = 0;
  loading = false;
  pageSize = 10;
  pageIndex = 1;
  pageSizeDetail = 10;
  pageIndexDetail = 1;
  isVisible: boolean;
  isOkLoading: boolean;
  wareHouseReceipt: WareHouseReceipt;
  wareHouseReceiptDetails: any;
  titleModal: any;
  isLoading: any;
  timerID: any;
  nameSearch: any;
  addressSearch: any;
  employees: any;
  wareHouses: any;
  idWar: any;
  idEmp: any;
  dateFormat = 'dd/MM/yyyy';

  constructor(
    private warehouseReceiptService: WarehouseReceiptService,
    private alertService: AlertService,
    private modal: NzModalService,
    private router: Router
    // private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.isVisible = false;
    this.isOkLoading = false;
    this.employees = [];
    this.wareHouses = [];
    this.wareHouseReceipts = [];
    this.wareHouseReceipt = new WareHouseReceipt();
    this.wareHouseReceiptDetails = [];
    // this.alertService.name = 'QUẢN LÝ NHẬP KHO';
    this.loadEmployeeAndWareHouse();
    this.loadDataFromServer(this.pageIndex, this.pageSize, JSON.stringify({ idWar: this.idWar, idEmp: this.idEmp}));
    // this.loadMore(null, null);
  }

  loadEmployeeAndWareHouse() {
    this.warehouseReceiptService.loadEmployeeAndWareHouse().subscribe(res => {
      this.employees = res.body[1];
      this.wareHouses = res.body[0];
    });
  }

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    searchTerm
  ): void {
    this.loading = true;
    this.warehouseReceiptService.loadAllData(pageIndex - 1, pageSize, searchTerm).subscribe(res => {
      this.loading = false;
      this.total = res.body[1];
      this.wareHouseReceipts = res.body[0];
      this.pageIndexDetail = 1;
      this.pageSizeDetail = 10;
      this.wareHouseReceipt = this.wareHouseReceipts[0];
      this.loadDataDetail(this.pageIndexDetail, this.pageSizeDetail, JSON.stringify({ idWar: this.wareHouseReceipt.id}))
    });
  }

  loadDataDetail(
    pageIndex: number,
    pageSize: number,
    searchTerm
  ) {
    this.warehouseReceiptService.loadAllDetail(pageIndex - 1, pageSize, searchTerm).subscribe(res => {
      this.loading = false;
      this.wareHouseReceiptDetails = res.body[0];
    });
  }

  onCurrentPageDataChange(index, isSize): void {
    if (isSize) {
      this.pageSize = index;
    } else {
      this.pageIndex = index;
    }
    const searchTerm = JSON.stringify({ idWar: this.idWar, idEmp: this.idEmp });
    this.loadDataFromServer(this.pageIndex, this.pageSize, searchTerm);
  }

  onCurrentPageDataChangeDetail(index, isSize): void {
    if (isSize) {
      this.pageSizeDetail = index;
    } else {
      this.pageIndexDetail = index;
    }
    const searchTerm = JSON.stringify({ idWar: this.wareHouseReceipt.id });
    this.loadDataDetail(this.pageIndexDetail, this.pageSizeDetail, searchTerm);
  }

  searchPagination(): void {
    this.pageIndex = 1;
    this.pageSize = 10;
    const searchTerm = JSON.stringify({ idWar: this.idWar, idEmp: this.idEmp });
    this.loadDataFromServer(this.pageIndex, this.pageSize, searchTerm);
  }

  clearText(): void {
    this.idWar = null;
    this.idEmp = null;
    this.pageIndex = 1;
    this.pageSize = 10;
    this.loadDataFromServer(this.pageIndex, this.pageSize, JSON.stringify({ idWar: null, idEmp: null }));
  }


  redirectToDetail(id?) {
    if (id) {
      this.router.navigate(['/pages_admin/nhap-kho/', id, 'edit']);
    } else {
      this.router.navigate(['/pages_admin/nhap-kho/new']);
    }
  }

  onSelect(i) {
    this.wareHouseReceipt = this.wareHouseReceipts[i];
    this.pageIndexDetail = 1;
    this.pageSizeDetail = 10;
    const searchTerm = JSON.stringify({ idWar: this.wareHouseReceipt.id });
    this.loadDataDetail(this.pageIndexDetail, this.pageSizeDetail, searchTerm);
  }
}
