import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {TokenDialogComponent} from "../token-dialog/token-dialog.component";
import {TransferenciaService} from "../../../../core/services/transferencia.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-formulario-transferencia-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './formulario-transferencia-dialog.component.html',
  styleUrls: ['./formulario-transferencia-dialog.component.scss']
})
export class FormularioTransferenciaDialogComponent implements OnInit {
  id: string | null = ''
  showAlertSuccess: boolean = false;
  showAlertError: boolean = false;
  showAlertWarning: boolean = false;
  transferActive: boolean= true
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
    })
  })

  constructor(
    private matDialog: MatDialog,
    private transfer: TransferenciaService,
    private authService: AuthService,

  ) { }

  ngOnInit(): void {
  }

  generarToken(){
    // this.matDialog.open(TokenDialogComponent,{
    //   restoreFocus: false,
    //   width: '90%'
    // })
    this.id = this.authService.getId()
    if(this.form.valid){
      const formData = {
        ... this.form.value,
        user: this.id,
        type: "transfer"
      }
      this.transfer.hacerTransferencia(formData).subscribe(
        (r) =>{
          this.showAlertSuccess = true;
          this.resetFormValues();
        },
        (e)=>{
          this.showAlertError = true;
        }
      )
    }else {
      this.showAlertWarning = true
    }

  }
  resetFormValues() {
    this.form.reset()
  }
}

type formType = {
  account: FormControl<string>,
  amount: FormControl<string>,
  description: FormControl<string>,
}
