import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationNavButtonsComponent } from './pagination-nav-buttons.component';



@NgModule({
  declarations: [PaginationNavButtonsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationNavButtonsComponent
  ]
})
export class PaginationNavButtonsModule { }
