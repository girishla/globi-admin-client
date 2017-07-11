import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpInterceptorService} from 'ng-http-loader/http-interceptor.service';
import { AppStateService } from "app/shared/services/app-state.service";
import { JwtService } from "app/shared/services/jwt.service";


@Injectable()
export class ApiService {
  constructor(
    private http: Http,
    private httpService:HttpInterceptorService,
    private jwtService: JwtService

  ) {}

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.jwtService.getToken()) {
      headersConfig['x-auth-token'] = `${this.jwtService.getToken()}`;
    }

    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {

     return Observable.throw(error.json());
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {


    return this.httpService.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), search: params })
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.httpService.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.httpService.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }

  delete(path): Observable<any> {
    return this.httpService.delete(
      `${environment.api_url}${path}`,
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }
}