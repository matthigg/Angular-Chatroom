import { Component, OnDestroy, OnInit } from '@angular/core';

// RxJS
import { Subscription } from 'rxjs';

// Services
import { ToggleSideNavService } from './services/toggle-side-nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnDestroy, OnInit {
  isSideNavOpen: boolean = this.toggleSideNavService.isSideNavOpen;
  private sideNavSubjectSub: Subscription;

  constructor(private toggleSideNavService: ToggleSideNavService) { }

  ngOnDestroy() {
    if (this.sideNavSubjectSub) this.sideNavSubjectSub.unsubscribe();
  }

  ngOnInit() {
    this.sideNavSubjectSub = this.toggleSideNavService.sideNavSubject.subscribe(state => {
      this.isSideNavOpen = state;
    })
  }
}
