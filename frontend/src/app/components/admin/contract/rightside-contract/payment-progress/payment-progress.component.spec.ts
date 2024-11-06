import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentProgressComponent } from './payment-progress.component';

describe('PaymentProgressComponent', () => {
  let component: PaymentProgressComponent;
  let fixture: ComponentFixture<PaymentProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
