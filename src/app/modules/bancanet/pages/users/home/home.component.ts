import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "../../../../../components/navbar/navbar.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

import {
  DatosMovimientoDialogComponent
} from "../../../../../shared/dialogs/datos-movimiento-dialog/datos-movimiento-dialog.component";
import {FormControl, FormGroup} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {AuthService} from "../../../../../core/services/auth.service";
import {ObtenerTransaccionesUsuarioService} from "../../../../../core/services/obtener-transacciones-usuario.service";
import {ObtenerUsuarioIdService} from "../../../../../core/services/obtener-usuario-id.service";
import {ObtenerCuentasUsuarioService} from "../../../../../core/services/obtener-cuentas-usuario.service";
import {data} from "autoprefixer";
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatDialogModule, MatIconModule, MatMenuModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  id: string | null = ''
  idCuentas: any
  transaccion: any[] = [];
  nombreUsuario: string | null = '';
  listaCuentas: any
  isCliente: boolean = false;
  hasCuentas: boolean = false;
  hasMovimientos: boolean = false;
  constructor(
    private matDialog: MatDialog,
    private authService: AuthService,
    private obtenerTransacciones: ObtenerTransaccionesUsuarioService,
    private obtenerCuentasService: ObtenerCuentasUsuarioService,
    private obtenerUsuarioId: ObtenerUsuarioIdService
  ) { }

  ngOnInit(): void {
    this.obtenerMovimientos()
    this.nombreUsuario = localStorage.getItem('name');
    this.obtenerCuentas()
  }


  logout(){
    this.authService.logout();
  }
  modalMovimiento(data: any){
    // console.log(id);
    this.matDialog.open(DatosMovimientoDialogComponent, {
      width: '90%',
      data: data
    })

  }



  obtenerMovimientos(){
    this.id = this.authService.getId()
    this.obtenerTransacciones.obtenerTransaccionesUsuario(this.id!).subscribe(
      (data:any)=>{
        this.transaccion = data.result;
        // console.log(this.transaccion)
        this.hasMovimientos = this.transaccion.length > 0;
      },
      (erro) =>{
        console.log(erro)
      }
    )
  }

  obtenerCuentas(){
    this.id = this.authService.getId()
    this.obtenerCuentasService.obtenerCuentasUsuarioId(this.id!).subscribe(
      (data) =>{
        this.listaCuentas = data
        this.isCliente = true;
        this.hasCuentas = this.listaCuentas.result && this.listaCuentas.result.length > 0;
      },
      (error) =>{
        console.error('Error' + error)
      }
    )
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
