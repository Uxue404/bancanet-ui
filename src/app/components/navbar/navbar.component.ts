import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {
  DatosBancariosDialogComponent
} from "../../shared/dialogs/datos-bancarios-dialog/datos-bancarios-dialog.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule,MatDialogModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  activeModal: string | null = null;


  constructor(
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
  mostrarDatosBancarios(){
    this.matDialog.open(DatosBancariosDialogComponent, {
      data: {
        numCuenta: this.usuario.numCuenta,
        numTarjeta: this.usuario.numTarjeta,
        numCLABE: this.usuario.numCLABE
      }

    })
  }

  usuario: usuarioBancoInfo={
    idUser: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    nomUser: 'juanperez',
    numCuenta: '1234567890',
    numTarjeta: '1111-2222-3333-4444',
    numCLABE: '123456789012345678'
  }
}

type usuarioBancoInfo = {
  idUser: number,
  nombre: string,
  apellido: string,
  nomUser: string,
  numCuenta: string,
  numTarjeta: string,
  numCLABE: string,
}
