import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-formulario-transferencia-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './formulario-transferencia-dialog.component.html',
  styleUrls: ['./formulario-transferencia-dialog.component.scss']
})
export class FormularioTransferenciaDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
