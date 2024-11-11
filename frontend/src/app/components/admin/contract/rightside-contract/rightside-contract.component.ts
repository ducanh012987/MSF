import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matAddOutline,
  matCancelOutline,
  matDeleteForeverOutline,
  matLocalPrintshopOutline,
  matSaveAltOutline,
  matTaskOutline,
} from '@ng-icons/material-icons/outline';
import { PrimeModule } from '../../../../modules/prime/prime.module';
import { ContentContractComponent } from './content-contract/content-contract.component';
import { AppendixContractComponent } from './appendix-contract/appendix-contract.component';
import { AcceptanceMerchandiseComponent } from './acceptance-merchandise/acceptance-merchandise.component';
import { DetailMerchandiseComponent } from './detail-merchandise/detail-merchandise.component';
import { LiquidationContractComponent } from './liquidation-contract/liquidation-contract.component';
import { OriginalContractComponent } from './original-contract/original-contract.component';
import { PaymentProgressComponent } from './payment-progress/payment-progress.component';

@Component({
  selector: 'app-rightside-contract',
  standalone: true,
  imports: [
    NgIconComponent,
    PrimeModule,
    ContentContractComponent,
    AppendixContractComponent,
    AcceptanceMerchandiseComponent,
    DetailMerchandiseComponent,
    LiquidationContractComponent,
    OriginalContractComponent,
    PaymentProgressComponent,
  ],
  templateUrl: './rightside-contract.component.html',
  styleUrl: './rightside-contract.component.scss',
  providers: [
    provideIcons({
      matAddOutline,
      matSaveAltOutline,
      matCancelOutline,
      matDeleteForeverOutline,
      matTaskOutline,
      matLocalPrintshopOutline,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RightsideContractComponent {
  @ViewChild(ContentContractComponent)
  formContentContractComponent!: ContentContractComponent;
  isEditing = false;

  onSave(): void {
    if (this.formContentContractComponent) {
      this.formContentContractComponent.validateForm();
      this.formContentContractComponent.validateRequiredFields();
    }
  }

  addNewItem() {
    this.isEditing = true;
    this.formContentContractComponent.resetForm();
  }

  cancelEdit() {
    this.isEditing = false;
    this.formContentContractComponent.resetForm();
  }
}
