import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ObtenerCuentasUsuarioService} from "../../../core/services/obtener-cuentas-usuario.service";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-datos-bancarios-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, MatButtonModule],
  templateUrl: './datos-bancarios-dialog.component.html',
  styleUrls: ['./datos-bancarios-dialog.component.scss']
})
export class DatosBancariosDialogComponent implements OnInit {
  id: string | null = ''
  listaCuentas: any
  constructor(
    private authService: AuthService,
    private obtenerCuentasService: ObtenerCuentasUsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: {
      numCuenta: string,
      numTarjeta: string,
      numCLABE: string
    }
  ) { }

  ngOnInit(): void {
    this.obtenerCuentas()
  }

  obtenerCuentas(){
    this.id = this.authService.getId()
    // console.log("ID en el diálogo:", this.id)
    this.obtenerCuentasService.obtenerCuentasUsuarioId(this.id!).subscribe(
      (data) => {
        // console.warn("Respuesta directa del servicio:", data)
        this.listaCuentas = data
        console.warn("Valor asignado a listaCuentas:", this.listaCuentas)
      },
      (error) => {
        console.error('Error al obtener cuentas:', error)
      }
    )
  }

}
