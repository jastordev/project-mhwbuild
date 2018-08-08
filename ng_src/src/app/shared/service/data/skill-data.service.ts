import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { ToastService } from '../toast.service';

import { Skill } from '../../models/skill.model';

@Injectable()
export class SkillDataService {

  private backEndDomain = "http://localhost:4300";

  private _skills : BehaviorSubject <Skill[]>;
  
  constructor(private http : HttpClient, private toast : ToastService) {
    this._skills = <BehaviorSubject<Skill[]>>new BehaviorSubject([]);  
  }

  getSkills() : Observable <Skill[]> {
    this.loadAll();
    return this._skills.asObservable();
  }

  private loadAll() {
    this.http.get(this.backEndDomain + '/api/skills/')
      .subscribe( (data : Skill[]) => {
        this._skills.next(Object.assign({}, data));
      },
      err => {
        console.log(err);
      });
  }

}
