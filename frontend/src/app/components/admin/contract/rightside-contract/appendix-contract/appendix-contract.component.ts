import { Component, OnInit } from '@angular/core';
import { PrimeModule } from '../../../../../modules/prime/prime.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appendix-contract',
  standalone: true,
  imports: [PrimeModule, CommonModule],
  templateUrl: './appendix-contract.component.html',
  styleUrl: './appendix-contract.component.scss',
})
export class AppendixContractComponent implements OnInit {
  customers: any[] = [];

  loading: boolean = true;

  ngOnInit(): void {
    this.loading = false;
  }
}
