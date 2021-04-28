import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-spell-card',
  templateUrl: './spell-card.component.html',
  styleUrls: ['./spell-card.component.scss']
})
export class SpellCardComponent implements OnInit {

  @Input()
  spellcard: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  statsAvailable(): boolean {
    return this.spellcard.zeitaufwand || this.spellcard.level || this.spellcard.reichweite || this.spellcard.typ ||
      this.spellcard.komponenten || this.spellcard.klasse || this.spellcard.wirkungsdauer;
  }

}
