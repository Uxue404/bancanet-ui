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
  transaccion: any = null;
  nombreUsuario: string | null = '';
  listaCuentas: any
  isDigitalCardActive:boolean = false
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

  obtenerUsuario(){
    this.id = this.authService.getId()
    console.warn(this.id)
    this.obtenerUsuarioId.obtenerUsuarioId(this.id!).subscribe(
      (data: any)=>{
        console.warn(data);
      },
      (error)=>{
        console.log(error);
      }
    )
  }


  obtenerMovimientos(){
    this.id = this.authService.getId()
    this.obtenerTransacciones.obtenerTransaccionesUsuario(this.id!).subscribe(
      (data)=>{
        this.transaccion = data
        // console.log(this.transaccion)
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
        // console.warn(data)
      },
      (error) =>{
        console.error('Error' + error)
      }
    )

  }


}
