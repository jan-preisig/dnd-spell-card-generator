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

  }

  changeSelectedClass(value: string): void {
    if (value === 'Artificer') {
      this.spellCardService.spellcards.forEach(card => {
        card.show = !!card.artificer;
      });
    } else if (value === 'Barde') {
      this.spellCardService.spellcards.forEach(card => {
        card.show = !!card.barde;
      });
    } else if (value === 'Druide') {
      this.spellCardService.spellcards.forEach(card => {
        card.show = !!card.druide;
      });
    } else if (value === 'Hexenmeister') {
      this.spellCardService.spellcards.forEach(card => {
        card.show = !!card.hexenmeister;
      });
    } else if (value === 'Kleriker') {
      this.spellCardService.spellcards.forEach(card => {
        card.show = !!card.kleriker;
      });
    } else if (value === 'Magier') {
      this.spellCardService.spellcards.forEach(card => {
        card.show = !!card.magier;
      });
    } else if (value === 'Paladin') {
      this.spellCardService.spellcards.forEach(card => {
        card.show = !!card.paladin;
      });
    } else if (value === 'Waldläufer') {
      this.spellCardService.spellcards.forEach(card => {
        card.show = !!card.waldlaufer;
      });
    } else if (value === 'Zauberer') {
      this.spellCardService.spellcards.forEach(card => {
        card.show = !!card.zauberer;
      });
    } else if (value === '0') {
      this.spellCardService.spellcards.forEach(card => {
        card.show = true;
      });
    }
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
