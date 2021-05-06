import {Component, HostListener, Input, OnInit} from '@angular/core';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {EventService} from '../services/event.service';
import {SpellCardService} from '../services/spell-card.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  faTimes = faTimes;
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

  constructor(private eventService: EventService, public spellCardService: SpellCardService) {
  }

  ngOnInit(): void {
  }

  @HostListener('window:keydown.control.m', ['$event'])
  openPopup(): void {
    this.popupClosed = false;
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
    return card.grad >= this.fromGradValue &&
      card.grad <= this.toGradValue &&
      (this.selectedSchule === 'alle' || card.schule.includes(this.selectedSchule)) &&
      this.filterKomponenten(card) &&
      card.beschreibung.includes(this.beschreibungFilter);
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
}
