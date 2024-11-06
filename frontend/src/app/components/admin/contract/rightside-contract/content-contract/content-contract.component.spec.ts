import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentContractComponent } from './content-contract.component';

describe('ContentContractComponent', () => {
  let component: ContentContractComponent;
  let fixture: ComponentFixture<ContentContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentContractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
