import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightsideContractComponent } from './rightside-contract.component';

describe('RightsideContractComponent', () => {
  let component: RightsideContractComponent;
  let fixture: ComponentFixture<RightsideContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightsideContractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightsideContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
