import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-datos-movimiento-dialog',
  standalone: true,
  imports: [CommonModule,MatDialogModule, MatButtonModule],
  templateUrl: './datos-movimiento-dialog.component.html',
  styleUrls: ['./datos-movimiento-dialog.component.scss']
})
export class DatosMovimientoDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {

  }

}
