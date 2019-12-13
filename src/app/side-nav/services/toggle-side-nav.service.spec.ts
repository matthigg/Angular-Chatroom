// Testing
import { TestBed } from '@angular/core/testing';

// Services
import { ToggleSideNavService } from './toggle-side-nav.service';

describe('ToggleSideNavService', () => {
  let emittedState: boolean;
  let service: ToggleSideNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(ToggleSideNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should set the 'isSideNavOpen' property to 'true' if 'handleSideNav("open")'`, () => {
    service.handleSideNav('open');
    expect(service.isSideNavOpen).toEqual(true);
  });

  it(`should set the 'isSideNavOpen' property to 'false' if 'handleSideNav("close")'`, () => {
    service.handleSideNav('close');
    expect(service.isSideNavOpen).toEqual(false);
  });

  it(`should toggle 'isSideNavOpen' property between 'true' and 'false' if 'handleSideNav("toggle")'`, () => {
    service.isSideNavOpen = false;
    service.handleSideNav('toggle');
    expect(service.isSideNavOpen).toEqual(true);
    service.handleSideNav('toggle');
    expect(service.isSideNavOpen).toEqual(false);
    service.handleSideNav('toggle');
    expect(service.isSideNavOpen).toEqual(true);
  });

  it(`should have 'sideNavSubject' emit/next 'true' if 'handleSideNav("open")'`, () => {
    service.sideNavSubject.subscribe( next => emittedState = next )
    service.handleSideNav('open');
    expect(emittedState).toEqual(true);
  });

  it(`should have 'sideNavSubject' emit/next 'false' if 'handleSideNav("close")'`, () => {
    service.sideNavSubject.subscribe( next => emittedState = next )
    service.handleSideNav('close');
    expect(emittedState).toEqual(false);
  });

  it(`should have 'sideNavSubject' toggle between emiting/nexting 'true' 'false' if 'handleSideNav("toggle")'`, () => {
    service.isSideNavOpen = false;
    service.sideNavSubject.subscribe( next => emittedState = next )
    service.handleSideNav('toggle');
    expect(emittedState).toEqual(true);
    service.handleSideNav('toggle');
    expect(emittedState).toEqual(false);
    service.handleSideNav('toggle');
    expect(emittedState).toEqual(true);
  });
});
