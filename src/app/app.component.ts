import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {EventService} from './services/event.service';
import {Subscription} from 'rxjs';
import {SpellCardService} from './services/spell-card.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private ngxCsvParser: NgxCsvParser, private eventService: EventService, public spellCardService: SpellCardService, private http: HttpClient) {
    this.subscriptions.push(eventService.fileUploadSubject.subscribe(event => this.processCSV()));
  }

  title = 'dnd-spell-card-generator';
  spellcards = [];
  header = true;
  popupClosed = false;
  subscriptions: Subscription[] = [];

  private static setClassesAndDefaultValues(newCard: any, oldCard: any): any {
    newCard.artificer = oldCard.artificer;
    newCard.barde = oldCard.barde;
    newCard.druide = oldCard.druide;
    newCard.hexenmeister = oldCard.hexenmeister;
    newCard.kleriker = oldCard.kleriker;
    newCard.magier = oldCard.magier;
    newCard.paladin = oldCard.paladin;
    newCard.waldlaufer = oldCard.waldlaufer;
    newCard.zauberer = oldCard.zauberer;
    newCard.show = true;
    return newCard;
  }

  ngOnInit(): void {
    this.processCSV();
  }

  @HostListener('window:keyup.enter', ['$event'])
  onEnter($event: any): void {
    this.eventService.onEnterSubject.next($event);
  }

  @HostListener('window:keydown.control.p', ['$event'])
  onPrint($event: any): void {
    this.popupClosed = true;
  }

  private clearSpells(): void {
    this.spellCardService.spellcards = [];
  }

  processCSV(): void {
    this.http.get('./assets/spells.csv', {responseType: 'blob'}).subscribe(blob => {
      const file = new File([blob], 'spells.csv');
      this.ngxCsvParser.parse(file, {header: this.header, delimiter: ';'})
        .pipe().subscribe((result: Array<any>) => {
        this.spellCardService.spellcards = result;
        console.log(this.spellCardService.spellcards);
        for (let index = 0; index < this.spellCardService.spellcards.length; index++) {
          const card = this.spellCardService.spellcards[index];
          card.show = true;
          const countLinebreaks = (card.beschreibung.match('<br>') || []).length;
          const pageNr = card.page ? card.page : 1;
          if (card.beschreibung.includes('-p2-')) {
            this.manualLinebrak(card, index, pageNr);
          }
          let maxlength = 1200 - (countLinebreaks * 100);
          if (card.page > 1) {
            maxlength += 500;
          }
          maxlength = card.beschreibung.indexOf(' ', maxlength);
          const descPage2 = '...' + card.beschreibung.substr(maxlength, card.beschreibung.length - maxlength);
          console.log(card.name);
          if (card.beschreibung.length > maxlength && descPage2.length > 10) {
            console.log('linebreak', card.name);
            this.autoLinebreak(index, card, pageNr, descPage2, maxlength);
          }
        }
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
    });
  }

  private autoLinebreak(index: number, card, pageNr, descPage2: string, maxlength: number): void {
    let newSpellCard = {
      name: (card.mainTitle ? card.mainTitle : card.name) + ' ' + (pageNr + 1),
      mainTitle: (card.mainTitle ? card.mainTitle : card.name),
      beschreibung: descPage2,
      page: (pageNr + 1)
    };
    newSpellCard = AppComponent.setClassesAndDefaultValues(newSpellCard, card);
    this.spellCardService.spellcards.splice(index + 1, 0, newSpellCard);
    card.beschreibung = card.beschreibung.substr(0, maxlength) + '...';
  }

  private manualLinebrak(card, index: number, pageNr): void {
    const splitted = card.beschreibung.split('-p2-');
    card.beschreibung = splitted[0];
    for (let i = 1; i < splitted.length; i++) {
      let newSpellCard = {
        name: (card.mainTitle ? card.mainTitle : card.name) + ' ' + (pageNr + i),
        mainTitle: (card.mainTitle ? card.mainTitle : card.name),
        beschreibung: splitted[i],
        page: (pageNr + i)
      };
      newSpellCard = AppComponent.setClassesAndDefaultValues(newSpellCard, card);
      this.spellCardService.spellcards.splice(index + i, 0, newSpellCard);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
