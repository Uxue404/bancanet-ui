import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "../../../../components/navbar/navbar.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
