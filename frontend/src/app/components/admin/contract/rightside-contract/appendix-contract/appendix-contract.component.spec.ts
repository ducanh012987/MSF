import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppendixContractComponent } from './appendix-contract.component';

describe('AppendixContractComponent', () => {
  let component: AppendixContractComponent;
  let fixture: ComponentFixture<AppendixContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppendixContractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppendixContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
