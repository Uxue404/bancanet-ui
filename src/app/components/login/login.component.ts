import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = new FormGroup<formType>({
    emailUser: new FormControl<string>('', {
      nonNullable: true,
      validators:[
        Validators.required,
        Validators.email
      ]
    }),
    passwordUser: new FormControl<string>('', {
      nonNullable: true,
      validators:[
        Validators.required,
      ]
    })
  })
  constructor() { }

  ngOnInit(): void {
  }

  get ctrlEmailUser(){
    return this.form.controls.emailUser;
  }

  get ctrlPasswordUser(){
    return this.form.controls.passwordUser;
  }

}
type formType={
  emailUser: FormControl<string>,
  passwordUser: FormControl<string>
}
