import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
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
    private loaderService: NgxUiLoaderService
  ) { }

  login(){
    if (this.form.valid){
      this.getFormValues()
      this.loaderService.start()
      const { userName, password } = this.form.value;
      this.authService.login(userName!,password!).subscribe({

          next: ()=> {
          this.isLoading = true;
          const role = localStorage.getItem("role");
          // console.log("local storage: "+ role);
          if (role === 'user'){
            this.router.navigate(['/home/user']);
          } else this.router.navigate(['/home/admon']);
          this.loaderService.stop()
        },
        error: (e)=> {
          this.loaderService.stop()
          this.isLoading = false
          console.error("Login failed" + e)
        }
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
    // console.log('Form Values:', formValues);

  }

  protected readonly console = console;
}
type formType = {
  userName: FormControl<string>,
  password: FormControl<string>
}
