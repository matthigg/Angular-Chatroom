import { Injectable } from '@angular/core';

// RxJS
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleSideNavService {
  isSideNavOpen: boolean = true;
  sideNavSubject = new Subject<boolean>();

  constructor() { }

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
    this.sideNavSubject.next(this.isSideNavOpen);
  }
}
