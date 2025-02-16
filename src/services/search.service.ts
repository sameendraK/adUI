import { Injectable } from '@angular/core';
import { DataStoreService } from './data-store.service';
import { Record } from 'src/app/app.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private dataStoreService: DataStoreService,
    private apiService: ApiService
  ) {
    this.apiService.results$.subscribe((res: any) => {
      this.searchResults$.next(res)
    })
    this.dataStoreService.handleSearchAfterDelete$.subscribe((res) => {
      this.handleSearchAfterDelete();
    })
  }

  delimiterList: string[] = ['@', '$'];

  latestDelimiter: string = '';

  delimiterSearchMap = { '@': 'email', '$': 'role' };

  delimitersInInputString: string[] = [];

  searchResults$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  currentSearchString$: BehaviorSubject<string> = new BehaviorSubject<string>('');


  //checks if the first character is included in the given list of delimiters.

  handleSearchAfterDelete() {
    let typedValue: any = this.currentSearchString$.value;
    if (typedValue) {
      let latestCharacterIsDelimiter: boolean = this.checkIfLastCharacterIsDelimiter(typedValue);
      if (!latestCharacterIsDelimiter) {
        this.delimiterBasedSearch(typedValue);
        // this.eTextChange.emit(searchResults);
      }
    }
  }

  checkIfLastCharacterIsDelimiter(inputString: string) {
    let delimiterInCurrentString: string = '';
    if (this.delimiterList.includes(inputString[inputString.length - 1])) {
      this.latestDelimiter = inputString[inputString.length - 1];
      return true;
    }
    else {
      for (let i = 0; i < inputString.length; i++) {
        let currentChar = inputString[i];
        if (this.delimiterList.includes(currentChar)) {
          delimiterInCurrentString = currentChar;
          this.latestDelimiter = currentChar;
        }
        if (!delimiterInCurrentString) {
          this.latestDelimiter = '';
        }

      }
    }
    return false;
  }

  //used to get all the delimiters in array.
  getDelimitersInInputString(inputString: string): string[] {
    let delimitersInInputString: any[] = [];
    for (let char = 0; char < inputString.length; char++) {
      let currentChar = inputString[char];
      if (this.delimiterList.includes(currentChar)) {
        delimitersInInputString.push(currentChar);
      }
    }
    return delimitersInInputString;
  }

  checkInputStringLength(typedValue: string): boolean {
    return typedValue.length > 1 ? true : false;
  }

  //the search method
  delimiterBasedSearch(inputString: string) {
    let searchForProperty: string = this.nameOfSearchProperty();
    // let delmitersInArray = this.getDelimitersInInputString(inputString);
    let searchString = this.getSearchString(inputString);
    this.dataStoreService.getRecordsToDisplay();
    let results = this.dataStoreService.recordsToDisplay.filter((i: Record) => {
      let propertyValue: string = i[searchForProperty as keyof Record] as string;
      return propertyValue.toUpperCase().includes(searchString.toUpperCase());
    })

    this.searchResults$.next(results);
    // return results;
  }

  //extracting the search string by removing the delimiters.
  getSearchString(inputString: string) {
    // if()
    let arrayOfDelimitersInString = this.getDelimitersInInputString(inputString);
    if (arrayOfDelimitersInString.length > 0) {
      let delimiterCountInString = arrayOfDelimitersInString.length;
      let latestDelimiter = arrayOfDelimitersInString[delimiterCountInString - 1];
      // ? this.delimitersInInputString[delimiterCountInString - 1] : '';
      let latestDelimiterPosition: number = 0;
      let inputStringLength = inputString.length;
      if (latestDelimiter.length > 0) {
        latestDelimiterPosition = inputString.lastIndexOf(latestDelimiter) + 1;
      }
      return inputString.slice(latestDelimiterPosition, inputStringLength);
    }
    return inputString;
  }

  //this method returns the property on whicih the search has to be done. (@ seraches email, $ for role).
  nameOfSearchProperty(): string {
    switch (this.latestDelimiter) {
      case '@':
        return 'email';
      case '$':
        return 'role'
      default:
        return 'name';
    }
  }



}
