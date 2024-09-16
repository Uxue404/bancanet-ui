import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "../../../../components/navbar/navbar.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {
  DatosMovimientoDialogComponent
} from "../../../../shared/dialogs/datos-movimiento-dialog/datos-movimiento-dialog.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent,MatDialogModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {

  }

  usuarioLogeado: UsuarioBanco= {
    idUser: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    user: 'juanperez',
    cuenta: {
      numeroCuenta: '1234567890',
      tarjetaDigital: '1111222233334444',
      CLABE: '123456789012345678',
      creditoAceptado: 10000.00,  // Crédito aceptado
      saldoDisponible: 7000.00,   // Calculado (basado en transacciones)
      cargos: 3000.00   // Inicialmente igual al crédito aceptado
    }
  }

  ejemploMovimiento: Transaccion[] = [
    {
      idTransaccion: 1,
      contenido: {
        idUser: 12345,
        cuenta: {
          numeroCuenta: '1234567890',
          tarjetaDigital: '1111222233334444',
          CLABE: '123456789012345678',
          creditoAceptado: 10000.00,
          saldoDisponible: 7000.00,
          cargos: 3000.00
        },
        tipoCargo: true,
        monto: 250.00,
        lugar: 'Supermercado XYZ',
        fechaHora: new Date('2024-09-15T14:30:00Z'),
        status: 'Completada'
      }
    },
    {
      idTransaccion: 2,
      contenido: {
        idUser: 12345,
        cuenta: {
          numeroCuenta: '1234567890',
          tarjetaDigital: '1111222233334444',
          CLABE: '123456789012345678',
          creditoAceptado: 10000.00,
          saldoDisponible: 6750.00, // Asegúrate de ajustar el saldo si es necesario
          cargos: 3250.00 // Asegúrate de ajustar los cargos si es necesario
        },
        tipoCargo: false, // Supongamos que es un abono
        monto: 250.00,
        lugar: 'Depósito en Cajero Automático',
        fechaHora: new Date('2024-09-16T09:15:00Z'),
        status: 'Completada'
      }
    },
    {
      idTransaccion: 3,
      contenido: {
        idUser: 12345,
        cuenta: {
          numeroCuenta: '1234567890',
          tarjetaDigital: '1111222233334444',
          CLABE: '123456789012345678',
          creditoAceptado: 10000.00,
          saldoDisponible: 7000.00,
          cargos: 3000.00
        },
        tipoCargo: true, // Supongamos que es un cargo
        monto: 500.00,
        lugar: 'Compra en Línea',
        fechaHora: new Date('2024-09-17T11:45:00Z'),
        status: 'Completada'
      }
    }
  ];

  modalMovimiento(id:number){
    console.log(id);
    const movimiento = this.ejemploMovimiento.find(t => t.idTransaccion === id);
    const dialogData = {
      monto: movimiento?.contenido.monto,
      numeroCuenta: movimiento?.contenido.cuenta.numeroCuenta,
      tipoCargo: movimiento?.contenido.tipoCargo,
      lugar: movimiento?.contenido.lugar,
      fechaHora: movimiento?.contenido.fechaHora.toISOString(), // Convierte a string ISO
      status: movimiento?.contenido.status
    }
    this.matDialog.open(DatosMovimientoDialogComponent, {
      data: dialogData
    })

  }

}

type UsuarioBanco= {
  idUser: number,        // ID único del usuario
  nombre: string,        // Nombre del usuario
  apellido: string,      // Apellido del usuario
  user: string,         // Username del usuario
  cuenta: CuentaBanco   // Relación con la cuenta bancaria del usuario
};

type CuentaBanco = {
  numeroCuenta: string,     // Número de cuenta (PK)
  tarjetaDigital: string,     // Número de tarjeta digital
  CLABE: string,       // Clave Bancaria Estandarizada (CLABE)
  creditoAceptado: number,    // Crédito aceptado para la cuenta
  saldoDisponible: number,    // Saldo disponible en la cuenta (calculado)
  cargos: number,    // Monto disponible (crédito + saldo disponible)
};


type Transaccion = {
  idTransaccion: number,
  contenido: {
    idUser: number,
    cuenta: CuentaBanco,
    tipoCargo: boolean,
    monto: number,
    lugar: string,
    fechaHora: Date,
    status:string
  }
};
