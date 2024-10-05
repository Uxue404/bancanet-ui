import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ObtenerUsuarioIdService} from "../../../core/services/obtener-usuario-id.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {EditarUsuarioService} from "../../../core/services/editar-usuario.service";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-editar-usuario-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './editar-usuario-dialog.component.html',
  styleUrls: ['./editar-usuario-dialog.component.scss']
})
export class EditarUsuarioDialogComponent implements OnInit {
  showAlertSuccess: boolean = false;
  showAlertError: boolean = false;
  showAlertWarning: boolean = false;
  usuario: any
  form = new FormGroup<formType>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    })

  })
  constructor(
    private getUsers: ObtenerUsuarioIdService,
    private editUser: EditarUsuarioService,
    private loaderService: NgxUiLoaderService,
    @Inject(MAT_DIALOG_DATA) public data: {id:string}
  ) { }

  ngOnInit(): void {

    this.getUsers.obtenerUsuarioId(this.data.id).subscribe({
      next: (userData) =>{
        this.usuario = userData.result;
        // console.log(this.usuario);
        this.form.patchValue({
          name: this.usuario.name,
          lastName: this.usuario.lastName
        })
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }

  obtenerChambiosInput() {
    const cambios: any= {};
    Object.keys(this.form.controls).forEach(key =>{
      if (this.form.get(key)?.value !== this.usuario[key]){
        cambios[key] = this.form.get(key)?.value;
      }
    });
    return cambios;
  }

  editarUsuario() {
    if (this.form.valid) {
      this.loaderService.start()
      const changes = this.obtenerChambiosInput();
      if (Object.keys(changes).length > 0) {
        this.editUser.editarUsuario(this.data.id, changes).subscribe({
          next: (response) => {
            this.loaderService.stop()
            this.showAlertSuccess = true

            // console.log('Usuario actualizado', response);

          },
          error: (error) => {
            this.loaderService.stop()
            this.showAlertError = true
            // console.error('Error al actualizar usuario', error);
          }
        });
      } else {
        console.log('No hay cambios para actualizar');
        this.showAlertWarning = true
      }
    }
  }
  get ctrlLastName() {
    return this.form.controls.lastName;
  }

  get ctrlName() {
    return this.form.controls.name;
  }

}





type formType = {
  name: FormControl<string>,
  lastName: FormControl<string>
}

