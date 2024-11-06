import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboarbComponent } from './dashboarb.component';

describe('DashboarbComponent', () => {
  let component: DashboarbComponent;
  let fixture: ComponentFixture<DashboarbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboarbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboarbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
