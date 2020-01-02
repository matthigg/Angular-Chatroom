import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// RxJS
import { Observable } from 'rxjs';

// Modules
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Angular Material Modules
import { 
  MatListModule,
  MatToolbarModule, 
} from '@angular/material';

// Components
import { ChannelComponent } from './channel.component';

// Classes
class MockActivatedRoute {
  params = Observable.create(obs => {
    obs.next('test-route')
  });
}

describe('ChannelComponent', () => {
  let component: ChannelComponent;
  let fixture: ComponentFixture<ChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelComponent ],
      imports: [ 
        HttpClientTestingModule,
        MatListModule,
        MatToolbarModule,
        RouterTestingModule,
      ],
      providers: [ 
        { 
          provide: ActivatedRoute,
          useClass: MockActivatedRoute
          // useValue: { snapshot: { params: { get(): string { return 'test-route' }}}}
          // useValue: { snapshot: { params: 'test-route' } }
        } 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
