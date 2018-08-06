import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { ToastService } from '../toast.service';

@Injectable()
export class SkillDataService {

  private backEndDomain = "http://localhost:4300";

  
  constructor(private http : HttpClient, private toast : ToastService) {  
  }

}
