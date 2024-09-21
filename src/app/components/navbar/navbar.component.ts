import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {
  DatosBancariosDialogComponent
} from "../../shared/dialogs/datos-bancarios-dialog/datos-bancarios-dialog.component";
import {DatosUsuarioDialogComponent} from "../../shared/dialogs/datos-usuario-dialog/datos-usuario-dialog.component";
import {
  AtencionClientesDialogComponent
} from "../../shared/dialogs/atencion-clientes-dialog/atencion-clientes-dialog.component";
import {
  FormularioTransferenciaDialogComponent
} from "../../shared/dialogs/tranferencias/formulario-transferencia-dialog/formulario-transferencia-dialog.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule,MatDialogModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  mostrarTransferencia(){
    this.matDialog.open(FormularioTransferenciaDialogComponent, {
      width: '90%'
    })
  }


  mostrarAtencionClientes(){
    this.matDialog.open(AtencionClientesDialogComponent, {
      width: '90%',
      data:{
        titulo: "¿Quieres contactar a soporte?",
        contenido:"Si quieres contactar con soporte presiona el boton verde"
      }
    })
  }

  mostrarDatosBancarios(){
    this.matDialog.open(DatosBancariosDialogComponent, {
      width: '90%',
      data: {
        numCuenta: this.usuario.numCuenta,
        numTarjeta: this.usuario.numTarjeta,
        numCLABE: this.usuario.numCLABE
      }

    })
  }

  mostrarDatosUsuario(){
    this.matDialog.open(DatosUsuarioDialogComponent, {
      width: '90%',
      data: {
        nomUsuario: `${this.usuario.nombre} ${this.usuario.apellido}`,
        fechaNacimiento: this.usuario.fechaNacimiento,
        correo: this.usuario.nomUser,
        telefono: this.usuario.telefono
      }
    })
  }

  usuario: usuarioBancoInfo={
    idUser: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    nomUser: 'juanperez',
    fechaNacimiento: '06/11/2001',
    telefono: '5566332244',
    numCuenta: '1234567890',
    numTarjeta: '1111-2222-3333-4444',
    numCLABE: '123456789012345678'
  }
}

type usuarioBancoInfo = {
  idUser: number,
  nombre: string,
  apellido: string,
  fechaNacimiento: string,
  nomUser: string,
  telefono: string,
  numCuenta: string,
  numTarjeta: string,
  numCLABE: string,
}
