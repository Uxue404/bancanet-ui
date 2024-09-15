import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "../../../../components/navbar/navbar.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor() { }

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

  movimiento: Transaccion[] = [
    {
      idTransaccion: 1,
      idUser: 1,
      cuenta: {
        numeroCuenta: '1234567890',
        tarjetaDigital: '1111-2222-3333-4444',
        CLABE: '123456789012345678',
        creditoAceptado: 10000.00,
        saldoDisponible: 7000.00,
        cargos: 10000.00
      },
      tipoCargo: true,
      monto: 3000.00,
      lugar: 'Supermercado A',
      fechaHora: new Date('2024-09-14T10:00:00')
    },
    {
      idTransaccion: 2,
      idUser: 1,
      cuenta: {
        numeroCuenta: '1234567890',
        tarjetaDigital: '1111-2222-3333-4444',
        CLABE: '123456789012345678',
        creditoAceptado: 10000.00,
        saldoDisponible: 7000.00,
        cargos: 10000.00
      },
      tipoCargo: false,
      monto: 200.00,
      lugar: 'Depósito',
      fechaHora: new Date('2024-09-14T15:00:00')
    }
  ];

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
  idTransaccion: number;       // ID de la transacción
  idUser: number;              // ID del usuario que realizó la transacción
  cuenta: CuentaBanco;         // Cuenta bancaria asociada a la transacción
  tipoCargo: boolean;          // true para cargo, false para abono
  monto: number;               // Monto de la transacción
  lugar: string;               // Lugar donde se realizó la transacción
  fechaHora: Date;             // Fecha y hora de la transacción
};
