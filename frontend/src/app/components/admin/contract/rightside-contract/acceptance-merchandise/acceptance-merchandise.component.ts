import { Component, OnInit } from '@angular/core';
import { PrimeModule } from '../../../../../modules/prime/prime.module';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matAddOutline,
  matDeleteForeverOutline,
} from '@ng-icons/material-icons/outline';

@Component({
  selector: 'app-acceptance-merchandise',
  standalone: true,
  imports: [PrimeModule, CommonModule, NgIconComponent],
  templateUrl: './acceptance-merchandise.component.html',
  styleUrl: './acceptance-merchandise.component.scss',
  providers: [
    provideIcons({
      matAddOutline,
      matDeleteForeverOutline,
    }),
  ],
})
export class AcceptanceMerchandiseComponent implements OnInit {
  customers: any[] = [];

  loading: boolean = true;

  ngOnInit(): void {
    this.loading = false;
  }
}
