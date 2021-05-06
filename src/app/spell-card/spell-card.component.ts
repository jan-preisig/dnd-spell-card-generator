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
    return !(this.spellcard.page > 1);
  }

}
