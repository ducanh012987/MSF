import { Component, OnInit } from '@angular/core';
import { PrimeModule } from '../../../../../modules/prime/prime.module';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matAddOutline,
  matArrowBackOutline,
  matArrowForwardOutline,
  matDeleteForeverOutline,
  matFolderZipOutline,
  matSearchOutline,
} from '@ng-icons/material-icons/outline';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-contract',
  standalone: true,
  imports: [PrimeModule, NgIconComponent, CommonModule],
  templateUrl: './content-contract.component.html',
  styleUrl: './content-contract.component.scss',
  providers: [
    provideIcons({
      matSearchOutline,
      matAddOutline,
      matDeleteForeverOutline,
      matFolderZipOutline,
      matArrowForwardOutline,
      matArrowBackOutline,
    }),
  ],
})
export class ContentContractComponent implements OnInit {
  customers: any[] = [
    {
      id: 1,
      name: 'James Butt',
      country: {
        name: 'Algeria',
        code: 'dz',
      },
      company: 'Benton, John B Jr',
      date: '2015-09-13',
      status: 'unqualified',
      verified: true,
      activity: 17,
      representative: {
        name: 'Ioni Bowcher',
        image: 'ionibowcher.png',
      },
      balance: 70663,
    },
    {
      id: 2,
      name: 'Josephine Darakjy',
      country: {
        name: 'Egypt',
        code: 'eg',
      },
      company:
        'Chanay, Jeffrey A Esq, loạnabfhbfjbdfbsndf snmd fnmsd fsdnbfsdfbsdsd fbsjfbsf',
      date: '2019-02-09',
      status: 'proposal',
      verified: true,
      activity: 0,
      representative: {
        name: 'Amy Elsner',
        image: 'amyelsner.png',
      },
      balance: 82429,
    },
    {
      id: 3,
      name: 'Art Venere',
      country: {
        name: 'Panama',
        code: 'pa',
      },
      company: 'Chemel, James L Cpa',
      date: '2017-05-13',
      status: 'qualified',
      verified: false,
      activity: 63,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      balance: 28334,
    },
    {
      id: 3,
      name: 'Art Venere',
      country: {
        name: 'Panama',
        code: 'pa',
      },
      company: 'Chemel, James L Cpa',
      date: '2017-05-13',
      status: 'qualified',
      verified: false,
      activity: 63,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      balance: 28334,
    },
    {
      id: 3,
      name: 'Art Venere',
      country: {
        name: 'Panama',
        code: 'pa',
      },
      company: 'Chemel, James L Cpa',
      date: '2017-05-13',
      status: 'qualified',
      verified: false,
      activity: 63,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      balance: 28334,
    },
    {
      id: 3,
      name: 'Art Venere',
      country: {
        name: 'Panama',
        code: 'pa',
      },
      company: 'Chemel, James L Cpa',
      date: '2017-05-13',
      status: 'qualified',
      verified: false,
      activity: 63,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      balance: 28334,
    },
    {
      id: 3,
      name: 'Art Venere',
      country: {
        name: 'Panama',
        code: 'pa',
      },
      company: 'Chemel, James L Cpa',
      date: '2017-05-13',
      status: 'qualified',
      verified: false,
      activity: 63,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      balance: 28334,
    },
    {
      id: 3,
      name: 'Art Venere',
      country: {
        name: 'Panama',
        code: 'pa',
      },
      company: 'Chemel, James L Cpa',
      date: '2017-05-13',
      status: 'qualified',
      verified: false,
      activity: 63,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      balance: 28334,
    },
  ];

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
