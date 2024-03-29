import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {
  private sourceUrl = 'http://localhost:8081/login';

  constructor(private http: HttpClient) {
  }

    checkLogin(username, password): Observable<any> {
    const params = new HttpParams()
      .append('username', `${username}`)
      .append('password', `${password}`);
    return this.http.post<any>(this.sourceUrl + '/check-login-admin', null,{ params }).pipe(catchError(() => of({ data: [] })));
  }
}
