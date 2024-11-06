import { Component, OnInit } from '@angular/core';
import { PrimeModule } from '../../../../../modules/prime/prime.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-merchandise',
  standalone: true,
  imports: [PrimeModule, CommonModule],
  templateUrl: './detail-merchandise.component.html',
  styleUrl: './detail-merchandise.component.scss',
})
export class DetailMerchandiseComponent implements OnInit {
  customers: any[] = [];

  loading: boolean = true;

  ngOnInit(): void {
    this.loading = false;
  }
}
