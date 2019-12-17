import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// RxJS
import { Subscription } from 'rxjs';

// Modules
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Components
import { ChannelComponent } from './channel.component';

describe('ChannelComponent', () => {
  let component: ChannelComponent;
  let fixture: ComponentFixture<ChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelComponent ],
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule 
      ],
      providers: [ 
        { 
          provide: ActivatedRoute,
          // useValue: { snapshot: { params: { get(): string { return 'test-name' }}}}
          useValue: { 
            snapshot: { params: 'test-name' },
            // params: 'test-name'
          }
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
    // expect(component).toBeTruthy();
    console.log('===', component)
  });
});
