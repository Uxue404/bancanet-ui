import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {
  DatosBancariosDialogComponent
} from "../../shared/dialogs/datos-bancarios-dialog/datos-bancarios-dialog.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule,MatDialogModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  activeModal: string | null = null;


  constructor(
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
  mostrarDatosBancarios(){
    this.matDialog.open(DatosBancariosDialogComponent, {
      data: {
        numCuenta: "14005777817",
        numTarjeta: "4189 2810 4954 0116",
        numCLABE: "072180010738307890"
      }

    })
  }
}
