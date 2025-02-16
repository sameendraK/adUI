import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { PaginationModule } from './pagination/pagination.module';
import { PaginationNavButtonsComponent } from './pagination-nav-buttons/pagination-nav-buttons.component';
import { PaginationNavButtonsModule } from './pagination-nav-buttons/pagination-nav-buttons.module';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchBarModule } from './search-bar/search-bar.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PaginationModule,
    FormsModule,
    SearchBarModule,
    PaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
