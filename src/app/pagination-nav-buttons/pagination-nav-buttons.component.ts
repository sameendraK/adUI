import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-nav-buttons',
  templateUrl: './pagination-nav-buttons.component.html',
  styleUrls: ['./pagination-nav-buttons.component.scss']
})
export class PaginationNavButtonsComponent {
  @Input()
  count: number = 0;

  @Output()
  eButtonClicked:EventEmitter<string> = new EventEmitter()

  buttonClickHandler(event: any) {
   this.eButtonClicked.emit(event.target.innerText);
  }
}
