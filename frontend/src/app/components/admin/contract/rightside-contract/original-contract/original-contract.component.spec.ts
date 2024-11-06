import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginalContractComponent } from './original-contract.component';

describe('OriginalContractComponent', () => {
  let component: OriginalContractComponent;
  let fixture: ComponentFixture<OriginalContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OriginalContractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OriginalContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
