import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-spell-card',
  templateUrl: './spell-card.component.html',
  styleUrls: ['./spell-card.component.scss']
})
export class SpellCardComponent implements OnInit, AfterViewInit {

  @Input()
  spellcard: any;
  @ViewChild('spellTable')
  spellTable: HTMLElement;

  constructor(private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  statsAvailable(): boolean {
    return !(this.spellcard.page > 1);
  }

  ngAfterViewInit(): void {
    this.spellTable?.classList.add('spell-table');
  }

}
