import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {TokenDialogComponent} from "../token-dialog/token-dialog.component";
import {TransferenciaService} from "../../../../core/services/transferencia.service";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth.service";
import {ObtenerCuentasUsuarioService} from "../../../../core/services/obtener-cuentas-usuario.service";
import * as dgram from "node:dgram";

@Component({
  selector: 'app-formulario-transferencia-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './formulario-transferencia-dialog.component.html',
  styleUrls: ['./formulario-transferencia-dialog.component.scss']
})
export class FormularioTransferenciaDialogComponent implements OnInit {
  id: string | null = ''
  idCuentas: any
  errorPeticion : string | unknown = ''
  cuentaSelecccionada: any = null
  listaCuentas: any[] = []
  showAlertSuccess: boolean = false;
  showAlertError: boolean = false;
  showAlertWarning: boolean = false;
  transferActive: boolean= true
  private accountLengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === undefined) return null;

      // Convertir el número a string para contar sus dígitos
      const numberLength = value.toString().length;

      return (numberLength === 11 || numberLength === 18)
        ? null
        : { accountLength: true };
    };
  }
  form = new FormGroup<formType>({
    account: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    amount: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    destAccountNumber: new FormControl(null, {
      nonNullable: true,
      validators: [
        Validators.required,
        this.accountLengthValidator()
      ]
    }),
    destAccountHolderName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  })

  constructor(
    private matDialog: MatDialog,
    private transfer: TransferenciaService,

    private authService: AuthService,
    private obtenerCuentasService: ObtenerCuentasUsuarioService,

  ) { }

  ngOnInit(): void {
    this.obtenerCuentas()
  }

  get ctrlNumberLength(){
    return this.form.controls.destAccountNumber;
  }


  generarToken() {
    if (!this.form.valid) {
      this.showAlertWarning = true;
      this.errorPeticion = 'Error en el formulario';
      return;
    }

    this.id = this.authService.getId();
    const tokenData = {
      userId: this.id
    };

    this.transfer.generarTokenTrans(tokenData).subscribe({
      next: (tokenTrans) => {
        const formData = {
          ...this.form.value,
          user: this.id,
          type: 'transfer',
          token: parseInt(tokenTrans)
        };

        this.transfer.hacerTransferencia(formData).subscribe({
          next: (response) => {
            this.showAlertSuccess = true;
            this.resetFormValues();

            if (response.pdfBase64) {
              this.transfer.abrirPDFBase64(response.pdfBase64);
              this.transferActive = false
            }
          },
          error: (error) => {
            this.showAlertError = true;
            this.errorPeticion = error.error?.message || 'Error al realizar la transferencia';
            console.error('Error:', error);
          }
        });
      },
      error: (error) => {
        this.showAlertError = true;
        this.errorPeticion = 'Error al generar el token';
        console.error('Error:', error);
      }
    });
  }
  resetFormValues() {
    this.form.reset()
  }

  obtenerCuentas(){
    this.id = this.authService.getId()
    this.obtenerCuentasService.obtenerCuentasUsuarioId(this.id!).subscribe(
      (data:any) =>{
        this.listaCuentas = data.result
        // console.log(this.listaCuentas)
        this.idCuentas = this.listaCuentas.map((c: Cuenta) => c.id)
      },
      (error) =>{
        console.error('Error' + error)
      }
    )
  }

  onCuentaSeleccionada(event : any){
    const idSelect = event.target.value
    this.cuentaSelecccionada = this.listaCuentas.find(cuenta => cuenta.id === idSelect)
  }
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

type formType = {
  account: FormControl<string>,
  amount: FormControl<string>,
  description: FormControl<string>,
  destAccountNumber: FormControl<number | null>,
  destAccountHolderName: FormControl<string>
}
