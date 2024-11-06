import { Component } from '@angular/core';
import { PrimeModule } from '../../../../../modules/prime/prime.module';

@Component({
  selector: 'app-liquidation-contract',
  standalone: true,
  imports: [PrimeModule],
  templateUrl: './liquidation-contract.component.html',
  styleUrl: './liquidation-contract.component.scss',
})
export class LiquidationContractComponent {}
