import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegistrarUsuarioService} from "../../../core/services/registrar-usuario.service";
import {ObtenerUsuariosNameService} from "../../../core/services/obtener-usuarios-name.service";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-crear-usuario-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {
  showAlertSuccess: boolean = false;
  showAlertError: boolean = false;
  showAlertWarning: boolean = false;
  errorMensage: string = ''
  max: number = 9999999999;
  form = new FormGroup<formType>({
    name: new FormControl<string>('',{
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    lastName: new FormControl<string>('',{
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    userName: new FormControl<string>('',{
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    phoneNumber: new FormControl('',{
      nonNullable: true,
      validators:[
        Validators.pattern(/^[0-9]*$/),
        Validators.max(this.max),
        Validators.required
      ]
    }),
    email: new FormControl('',{
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    }),
    password: new FormControl('',{
      nonNullable: true,
      validators: [
        Validators.required
      ]
    })
  })

  constructor(
    private usersService: RegistrarUsuarioService,
    private loaderService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.resetFormValues()
  }

  get ctrlFirstName(){
    return this.form.controls.name;
  }
  get ctrlLastName() {
    return this.form.controls.lastName;
  }

  get ctrlUserName() {
    return this.form.controls.userName;
  }

  get ctrlPhoneNumber() {
    return this.form.controls.phoneNumber;
  }

  get ctrlEmail() {
    return this.form.controls.email;
  }

  get ctrlPassword() {
    return this.form.controls.password;
  }

  crearUsuario(){
    this.resetAlerts()
    if(this.form.valid){
      const formData = {
        ...this.form.value,
        role: 'user'
      };
      this.loaderService.start()
      this.usersService.registrarUsuario(formData).subscribe(
        (r) => {
          this.showAlertSuccess = true
          this.resetFormValues()
          this.loaderService.stop()
        },
        (e)=>{
          this.loaderService.stop()
          this.showAlertError = true
          console.error("Error al Registra el usaurio", e)
        }
      )
    }else {
      this.showAlertWarning = true
    }
  }

  resetFormValues() {
    this.form.reset()
  }

  resetAlerts(){
    this.showAlertSuccess = false;
    this.showAlertError = false;
    this.showAlertWarning = false;
  }

}

type formType = {
  name: FormControl<string>,
  lastName: FormControl<string>,
  userName: FormControl<string>,
  phoneNumber: FormControl<string>,
  email: FormControl<string>,
  password: FormControl<string>,

}
