import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptanceMerchandiseComponent } from './acceptance-merchandise.component';

describe('AcceptanceMerchandiseComponent', () => {
  let component: AcceptanceMerchandiseComponent;
  let fixture: ComponentFixture<AcceptanceMerchandiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptanceMerchandiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptanceMerchandiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
