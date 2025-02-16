# AdminUI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


These are the requirements :

1. ~~Column titles must stand out from the entries.~~
2. ~~There should be a search bar that can filter on any property.~~
3. You should be able to edit or delete rows in place.(There is no expectation of persistence. Edit and delete are expected to only happen in memory.)
4. ~~You need to implement pagination: Each page contains 10 rows. Buttons at the bottom allow you to jump to any page including special buttons for first page, previous page, next page and last page. Pagination must update based on search/filtering. If there are 25 records for example that match a search query, then pagination buttons should only go till 3.~~
5. ~~ You should be able to select one or more rows. A selected row is highlighted with a grayish background color. Multiple selected rows can be deleted at once using the 'Delete Selected' button at the bottom left.~~
6. ~~ Checkbox on the top left is a shortcut to select or deselect all displayed rows. This should only apply to the ten rows displayed in the current page, and not all 50 rows.~~

Instructions to Pass Automated Correctness Check

1. ~~Search box placeholder text should start with Search.~~
2. ~~Search icon/button should have class as search-icon OR trigger search on ENTER.~~
3. ~~Action element must be a button with a specific class name like edit, delete, save.~~
4. ~~ page numbers should be mentioned accordingly.~~
5. ~~ On  Navigation elements must be a div/button, and should have class name as first-page, previous-page, next-page and last-page andclicking edit action in a row, it should be editable in the row itself.~~
6. ~~Bottom delete button must have text Delete Selected.~~
7. ~~Avoid using libraries like material UI and bootstrap for basic html components like buttons, checkboxes, textbox etc.~~
8. ~~We execute your application and run it on a specific port. This helps us in running automated tests against the UI you have developed. Hence please do not force the application to run on any specific ports in your configuration/package manager file. Please ensure that you are not overriding the PORT environment variable in your configuration/package manager file.~~
9. On executing, your application should be running successfully on http://<hostname>:<port>. For e.g if the hostname of your local system is dev.local and the port you are running is 3030, then your application should be accessible at http://dev.local:3030/ and not just at http://localhost:3030/ .


todo:
1. ~~Active page highlight~~
2. ~~Pagination spacing.~~
3. ~~Show deleted button to be working~~
4. ~~Delimiter to be made Working~~
5. Mobile responsive