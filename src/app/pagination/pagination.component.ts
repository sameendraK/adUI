import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { DataStoreService } from 'src/services/data-store.service';
import { PaginationService } from 'src/services/pagination.service';
import { Record } from '../app.component';
import { SearchService } from 'src/services/search.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Output()
  eKeyDown: EventEmitter<any> = new EventEmitter()

  @Output()
  eButtonClicked: EventEmitter<any> = new EventEmitter();

  @Output()
  eDeleteSelected: EventEmitter<any> = new EventEmitter();

  @Input()
  numberOfResults: number = 0;


  buttonsCount: any;
  buttonsCoutArray: number[] = [];
  newArray: any[] = [];
  actualTotalResults: number = 0;
  deletedNamesList: string = '';
  deletedCount: number = 0;

  ngOnChanges() {
    for (let i = 0; i < this.buttonsCount; i++) {
      this.buttonsCoutArray.push(i);
    }
  }


  constructor(
    public dataStoreServce: DataStoreService,
    public paginationService: PaginationService,
    public apiService: ApiService,
    private searchService: SearchService
  ) {
  }

  ngOnInit() {
    this.paginationService.currentPage$.subscribe((res) => {
      this.currentPageNumber = res;
    })
    this.apiService.results$.subscribe((res: Record[]) => {
      this.actualTotalResults = res.length;
      let count = Math.ceil(res.length / this.paginationService.rowsPerPage);
      this.newArray = [];
      for (let i = 0; i < count; i++) {
        this.newArray.push(i);
      }
    })
    this.searchService.searchResults$.subscribe((res) => {
      let count = Math.ceil(res.length / this.paginationService.rowsPerPage);
      this.newArray = [];
      this.checkPaginationNavButtons(count);
      for (let i = 0; i < count; i++) {
        this.newArray.push(i);
      }
      this.deletedCount = this.dataStoreServce.deletedRecords.length;
    })
  }

  lastPageButtonClickHandler(buttonNumber: number) {
    this.buttonClickHandler(buttonNumber);
  }

  firsPageButtonClickHandler(buttonNumber: number) {
    this.buttonClickHandler(buttonNumber)
  }

  nextPageClickHandler($event: any) {
    this.paginationService.currentPage$.next(this.currentPageNumber + 1);
    this.buttonClickHandler(this.currentPageNumber);
  }

  previousPageClickHandler($event: any) {
    this.paginationService.currentPage$.next(this.currentPageNumber - 1);
    this.buttonClickHandler(this.currentPageNumber);
  }

  checkPaginationNavButtons(count: number) {
    if (count > 1) {
      this.isLastPage = false;
      this.isFirstPage = true;
    }
    else if (count <= 1) {
      this.isFirstPage = true;
      this.isLastPage = true;
    }
  }

  rowsPerPage: number = 10;
  isFirstPage: boolean = true;
  isLastPage: boolean = false;
  currentPageNumber: number = 1;

  buttonClickHandler(buttonNumber: any) {
    //we need to track the currentPage inorder to maintain correct enabling and disabling of nav buttons. 
    this.currentPageNumber = buttonNumber;
    this.paginationService.currentPage$.next(buttonNumber);
    if (buttonNumber === 1) {
      this.isFirstPage = true;
    }
    else {
      this.isFirstPage = false;
    }
    if (this.newArray.length === buttonNumber) {
      this.isLastPage = true;
    }
    else {
      this.isLastPage = false;
    }
    this.paginationService.getPaginatedResults(+buttonNumber);
  }

  bulkDeleteClickHandler(event: any) {
    this.apiService.delete();
    if (this.currentPageNumber > Math.ceil((this.actualTotalResults - this.dataStoreServce.deletedRecords.length) / 10)) {
      if (this.currentPageNumber != 1) {
        this.currentPageNumber -= 1;
      }
      this.paginationService.currentPage$.next(this.currentPageNumber);
    }
  }

  showDeletedRecordsClickHandler($event: any) {
    (this.dataStoreServce.deletedRecords.forEach((i) => {
      this.deletedNamesList = this.deletedNamesList + '\n' + i.name
    }));
    this.deletedNamesList.length > 0 ?
      window.alert(this.deletedNamesList) :
      '';
  }
}
