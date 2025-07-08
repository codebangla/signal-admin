import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only prepend apiUrl if the request URL starts with '/'
    if (req.url.startsWith('/')) {
      const apiReq = req.clone({ url: environment.apiUrl + req.url });
      return next.handle(apiReq);
    }
    return next.handle(req);
  }
} 