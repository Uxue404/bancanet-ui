import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-atencion-clientes-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './atencion-clientes-dialog.component.html',
  styleUrls: ['./atencion-clientes-dialog.component.scss']
})
export class AtencionClientesDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      titulo: string,
      contenido: string,
    }
  ) { }

  ngOnInit(): void {
  }

}
