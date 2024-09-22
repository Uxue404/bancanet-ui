import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-token-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './token-dialog.component.html',
  styleUrls: ['./token-dialog.component.scss']
})
export class TokenDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
