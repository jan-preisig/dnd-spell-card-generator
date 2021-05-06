import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SpellCardComponent} from './spell-card/spell-card.component';
import {FormsModule} from '@angular/forms';
import {NgxCsvParserModule} from 'ngx-csv-parser';
import { HomeComponent } from './home/home.component';
import { PopupComponent } from './popup/popup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {SafeHtmlPipe} from './safe-html.pipe';
import {HttpClientModule} from '@angular/common/http';
import {AngularDraggableModule} from 'angular2-draggable';

@NgModule({
    declarations: [
        AppComponent,
        SpellCardComponent,
        HomeComponent,
        PopupComponent,
        SafeHtmlPipe,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxCsvParserModule,
    FontAwesomeModule,
    HttpClientModule,
    AngularDraggableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
