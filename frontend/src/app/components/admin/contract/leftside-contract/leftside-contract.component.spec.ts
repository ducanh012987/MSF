import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftsideContractComponent } from './leftside-contract.component';

describe('LeftsideContractComponent', () => {
  let component: LeftsideContractComponent;
  let fixture: ComponentFixture<LeftsideContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftsideContractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftsideContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
