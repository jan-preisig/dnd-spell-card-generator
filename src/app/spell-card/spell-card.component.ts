import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-spell-card',
  templateUrl: './spell-card.component.html',
  styleUrls: ['./spell-card.component.scss']
})
export class SpellCardComponent implements OnInit {

  @Input()
  spellcard: any;

  constructor(private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  statsAvailable(): boolean {
    return this.spellcard.zeitaufwand || this.spellcard.level || this.spellcard.reichweite || this.spellcard.schule ||
      this.spellcard.komponenten || this.spellcard.klasse || this.spellcard.wirkungsdauer;
  }

}
