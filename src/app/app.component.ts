import {Component, HostListener, OnDestroy} from '@angular/core';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {EventService} from './services/event.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
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
    const files = $event.target.files;
    this.ngxCsvParser.parse(files[0], {header: this.header, delimiter: ';'})
      .pipe().subscribe((result: Array<any>) => {
      this.spellcards = result;
      this.spellcards.forEach((card, index) => {
        const countLinebreaks = (card.beschreibung.match('<br>') || []).length;
        const pageNr = card.page ? card.page : 1;
        if (card.beschreibung.includes('-p2-')) {
          this.manualLinebrak(card, index, pageNr);
        }
        let maxlength = 1200 - (countLinebreaks * 100);
        maxlength = card.beschreibung.indexOf(' ', maxlength);
        const descPage2 = '...' + card.beschreibung.substr(maxlength, card.beschreibung.length - maxlength);
        if (card.beschreibung.length > maxlength && descPage2.length > 10) {
          this.autoLinebreak(index, card, pageNr, descPage2, maxlength);
        }
      });
    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });
  }

  private autoLinebreak(index: number, card, pageNr, descPage2: string, maxlength: number): void {
    this.spellcards.splice(index + 1, 0, {
      titel: (card.mainTitle ? card.mainTitle : card.titel) + ' ' + (pageNr + 1),
      mainTitle: card.titel,
      beschreibung: descPage2,
      page: (pageNr + 1)
    });
    card.beschreibung = card.beschreibung.substr(0, maxlength) + '...';
  }

  private manualLinebrak(card, index: number, pageNr): void {
    const splitted = card.beschreibung.split('-p2-');
    card.beschreibung = splitted[0];
    for (let i = 1; i < splitted.length; i++) {
      this.spellcards.splice(index + i, 0, {
        titel: (card.mainTitle ? card.mainTitle : card.titel) + ' ' + (pageNr + i),
        mainTitle: card.titel,
        beschreibung: splitted[i],
        page: (pageNr + i)
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
