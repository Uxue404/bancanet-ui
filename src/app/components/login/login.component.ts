import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  form = new FormGroup<formType>({
    userName: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required
        // Validators.email
      ]
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    })
  })
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  login(){
    if (this.form.valid){
      this.getFormValues()
      const { userName, password } = this.form.value;
      this.authService.login(userName!,password!).subscribe({
        next: ()=> {this.router.navigate(['/home'])
        },
        error: (e)=> console.error("Login failed" + e)
      })
    } else {
      alert("formulario invalido")
      this.form.markAllAsTouched();
    }
  }

  ngOnInit(): void {
  }

  get ctrluserName() {
    return this.form.controls.userName;
  }

  get ctrlPasswordUser() {
    return this.form.controls.password;
  }

  getFormValues(): void {
    const formValues = this.form.value;
    console.log('Form Values:', formValues);

  }

}
type formType = {
  userName: FormControl<string>,
  password: FormControl<string>
}
