import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StopsService {
  constructor(private http: HttpClient) { }

  public getStops(): Observable<any> {
    const url = 'https://api-v3.mbta.com/facilities';
    return this.http.get<any>(url);
  }
  public getPredictions(stop: any): Observable<any> {
    const url = `https://api-v3.mbta.com/predictions`;
    let queryParams = new HttpParams();
    queryParams = queryParams.append('filter[stop]', stop);
    return this.http.get<any>(url, { params: queryParams });
  }
}
