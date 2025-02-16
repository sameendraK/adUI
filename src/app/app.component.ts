import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from 'src/services/api.service';
import { DataStoreService } from 'src/services/data-store.service';
import { PaginationService } from 'src/services/pagination.service';
import { SearchService } from 'src/services/search.service';
import { DialogComponent } from './dialog/dialog.component';
// import {Roles}
export interface Record {
  id: number;
  name: string;
  email: string;
  role: string;
  isEditable: boolean;
  isDeleted: boolean;
  isChecked: boolean;
  staggedForDelete: boolean;
}

enum Roles {
  admin = 'admin'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  admin: string = Roles.admin;
  results: Array<any> = [];
  startIndex: number = this.paginationService.startIndex;
  resultsToShow: any[] = [];
  showEditAndDeleteButtons: boolean = true;
  rowsPerPage: number = this.paginationService.rowsPerPage;
  masterSelected: boolean = false; // Track master checkbox state
  deletedRecords: Record[] = [];
  filteredRecords: Record[] = []
  noRecordsFound: boolean = false;
  component: any;

  constructor(
    public apiService: ApiService,
    public dataStoreService: DataStoreService,
    public paginationService: PaginationService,
    public searchService: SearchService
  ) {
    // this.fetch();


  }

  ngOnInit() {
    this.apiService.fetchRecords();
    this.searchService.searchResults$.subscribe((results: any) => {
      this.searchHandler(results);
    })
    this.apiService.results$.subscribe((results: any) => {
      this.dataStoreService.results = results;
      this.resultsToShow = this.paginationService.getPaginatedResults(results);
    });
    this.dataStoreService.handleSearchAfterDelete$.subscribe(res => this.masterCheckboxChange())
  }

  title = 'adminUI';

  masterCheckboxChange() {
    this.resultsToShow.forEach(record => {
      record.isChecked = this.masterSelected;
    });
  }

  individualCheckboxChange() {
    this.masterSelected = this.resultsToShow.every(record => record.isChecked);
  }



  clickHandler(event: any) {
    this.resultsToShow = this.dataStoreService.results.slice(this.rowsPerPage, (event.target.value * 10));
  }

  //need to check if this can be moved into a method.
  paginationButtonClickedHandler(values: any) {
    this.resultsToShow = values;
  }

  editButtonClickHandler(record: Record) {
    record.isEditable = !record.isEditable;
  }

  // need to check
  confirmDeleteClickHandler(event: any, record: Record) {
    this.apiService.delete();
    this.showEditAndDeleteButtons = true;
  }

  cancelDeleteClickHandler(event: any, record: Record) {
    this.showEditAndDeleteButtons = true;
    record.staggedForDelete = false;
  }

  singleItemDeleteClickHandler(record: Record) {
    //we are using the staggedForDelete flag so that, when we check the checkbox and then click on delete, then the confirmation must come. As of now, if we don't use this flag, whenever we click on the checkbox, the 'tick' & 'cancel' buttons appear.

    // this.showEditAndDeleteButtons = false;
    record.staggedForDelete = true;
    console.log(record)

  }

  //handled from searchService file. 
  searchHandler(results: Record[]) {
    if (results.length > 0) {
      this.resultsToShow = this.paginationService.getPaginatedResults(results);
      this.noRecordsFound = false;
    }
    else if (this.apiService.apiResponse && results.length == 0) {
      this.noRecordsFound = true;
    }
  }
}
