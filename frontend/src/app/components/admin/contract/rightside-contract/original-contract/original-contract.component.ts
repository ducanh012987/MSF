import { Component, OnInit } from '@angular/core';
import { PrimeModule } from '../../../../../modules/prime/prime.module';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matFolderZipOutline,
  matSearchOutline,
} from '@ng-icons/material-icons/outline';

@Component({
  selector: 'app-original-contract',
  standalone: true,
  imports: [PrimeModule, NgIconComponent],
  templateUrl: './original-contract.component.html',
  styleUrl: './original-contract.component.scss',
  providers: [
    provideIcons({
      matSearchOutline,
      matFolderZipOutline,
    }),
  ],
})
export class OriginalContractComponent implements OnInit {
  customers: any[] = [];

  selectedCustomers!: any[];
  loading: boolean = true;

  visible: boolean = false;

  first: number = 0;

  rows: number = 10;

  ngOnInit(): void {
    this.loading = false;
  }

  validateInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Loại bỏ các ký tự không phải là số
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  showDialog() {
    this.visible = true;
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
