import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-datos-bancarios-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, MatButtonModule],
  templateUrl: './datos-bancarios-dialog.component.html',
  styleUrls: ['./datos-bancarios-dialog.component.scss']
})
export class DatosBancariosDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      numCuenta: string,
      numTarjeta: string,
      numCLABE: string
    }
  ) { }

  ngOnInit(): void {
  }

}
