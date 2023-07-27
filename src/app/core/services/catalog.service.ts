import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import {Router} from "@angular/router";
export interface IParamsRequestKeys {
  [key: string]: any;
}

@Injectable({providedIn: 'root'})

export class CatalogService {
  constructor(private http: HttpClient, private router: Router) {}

  public setQueryParams(queryParams?: IParamsRequestKeys): void {
    this.router.navigate([], {queryParams});
  }

  public getCatalogItemsList(params?: IParamsRequestKeys): Observable<any[]>  | any{
    return this.http.get<any[]>('images/search', {params} )
  }

  public getBreedsList(): Observable<any> {
    return this.http.get('breeds')
  }
}
