import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Product } from '../shared/product';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product: Product[];

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService) { }

  getProducts(): Observable<Product[]> {
    return this.http.get(`${baseURL}product`).pipe(
      map((res) => {
        this.product = res['data'];
        return this.product;
      }),
      catchError(this.handleError));

  }
  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }


  submitProduct2(product: Product): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Product>(baseURL + 'product', product, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  submitProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${baseURL}register`, { data: product })
      .pipe(catchError(this.handleError));
  }

  submitImage(product: Product): Observable<Product> {
    const formData = new FormData();
    formData.append('image', product.image)
    return this.http.post<Product>(baseURL + 'upload', formData)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
