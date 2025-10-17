import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Product,
  ProductsResponse,
} from '@products/interfaces/product.interface';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.baseUrl;

interface Options {
  limit?: string;
  offset?: string;
  gender?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 9, gender = '' } = options;
    return this.http
      .get<ProductsResponse>(`${BASE_URL}/products`, {
        params: { limit, offset, gender },
      })
      .pipe(tap((resp) => console.log(resp)));
  }
  getProductByIdSlug(idSlug: string): Observable<Product> {
    return this.http
      .get<Product>(`${BASE_URL}/products/${idSlug}`)
      .pipe(tap((resp) => console.log(resp)));
  }
}
