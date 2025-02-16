import { Injectable } from '@angular/core';
import { Record } from 'src/app/app.component';
import { SearchService } from './search.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DataStoreService } from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  rowsPerPage: number = 10;
  startIndex: number = 0;
  searchResults: any;
  currentPage: number = 1;
  currentPage$: BehaviorSubject<number> = new BehaviorSubject(1)

  constructor(
    private searchService: SearchService,
    private dataStoreService: DataStoreService
  ) {
    this.searchService.searchResults$.subscribe((res: Record[]) => {
      this.searchResults = res;
      // this.currentPage$.next(1);
    })
    this.currentPage$.subscribe((res) => {
      this.currentPage = res;
    })

  }

  getPaginatedResults(results?: any) {
    if (results && results.length > 0) {
      let startIndex = (this.currentPage - 1) * 10;
      let endIndex = (this.currentPage * this.rowsPerPage);
      if (startIndex >= results.length) {
        startIndex = (this.currentPage - 2) * 10;
      }
      return results.slice(startIndex, endIndex);
    }
    else {
      this.searchService.searchResults$.next(this.searchResults);
    }
  }

}
