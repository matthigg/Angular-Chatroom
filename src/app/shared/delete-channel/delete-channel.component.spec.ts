import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { FormsModule } from '@angular/forms';

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
