import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {TokenDialogComponent} from "../token-dialog/token-dialog.component";

@Component({
  selector: 'app-formulario-transferencia-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './formulario-transferencia-dialog.component.html',
  styleUrls: ['./formulario-transferencia-dialog.component.scss']
})
export class FormularioTransferenciaDialogComponent implements OnInit {

  constructor(
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  generarToken(){
    
    this.matDialog.open(TokenDialogComponent,{
      restoreFocus: false,
      width: '90%'
    })
  }

}
