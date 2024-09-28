import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ObtenerUsuariosNameService, User} from "../../../../../core/services/obtener-usuarios-name.service";
import {AuthService} from "../../../../../core/services/auth.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {debounce, debounceTime, distinctUntilChanged, switchMap} from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatInputModule, MatPaginatorModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private token = this.authService.getToken();
  search: FormGroup;
  dataSource = new MatTableDataSource<User>([])
  displayedColumns: string[] = ['name','email','phoneNumber']
  total: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator


  constructor(
    private usersService: ObtenerUsuariosNameService,
  private authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.search = this.fb.group({
      name: [''],
      email: [''],
      phoneNumber: ['']
    })
  }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(formValue => this.usersService.searchUsers(
        formValue.name,
        formValue.email,
        formValue.phoneNumber
      ))
    ).subscribe(this.handleResponse.bind(this))
    this.loadUsers()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

  loadUsers(page: number = 1, limit: number = 10) {
    const formValue = this.search.value;
    this.usersService.searchUsers(
      formValue.name,
      formValue.email,
      formValue.phoneNumber,
      page,
      limit
    ).subscribe(this.handleResponse.bind(this));
  }



}
