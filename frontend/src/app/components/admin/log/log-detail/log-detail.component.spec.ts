import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogDetailComponent } from './log-detail.component';

describe('LogDetailComponent', () => {
  let component: LogDetailComponent;
  let fixture: ComponentFixture<LogDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
