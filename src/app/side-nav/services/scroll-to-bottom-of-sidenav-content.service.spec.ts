import { TestBed } from '@angular/core/testing';

import { ScrollToBottomOfSidenavContentService } from './scroll-to-bottom-of-sidenav-content.service';

describe('ScrollToBottomOfSidenavContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScrollToBottomOfSidenavContentService = TestBed.get(ScrollToBottomOfSidenavContentService);
    expect(service).toBeTruthy();
  });
});
