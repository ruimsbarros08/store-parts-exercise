import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Part} from './part';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartsService {

  constructor(private httpClient: HttpClient) { }

  getParts(query: string, type: string): Observable<Part[]> {
    let params = new HttpParams();

    if (query) {
      params = params.append('query', query);
    }

    if (type){
      params = params.append('type', type);
    }

    return this.httpClient.get<Part[]>(`${environment.api}/store/parts`, {params: params});
  }

  getPartByName(name: string): Observable<Part> {
    return this.httpClient.get<Part>(`${environment.api}/store/parts/${name}`);
  }

  getPartTypes(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${environment.api}/store/part-types`);
  }
}
