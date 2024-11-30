import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {ObtenerCuentasUsuarioService} from "../../../core/services/obtener-cuentas-usuario.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {EditarCuentaUsuarioService} from "../../../core/services/editar-cuenta-usuario.service";
import {F} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-editar-cuenta-usuario',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './editar-cuenta-usuario.component.html',
  styleUrls: ['./editar-cuenta-usuario.component.scss']
})
export class EditarCuentaUsuarioComponent implements OnInit {
  id: string =''
  idCuentas: any
  listaCuentas: any[] = []
  cuentaSelecccionada: any = null
  showAlertSuccess: boolean = false;
  showAlertError: boolean = false;
  showAlertWarning: boolean = false;
  form = new FormGroup<formType>({
    id: new FormControl('',{
      nonNullable: true
    }),
    account: new FormControl('Seleccione una cuenta', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    accountType: new FormControl({
      value: '',
      disabled: true
    }, {
      nonNullable: true,
      validators: [Validators.required]
    }),
    accountHolder: new FormControl({
      value: '',
      disabled: true
    }, {
      nonNullable: true,
      validators: Validators.required}),
    balance: new FormControl(0, {
      nonNullable: true,
      validators: [
        Validators.required ,
        Validators.pattern(/^\d+(\.\d{1,2})?$/)
      ]

    }),
  })
  constructor(
    private loaderService: NgxUiLoaderService,
    private obtenerCuentasService: ObtenerCuentasUsuarioService,
    private editarCuentaService: EditarCuentaUsuarioService,
    @Inject(MAT_DIALOG_DATA) public data:{id: string},
  ) { }

  ngOnInit(): void {
    this.id = this.data.id
    this.obtenerCuentas()
  }

  obtenerCuentas(){
    this.obtenerCuentasService.obtenerCuentasUsuarioId(this.id).subscribe(
      (data: any) =>{
        this.listaCuentas = data.result
        this.idCuentas = this.listaCuentas.map((c: Cuenta)=> c.id)
      },
      (error) =>{
        console.error('Error' + error)
      }
    )
  }

  onCuentaSeleccionada(event : any){
    const idSelect = event.target.value
    this.cuentaSelecccionada = this.listaCuentas.find(cuenta => cuenta.id === idSelect)
    if(this.cuentaSelecccionada){
      this.form.patchValue({
        accountHolder: this.cuentaSelecccionada.accountHolder,
        accountType: this.cuentaSelecccionada.accountType === 'debit' ? "Debito": "Credito",
        balance: this.cuentaSelecccionada.balance,
        id: this.cuentaSelecccionada.id
      })
    }
  }

  editarCuenta(){
    if(this.form.valid){
      const idAccount = this.form.value.id ?? ''

      const changes = {
        balance: this.form.value.balance
      }
      this.loaderService.start()
      this.editarCuentaService.editarCuenta(idAccount, changes).subscribe({
        next: (response)=> {
          this.loaderService.stop()
          this.showAlertSuccess = true
        },
        error: (e)=>{
          this.loaderService.stop()
          this.showAlertError = true
          console.error(e)
        }
      })
    } else {
      this.loaderService.stop()
      console.log('No hay cambios para actualizar');
      this.showAlertWarning = true
    }
  }
}

type formType = {
  id: FormControl<string>
  account: FormControl<string>,
  accountType: FormControl<string>
  accountHolder: FormControl<string>,
  balance: FormControl<number>,
}

interface Cuenta {
  accountHolder: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  id: string;
  user: {
    email: string;
    id: string;
  };
}
