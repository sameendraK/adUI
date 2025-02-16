import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { PaginationNavButtonsModule } from '../pagination-nav-buttons/pagination-nav-buttons.module';

@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    PaginationNavButtonsModule
  ],
  exports: [
    PaginationComponent
  ]
})
export class PaginationModule { }
