import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseManagerComponent } from './use-manager.component';

describe('UseManagerComponent', () => {
  let component: UseManagerComponent;
  let fixture: ComponentFixture<UseManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UseManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
