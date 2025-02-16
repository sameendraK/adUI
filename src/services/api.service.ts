import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Record } from 'src/app/app.component';
import { DataStoreService } from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  urlPath: string = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  results$: Subject<any[]> = new Subject<any[]>;

  apiResponse: boolean = false;


  constructor(
    public http: HttpClient,
    public dataStoreService: DataStoreService) {

  }

  get(): Observable<any> {
    return this.http.get(this.urlPath);
  }

  fetchRecords(): void {
    this.getRecords().subscribe((res) => {
      this.apiResponse = true;
      this.dataStoreService.transformBackendResponse(res);
      this.emitFetchedRecords(res);
    });
  }

  emitFetchedRecords(res: Record[]) {
    this.results$.next(res);
  }

  getRecordsSubject(): Subject<any[]> {
    return this.results$;
  }

  getRecords(): Observable<any[]> {
    return this.http.get<any[]>(this.urlPath);
  }

  delete() {
    let recordsToDisplay = this.dataStoreService.results.filter((i: Record) => {
      if (i.isChecked) {
        this.dataStoreService.deletedRecords.push(i);
      }
      return !i.isChecked;
    })
    
    //we wrote handleSearchAfterDelete after publishing the results as if we publish it after handleSearchAfterDelete, it shows the records to the user even if searched terms are deleted For ex: if we delete all admins (using delimiter based search), we still show member roles to the user as we are not handling updated data.So, as it doesn't know, it shows the other values. Hence, don't swap the below two lines.
    this.results$.next(recordsToDisplay);
    this.dataStoreService.handleSearchAfterDelete$.next(true);
  }


}
