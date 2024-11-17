import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
  
  constructor() { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = new HttpHeaders({
      'token-usuario': 'ABH13123jasjd123123'
    });

    const reqClone = req.clone({ headers });

    console.log('Paso por el interceptor...');
    return next.handle(reqClone).pipe(catchError(this.manejarError));

  }

  manejarError(error: HttpErrorResponse) {
    console.warn(error);
    console.log('sucedió un error');
    return throwError('Error personalizado');
  }
}
