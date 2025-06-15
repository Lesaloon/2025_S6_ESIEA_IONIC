import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
		private authService: AuthService
	) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if the request is going for login, no need to attach token
    if (req.url.includes('/api/login')) {
      return next.handle(req);
    }

    // also we only want to attach token if the request is going to our own API
    // WARNING: THIS WILL NEED TO CHANGE ONCE I HAVE THE ENV CONFIG SETUP
    if (!req.url.includes('/api')) {
      return next.handle(req);
    }

    return new Observable<HttpEvent<any>>(observer => {
      this.authService.getToken().then(authToken => {
        let handled;
        if (authToken) {
          const clonedReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${authToken}`),
          });
          handled = next.handle(clonedReq);
        } else {
          handled = next.handle(req);
        }
        handled.subscribe({
          next: value => observer.next(value),
          error: err => observer.error(err),
          complete: () => observer.complete()
        });
      });
    });
  }
}