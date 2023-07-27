import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "@environments/environment";

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = request.url;

    if (!url.match(/(assets|\.json)/) && !url.match(environment.host)) {
      request = request.clone({
        url: `${environment.host}/${request.url}?api_key=live_rcFSc3UjiRzokCofO75lHRfQE18JhePgQLSKWenvMqEzxCmaS6gNbi61QFC6Tic8`
      });
    }

    return next.handle(request);
  }
}
