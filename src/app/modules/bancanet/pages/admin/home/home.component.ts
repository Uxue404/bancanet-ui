import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ObtenerUsuariosNameService, User} from "../../../../../core/services/obtener-usuarios-name.service";
import {AuthService} from "../../../../../core/services/auth.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {debounce, debounceTime, distinctUntilChanged, switchMap} from "rxjs";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {CrearUsuarioComponent} from "../../../../../shared/dialogs/crear-usuario-dialog/crear-usuario.component";
import {
  EditarUsuarioDialogComponent
} from "../../../../../shared/dialogs/editar-usuario-dialog/editar-usuario-dialog.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatInputModule, MatPaginatorModule, ReactiveFormsModule, MatIconModule, MatMenuModule,MatDialogModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private token = this.authService.getToken();
  search = new FormControl('');
  dataSource = new MatTableDataSource<User>([])
  displayedColumns: string[] = ['name','lastName', 'email', 'actions'];
  name: string | null = ''
  total: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator


  constructor(
    private usersService: ObtenerUsuariosNameService,
    private authService: AuthService,
    private fb: FormBuilder,
    private matDialog: MatDialog,
  ) {  }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.search.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query =>{
        const fielType = this.usersService.detectFielType(query || '');

        return this.usersService.searchUsers(query || '',fielType)
      })
    ).subscribe(this.handleResponse.bind(this));
    this.loadUsers(1, 5)
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator; // Asigna el paginador
    this.loadUsers(1, 5); // Carga usuarios después de que el paginador esté listo
  }

  logout(){
    this.authService.logout();
  }
  handleResponse(response: any) {
    this.dataSource.data = response.result.users;
    this.total = response.result.total;
    this.paginator.length = this.total;
    this.paginator.pageIndex = response.result.page - 1;
  }

  onPageChange(event: any) {
    this.loadUsers(event.pageIndex + 1, event.pageSize);
  }

  loadUsers(page: number, limit: number) {
    const searchValue = this.search.value || '';
    const fieldType = this.usersService.detectFielType(searchValue);
    this.usersService.searchUsers(searchValue,fieldType,page,limit)
      .subscribe(this.handleResponse.bind(this))

  }

  crearUsuario(){
    const dialogRef = this.matDialog.open(CrearUsuarioComponent, {
      width: '90%'
    })

    dialogRef.afterClosed().subscribe(r =>{
      this.loadUsers(this.paginator.pageIndex +1, this.paginator.pageSize)
    })
  }

  editarUsuario(idUser: string){
    // console.warn('idUser: ' + idUser)
    const dialogRef = this.matDialog.open(EditarUsuarioDialogComponent,{
      width: '90%',
      data:{
        id: idUser
      }
    })

    dialogRef.afterClosed().subscribe(r =>{
      this.loadUsers(this.paginator.pageIndex +1, this.paginator.pageSize)
    })
  }




}
