import { TestBed } from '@angular/core/testing';

import { RecordsRepositoryService } from './records-repository.service';
import { Firestore } from '@angular/fire/firestore';
import { mock } from 'jest-mock-extended';

describe('RecordsRepositoryService', () => {
  let service: RecordsRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Firestore,
          useValue: mock(Firestore),
        },
      ],
    });
    service = TestBed.inject(RecordsRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
