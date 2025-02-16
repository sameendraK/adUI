import { Component, EventEmitter, Output } from '@angular/core';
import { debounceTime, mergeMap, fromEvent, Observable, distinctUntilChanged } from 'rxjs'
import { SearchService } from 'src/services/search.service';
import { Record } from '../app.component';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Output()
  eTextChange: EventEmitter<Record[]> = new EventEmitter();

  constructor(
    public searchService: SearchService
  ) {

  }

  textChangeHandler(event: any) {
    const textInput = event.target;
    // fromEvent(textInput, 'keyup').pipe(debounceTime(600), distinctUntilChanged()).subscribe(() => {
    fromEvent(textInput, 'keyup').pipe(debounceTime(100)).subscribe(() => {
      const typedValue = (event.target).value;
      this.searchService.currentSearchString$.next(typedValue)
      let latestCharacterIsDelimiter: boolean = this.searchService.checkIfLastCharacterIsDelimiter(typedValue);
      if (!latestCharacterIsDelimiter) {
        this.searchService.delimiterBasedSearch(typedValue);
        // this.eTextChange.emit(searchResults);
      }
    })
  }

}
