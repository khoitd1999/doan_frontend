import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private sourceUrl = 'http://localhost:8081/policy';

  constructor(private http: HttpClient) {
  }

  loadAllData(): Observable<any> {
    return this.http.get<any>(this.sourceUrl + '/load-all');
  }
}
