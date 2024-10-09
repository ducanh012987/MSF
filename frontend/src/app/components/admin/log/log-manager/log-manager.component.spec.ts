import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogManagerComponent } from './log-manager.component';

describe('LogManagerComponent', () => {
  let component: LogManagerComponent;
  let fixture: ComponentFixture<LogManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
