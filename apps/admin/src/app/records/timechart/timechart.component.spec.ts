import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimechartComponent } from './timechart.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('TimechartComponent', () => {
  let component: TimechartComponent;
  let fixture: ComponentFixture<TimechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimechartComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(TimechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
