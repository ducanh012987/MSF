import { Component } from '@angular/core';
import { LeftsideContractComponent } from '../leftside-contract/leftside-contract.component';
import { RightsideContractComponent } from '../rightside-contract/rightside-contract.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matHomeOutline } from '@ng-icons/material-icons/outline';

@Component({
  selector: 'app-contract-manager',
  standalone: true,
  imports: [
    RouterOutlet,
    LeftsideContractComponent,
    RightsideContractComponent,
    CommonModule,
    NgIconComponent,
  ],
  templateUrl: './contract-manager.component.html',
  styleUrl: './contract-manager.component.scss',
  providers: [
    provideIcons({
      matHomeOutline,
    }),
  ],
})
export class ContractManagerComponent {
  isActive = false; // Biến quản lý trạng thái
}
