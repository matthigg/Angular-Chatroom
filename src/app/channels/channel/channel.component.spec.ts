import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// Components
import { ChannelComponent } from './channel.component';

describe('ChannelComponent', () => {
  let component: ChannelComponent;
  let fixture: ComponentFixture<ChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelComponent ],
      imports: [ RouterTestingModule ],
      providers: [ 
        { 
          provide: ActivatedRoute,
          // useValue: { snapshot: { params: { get(): string { return 'test-name' }}}}
          useValue: { snapshot: { params: 'test-name' }}
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
