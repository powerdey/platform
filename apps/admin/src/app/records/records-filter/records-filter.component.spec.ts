import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsFilterComponent } from './records-filter.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('RecordsFilterComponent', () => {
  let component: RecordsFilterComponent;
  let fixture: ComponentFixture<RecordsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordsFilterComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(RecordsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
