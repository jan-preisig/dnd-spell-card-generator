import {Component, HostListener, OnDestroy} from '@angular/core';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {EventService} from './services/event.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'dnd-spell-card-generator';
  spellcards = [];
  header = true;
  subscriptions: Subscription[] = [];

  constructor(private ngxCsvParser: NgxCsvParser, private eventService: EventService) {
    this.subscriptions.push(eventService.fileUploadSubject.subscribe(event => this.processCSV(event)));
    this.subscriptions.push(eventService.onEnterSubject.subscribe(() => this.clearSpells()));
  }

  @HostListener('window:keyup.enter', ['$event'])
  onEnter($event: any): void {
    this.eventService.onEnterSubject.next($event);
  }

  private clearSpells(): void {
    this.spellcards = [];
  }

  processCSV($event: any): void {
    const files = $event.srcElement.files;
    this.ngxCsvParser.parse(files[0], {header: this.header, delimiter: ';'})
      .pipe().subscribe((result: Array<any>) => {
      console.log('Result', result);
      this.spellcards = result;
      this.spellcards.forEach(card => {
        if (card.beschreibung.length > 1420) {
          card.beschreibung = card.beschreibung.substr(0, 1420) + '...';
        }
      });
    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
