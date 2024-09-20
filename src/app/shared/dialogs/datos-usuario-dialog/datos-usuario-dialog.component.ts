import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-datos-usuario-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './datos-usuario-dialog.component.html',
  styleUrls: ['./datos-usuario-dialog.component.scss']
})
export class DatosUsuarioDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:{
      nomUsuario: string,
      fechaNacimiento: string,
      correo: string,
      telefono: string
    }
  ) { }

  ngOnInit(): void {
  }

}
