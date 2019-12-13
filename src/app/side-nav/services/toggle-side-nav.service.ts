import { Injectable } from '@angular/core';

// RxJS
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleSideNavService {
  isSideNavOpen: boolean;
  sideNavSubject = new Subject<boolean>();

  constructor() { }

  handleSideNav(state) {
    if (state === 'open') this.isSideNavOpen = true;
    if (state === 'close') this.isSideNavOpen = false;
    if (state === 'toggle') this.isSideNavOpen = !this.isSideNavOpen;
    this.sideNavSubject.next(this.isSideNavOpen);
  }
}
