import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Angular Material Modules
import { 
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';

// Components
import { CreateChannelComponent } from './create-channel.component';

describe('CreateChannelComponent', () => {
  let component: CreateChannelComponent;
  let fixture: ComponentFixture<CreateChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChannelComponent ],
      imports: [ 
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
