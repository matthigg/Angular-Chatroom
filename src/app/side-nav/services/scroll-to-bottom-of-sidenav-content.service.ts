import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollToBottomOfSidenavContentService {
  scrollHeight = new BehaviorSubject<number>(null);

  constructor() { }

  set setScrollHeight(height: number) {
    this.scrollHeight.next(height);
  }
}
