import { Component, OnDestroy, OnInit } from '@angular/core';

// Services
import { ToggleSideNavService } from './services/toggle-side-nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnDestroy, OnInit {
  isSideNavOpen: boolean = this.toggleSideNavService.isSideNavOpen;

  constructor(private toggleSideNavService: ToggleSideNavService) { }

  ngOnDestroy() {
  }

  ngOnInit() {
    this.toggleSideNavService.sideNavSubject.subscribe(state => {
      this.isSideNavOpen = state;
    })
  }

  toggleSideNav() {
    this.toggleSideNavService.toggleSideNav();
  }
}
