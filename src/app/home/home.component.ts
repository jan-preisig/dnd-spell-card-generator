import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EventService} from '../services/event.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  subscriptions: Subscription[] = [];

  constructor(public eventService: EventService) {
    this.subscriptions.push(eventService.onEnterSubject.subscribe(() => this.myInputVariable.nativeElement.value = ''));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
