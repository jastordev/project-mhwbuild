import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

export interface Overview {
  itemCount : number;
  weaponCount : number;
  armorCount : number;
  skillCount : number;
  buildCount : number;
}

@Injectable()
export class HomeService {

  constructor(private http: HttpClient) { }

  getOverview(): Observable<Overview> {
    return this.http.get<Overview>('http://localhost:4300/api/overview');
  }
}
