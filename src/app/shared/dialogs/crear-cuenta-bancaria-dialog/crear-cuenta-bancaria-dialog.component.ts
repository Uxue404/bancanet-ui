import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-crear-cuenta-bancaria-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule],
  templateUrl: './crear-cuenta-bancaria-dialog.component.html',
  styleUrls: ['./crear-cuenta-bancaria-dialog.component.scss']
})
export class CrearCuentaBancariaDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:{id: string}
  ) { }

  ngOnInit(): void {
    console.warn(this.data.id)

  }

}
