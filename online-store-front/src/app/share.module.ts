// imports/exports MaterialModules
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { GraphQLModule } from './graphql.module';
import { UtcToLocalTimePipe } from './utils/utc-to-localtime.pipe';

const customModules = [AppRoutingModule, GraphQLModule];
const angularModules = [
  BrowserAnimationsModule,
  HttpClientModule,
  ReactiveFormsModule,
  BrowserModule,
  FormsModule,
];
const materialModules = [
  DragDropModule,
  LayoutModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatGridListModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatListModule,
  MatPaginatorModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSortModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatMenuModule,
];

@NgModule({
  imports: [...materialModules, ...angularModules, ...customModules],
  exports: [
    ...materialModules,
    ...angularModules,
    ...customModules,
    UtcToLocalTimePipe,
  ],
  declarations: [UtcToLocalTimePipe],
})
export class ShareModule {}
