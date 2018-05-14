import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

export interface TableCounts {
  itemCount : number;
  weaponCount : number;
  armorCount : number;
  skillCount : number;
  buildCount : number;
}

@Injectable()
export class HomeService {

  constructor(private http: HttpClient) { }

  getOverview(): Observable<TableCounts> {
    return this.http.get<TableCounts>('http://localhost:4300/api/overview');
  }
}
