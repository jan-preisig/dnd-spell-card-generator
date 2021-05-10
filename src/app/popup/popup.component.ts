import {Component, HostListener, Input, OnInit} from '@angular/core';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {EventService} from '../services/event.service';
import {SpellCardService} from '../services/spell-card.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  faTimes = faTimes;
  faCheck = faCheck;
  private subscriptions = [];
  @Input()
  popupClosed: boolean;
  showAll = true;
  // filters
  selectedClass = '0';
  fromGradValue = '0';
  toGradValue = '9';
  selectedSchule = '';
  komponentenFilter = '';
  beschreibungFilter = '';
  konzentration = 'alle';
  nameFilter = '';
  ritualFilter = '';

  constructor(private eventService: EventService, public spellCardService: SpellCardService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.eventService.onEnterSubject.subscribe(() => {
      this.applySorting();
    }));
    this.subscriptions.push(this.eventService.onPopupClosedChange.subscribe(value => {
      this.popupClosed = value;
      console.log('close popup');
    }));
  }

  @HostListener('window:keydown.control.m', ['$event'])
  openPopup(): void {
    this.popupClosed = !this.popupClosed;
  }

  closePopup(): void {
    this.popupClosed = true;
  }

  applySorting(): void {
    this.spellCardService.spellcards.forEach(card => card.show = false);
    if (this.selectedClass === 'Artificer') {
      this.spellCardService.spellcards.forEach(card => {
        card.show = !!card.artificer && this.advancedFilter(card);
        this.makeAdditionalPagesVisible(card);
      });
    } else if (this.selectedClass === 'Barde') {
      this.spellCardService.spellcards.forEach(card => {
        card.show = !!card.barde && this.advancedFilter(card);
        this.makeAdditionalPagesVisible(card);
      });
    } else if (this.selectedClass === 'Druide') {
      this.spellCardService.spellcards.forEach(card => {
        card.show = !!card.druide && this.advancedFilter(card);
        this.makeAdditionalPagesVisible(card);
      });
    } else if (this.selectedClass === 'Hexenmeister') {
      this.spellCardService.spellcards.forEach(card => {
        card.show = !!card.hexenmeister && this.advancedFilter(card);
        this.makeAdditionalPagesVisible(card);
      });
    } else if (this.selectedClass === 'Kleriker') {
      this.spellCardService.spellcards.forEach(card => {
        card.show = !!card.kleriker && this.advancedFilter(card);
        this.makeAdditionalPagesVisible(card);
      });
    } else if (this.selectedClass === 'Magier') {
      this.spellCardService.spellcards.forEach(card => {
        card.show = !!card.magier && this.advancedFilter(card);
        this.makeAdditionalPagesVisible(card);
      });
    } else if (this.selectedClass === 'Paladin') {
      this.spellCardService.spellcards.forEach(card => {
        card.show = !!card.paladin && this.advancedFilter(card);
        this.makeAdditionalPagesVisible(card);
      });
    } else if (this.selectedClass === 'Waldläufer') {
      this.spellCardService.spellcards.forEach(card => {
        card.show = !!card.waldlaufer && this.advancedFilter(card);
        this.makeAdditionalPagesVisible(card);
      });
    } else if (this.selectedClass === 'Zauberer') {
      this.spellCardService.spellcards.forEach(card => {
        card.show = !!card.zauberer && this.advancedFilter(card);
        this.makeAdditionalPagesVisible(card);
      });
    } else if (this.selectedClass === '0') {
      this.spellCardService.spellcards.forEach(card => {
        card.show = this.advancedFilter(card);
        this.makeAdditionalPagesVisible(card);
      });
    }
  }

  private makeAdditionalPagesVisible(card): void {
    if (card.show) {
      this.spellCardService.spellcards.forEach(filterCard => {
        if (filterCard.name.includes(card.name)) {
          filterCard.show = true;
        }
      });
    }
  }

  advancedFilter(card: any): boolean {
    if (card.show) {
      return true;
    }
    return card.grad >= Number(this.fromGradValue) &&
      card.grad <= (this.toGradValue ? Number(this.toGradValue) : 9) &&
      (this.selectedSchule === 'alle' || card.schule.includes(this.selectedSchule)) &&
      this.filterKomponenten(card) &&
      (this.nameFilter === '' || card.name.toLowerCase().includes(this.nameFilter.toLowerCase())) &&
      card.beschreibung.toLowerCase().includes(this.beschreibungFilter.toLowerCase()) &&
      (this.ritualFilter.includes('alle') || (this.ritualFilter.includes('true') ? card.ritual.includes('Ritual') : !card.konz.includes('Ritual'))) &&
      (this.konzentration.includes('alle') || (this.konzentration.includes('true') ? card.konz.includes('Konz.') : !card.konz.includes('Konz.')));
  }

  private filterKomponenten(card: any): boolean {
    let including = true;
    if (this.komponentenFilter === '') {
      return including;
    }
    this.komponentenFilter.split('').forEach(i => {
      if (!card.komponenten.includes(i)) {
        including = false;
      }
    });
    return including;
  }

  changeSpellCardVisibility(target: any, index: number): void {
    this.spellCardService.spellcards[index].show = target.checked;
  }

  changeSelectAll(): void {
    if (this.showAll) {
      this.spellCardService.spellcards.forEach(card => card.show = false);
      this.showAll = false;
    } else {
      this.spellCardService.spellcards.forEach(card => card.show = true);
      this.showAll = true;
    }
  }

  changeCardSelected(spellcard: any): void {
    this.spellCardService.spellcards.forEach(card => {
      if (card.name.includes(spellcard.name)) {
        card.show = spellcard.show;
      }
    });
  }

  checkPageOne(spellcard: any): boolean {
    return !(Number(spellcard.page) > 1);
  }
}
