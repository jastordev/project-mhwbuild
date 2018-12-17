import { Component, OnInit } from '@angular/core';
import { DOMService } from '../../service/dom.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({  
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  private loginFormToggle : Boolean;

  private loginForm : FormGroup;
  private registerForm : FormGroup;

  constructor(private domService : DOMService, private fb : FormBuilder) {
    this.loginFormToggle = true;
    this.createLoginForm();
    this.createRegisterForm();
  }

  ngOnInit() {
  }

  private createLoginForm() {
    this.loginForm = this.fb.group({
      username : ['', Validators.required ],
      password : ['', Validators.required ]
    })
  }

  private createRegisterForm() {
    this.registerForm = this.fb.group({
      username : ['', Validators.required ],
      password : ['', Validators.required ],
      confirmPassword : ['', Validators.required ],
      email : ['', Validators.required ]
    });
  }

  private onLoginSubmit(event : any) {
    event.stopPropagation();
  }

  private onRegisterSubmit(event : any) {
    event.stopPropagation();
  }

  private switchForms() {
    this.loginFormToggle = !this.loginFormToggle;
  }

  canCloseModal(){
    return true;
  }

}
