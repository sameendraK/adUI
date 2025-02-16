import { Injectable } from '@angular/core';
import { Record } from '../app/app.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaginationService } from './pagination.service';
@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  results: Record[] = [];
  recordsSubject: BehaviorSubject<Record[]> = new BehaviorSubject<Record[]>([]);
  recordsToDisplay: Record[] = [];
  deletedRecords: Record[] = [];

  searchResults$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  handleSearchAfterDelete$: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(
  ) {
  }

  transformBackendResponse(res: Record[]) {
    res.map((i: Record) => {
      i['isEditable'] = false;
      i['isDeleted'] = false;
      i['isChecked'] = false;
    })
  }

  getRecordsToDisplay() {
    this.recordsToDisplay = this.results.filter(item => !this.deletedRecords.includes(item));
    return this.recordsToDisplay;
  }

}

export interface ResponseTracker {
  results: Record[],
  fromSearch: boolean;
}