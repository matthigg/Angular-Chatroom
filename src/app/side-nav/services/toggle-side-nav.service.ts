import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleSideNavService {
  isSideNavOpen: boolean = true;
  sideNavEmitter = new EventEmitter<boolean>();

  constructor() { }

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
    this.sideNavEmitter.emit(this.isSideNavOpen);
  }
}
