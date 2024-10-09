import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {EliminarUsuarioIdService} from "../../../core/services/eliminar-usuario-id.service";

@Component({
  selector: 'app-confirmar-eliminar-usuario-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './confirmar-eliminar-usuario-dialog.component.html',
  styleUrls: ['./confirmar-eliminar-usuario-dialog.component.scss']
})
export class ConfirmarEliminarUsuarioDialogComponent implements OnInit {
  showAlertSuccess: boolean = false;
  showAlertError: boolean = false;
  showAlertWarning: boolean = false;
  usuarioEliminado: boolean = false
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: string},
    private loaderService: NgxUiLoaderService,
    private deleteUsers: EliminarUsuarioIdService

  ) { }

  ngOnInit(): void {
    //console.warn(this.data.id)
  }

  eliminarUsuario(id: string): void {
    this.resetAlerts()
    this.loaderService.start()
    this.deleteUsers.eliminarUsuarioId(id).subscribe(
      (res) => {
        this.showAlertSuccess = true
        this.loaderService.stop()
        console.log("Usuario Eliminado")
        this.usuarioEliminado = true
      },
      (error) => {
        this.loaderService.stop()
        this.showAlertError = true
        console.error("Error al eliminar al usuario")
      }
    )

  }

  resetAlerts(){
    this.showAlertSuccess = false;
    this.showAlertError = false;
    this.showAlertWarning = false;
  }

}
