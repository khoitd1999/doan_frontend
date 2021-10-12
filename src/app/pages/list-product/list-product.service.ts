import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {
  private sourceUrl = 'http://localhost:8081/welcome';

  constructor(private http: HttpClient) {
  }


}
