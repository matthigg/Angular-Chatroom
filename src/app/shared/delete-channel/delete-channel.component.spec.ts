import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { FormsModule } from '@angular/forms';

// Angular Material Modules
import { MatIconModule } from '@angular/material';

// Components
import { DeleteChannelComponent } from './delete-channel.component';

describe('DeleteChannelComponent', () => {
  let component: DeleteChannelComponent;
  let fixture: ComponentFixture<DeleteChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteChannelComponent ],
      imports: [
        FormsModule,
        MatIconModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
