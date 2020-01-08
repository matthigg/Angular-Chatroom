import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// RxJS
import { Subscription } from 'rxjs';

// Services
import { CreateChannelService } from '../channels/services/create-channel.service';
import { ToggleSideNavService } from './services/toggle-side-nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnDestroy, OnInit {
  isAccordionOpen: boolean = false;
  errorChannelCreation: string = '';
  isSideNavOpen: boolean = this.toggleSideNavService.isSideNavOpen;
  private sideNavSubjectSub: Subscription;

  constructor(
    private createChannelService: CreateChannelService,
    private router: Router,
    private toggleSideNavService: ToggleSideNavService,
  ) { }

  ngOnDestroy() {
    if (this.sideNavSubjectSub) this.sideNavSubjectSub.unsubscribe();
  }

  ngOnInit() {
    this.sideNavSubjectSub = this.toggleSideNavService.sideNavSubject.subscribe(state => {
      this.isSideNavOpen = state;
    });
  }

  onCreateChannel(form: NgForm): Promise<any> {
    console.log('=== isAccordionOpen:', this.isAccordionOpen)
    this.isAccordionOpen = false;
    console.log('=== isAccordionOpen:', this.isAccordionOpen)
    return this.createChannelService.onCreateChannel(form)
      .then(response => { 
        this.router.navigate(['channel', form.value.channelName]);
        form.reset();
      })
      .catch(error => { this.errorChannelCreation = 'Error: could not create channel.' });
  }
}
