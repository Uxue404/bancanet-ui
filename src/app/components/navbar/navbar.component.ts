import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  activeModal: string | null = null;

  // Método para abrir el modal
  openModal(modalId: string) {
    this.activeModal = modalId;
  }

  // Método para cerrar el modal
  closeModal() {
    this.activeModal = null;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
