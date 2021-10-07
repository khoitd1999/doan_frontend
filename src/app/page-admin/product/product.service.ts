import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private sourceUrl = 'http://localhost:8081/product';

  constructor(private http: HttpClient) {
  }

  loadAllData(
    pageNo: number,
    pageSize: number,
    searchTerm
  ): Observable<any> {
    const params = new HttpParams()
      .append('page', `${pageNo}`)
      .append('size', `${pageSize}`)
      .append('sort', 'name,desc')
      .append('searchTerm', `${searchTerm}`);
    return this.http.get<any>(`${this.sourceUrl}/pagination`, {params})
      .pipe(catchError(() => of({data: []})));
  }

  loadAll(): Observable<any> {
    return this.http.get<any>(this.sourceUrl + '/load-all').pipe(catchError(() => of({data: []})));
  }

  checkBeforeDelete(req): Observable<any> {
    const params = new HttpParams()
      .append('id', `${req}`);
    return this.http.get<any>(this.sourceUrl + '/check-before-delete', {params});
  }

  save(req, image): Observable<any> {
    const formData = new FormData();
    if (image && image.size) {
      formData.append('imageFile', image.originFileObj, image.name);
    }
    formData.append('productString', JSON.stringify(req));
    return this.http.post<any>(this.sourceUrl + '/save', formData, {observe: 'response'}).pipe(catchError(() => of({data: []})));
  }

  getAllArea(searchTerm): Observable<any> {
    const params = new HttpParams()
      .append('searchTerm', `${searchTerm}`);
    return this.http.get<any>(this.sourceUrl + '/get-address', {params}).pipe(catchError(() => of({data: []})));
  }

  loadCategoryAndBrand(): Observable<any> {
    return this.http.get<any>(this.sourceUrl + '/get-brand-category');
  }
}
