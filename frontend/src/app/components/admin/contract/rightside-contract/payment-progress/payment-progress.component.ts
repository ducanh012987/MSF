import { Component, OnInit } from '@angular/core';
import { PrimeModule } from '../../../../../modules/prime/prime.module';

@Component({
  selector: 'app-payment-progress',
  standalone: true,
  imports: [PrimeModule],
  templateUrl: './payment-progress.component.html',
  styleUrl: './payment-progress.component.scss',
})
export class PaymentProgressComponent implements OnInit {
  customers: any[] = [];

  loading: boolean = true;

  ngOnInit(): void {
    this.loading = false;
  }
}
