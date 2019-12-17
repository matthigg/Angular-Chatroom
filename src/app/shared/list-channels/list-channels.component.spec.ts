import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Angular Material Modules
import { MatListModule } from '@angular/material';

// Components
import { ListChannelsComponent } from './list-channels.component';

describe('ListChannelsComponent', () => {
  let component: ListChannelsComponent;
  let fixture: ComponentFixture<ListChannelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChannelsComponent ],
      imports: [
        HttpClientTestingModule,
        MatListModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
