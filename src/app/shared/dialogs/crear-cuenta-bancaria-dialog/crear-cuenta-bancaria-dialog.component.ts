import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ObtenerUsuarioIdService} from "../../../core/services/obtener-usuario-id.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {RegistrarCuentaUsuarioService} from "../../../core/services/registrar-cuenta-usuario.service";

@Component({
  selector: 'app-crear-cuenta-bancaria-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './crear-cuenta-bancaria-dialog.component.html',
  styleUrls: ['./crear-cuenta-bancaria-dialog.component.scss']
})
export class CrearCuentaBancariaDialogComponent implements OnInit {
  showAlertSuccess: boolean = false;
  showAlertError: boolean = false;
  showAlertWarning: boolean = false;
  nomUser: string = ''
  form = new FormGroup<formType>({
    balance: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    accountType: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:{id: string},
    private userService: ObtenerUsuarioIdService,
    private loaderService: NgxUiLoaderService,
    private registrarCuenta: RegistrarCuentaUsuarioService
  ) { }


  ngOnInit(): void {
    console.warn(this.data.id)
    this.obtenerUsuario()
    this.resetFormValues()
  }

  obtenerUsuario(){
    this.userService.obtenerUsuarioId(this.data.id).subscribe(
      (res) =>{
        this.nomUser = res.result.name;
        // console.log(this.nomUser)
      },
      (error) =>{
        console.log(error);
      }

    )
  }

  crearCuenta(){
    this.resetAlerts()
    console.log(this.form.value)
    if(this.form.valid){
      const formData = {
        ...this.form.value,
        userId: this.data.id,
      };
      this.loaderService.start()
      this.registrarCuenta.crearCuentaUsuario(formData).subscribe(
        (r) => {
          this.showAlertSuccess = true;
          this.resetFormValues();
          this.loaderService.stop()
        },
        (e) =>{
          this.showAlertError = true;
          this.loaderService.stop()
        }
      )
    }else{
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

  get ctrlAccountType(){
    return this.form.controls.accountType
  }

  get ctrlBalance(){
    return this.form.controls.balance
  }

}

type formType = {
  balance: FormControl <string>,
  accountType: FormControl <string>
}
