import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private sourceUrl = 'http://localhost:8081/bill';

  constructor(private http: HttpClient) {
  }

  save(req): Observable<any> {
    return this.http.post<any>(this.sourceUrl + '/save', req).pipe(catchError(() => of({data: []})));
  }
}
