import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationNavButtonsComponent } from './pagination-nav-buttons.component';

describe('PaginationNavButtonsComponent', () => {
  let component: PaginationNavButtonsComponent;
  let fixture: ComponentFixture<PaginationNavButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationNavButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationNavButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
