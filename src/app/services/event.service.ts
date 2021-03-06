import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  fileUploadSubject: Subject<any> = new Subject<any>();
  onEnterSubject: Subject<any> = new Subject<any>();
  onPopupClosedChange: Subject<boolean> = new Subject<boolean>();
  applySorting: Subject<any> = new Subject<any>();

  constructor() {
  }
}
