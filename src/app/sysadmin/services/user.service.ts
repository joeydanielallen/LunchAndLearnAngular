

// For demonstration purpose only.
// This service can be abstracted out for greater reuse.




import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/catch';
import { User } from '../models/user';


// import { CookieService } from 'ngx-cookie';
// import { AppSettingsModel } from './../../models';

@Injectable()
export class UserService {

  rootApiUrl = 'http://localhost:64875/api/';

  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        // 'Authorization': 'my-auth-token'
      })
    };

   private loggedOutSubject = new Subject<string>();
   private serviceErrorSubject = new Subject<number>();
   private itemDeletedSubject = new Subject();
   private unauthorizedActionSubject = new Subject();

   loggedOutEvent = this.loggedOutSubject.asObservable();
   serviceErrorEvent = this.serviceErrorSubject.asObservable();
   itemDeletedEvent = this.itemDeletedSubject.asObservable();
   unauthorizedActionEvent = this.unauthorizedActionSubject.asObservable();


  constructor(private http: HttpClient) { }



getUsers(): Observable<Array<User>> {
  return this.getRequest<Array<User>>('users');
}




  private  getRequest<T>(url: string): Observable<T> {
    const apiUrl = this.rootApiUrl + url;

    return this.http
    .get<T>(apiUrl, this.httpOptions)
    .catch(error => this.handleServiceError(error));
  }

  public handleServiceError(error: Response | any): ErrorObservable {
    if (!error) {
      return;
    }
    if (error.status === 401) {
      // this.logger.logInfo('Unauthenticated');
      this.loggedOutSubject.next(undefined);
    }
    if (error.status === 403) {
      // server said forbidden, routing to unauthorized resource, i.e. copy/paste link
      this.unauthorizedActionSubject.next();
    }
    if (error.status === 410) {
      // server said item is gone/deleted
      this.itemDeletedSubject.next();
    }
    if (error.status !== 401 &&
    error.status !== 403 &&
    error.status !== 410) {
     //  this.logger.logError(`error: $(error)`);
      this.serviceErrorSubject.next(error.status);
    }
    console.log(error);

    // this.logger.logError('service call error\n' + 'URL: ' + error.url + '\n' + error);
    return Observable.throw(error);
  }
}
