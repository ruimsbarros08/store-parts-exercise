import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Part} from './part';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartsService {

  constructor(private httpClient: HttpClient) { }

  getParts(): Observable<Part[]> {
    return this.httpClient.get<Part[]>(`${environment.api}/store/parts`);
  }

  getPartTypes(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${environment.api}/store/part-types`);
  }
}
