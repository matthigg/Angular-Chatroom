import { Component, OnInit } from '@angular/core';

import { ToggleSideNavService } from '../side-nav/services/toggle-side-nav.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private toggleSideNavService: ToggleSideNavService) { }

  ngOnInit() {
    setTimeout(() => {
      this.toggleSideNavService.handleSideNav('close');
    });
  }
}
