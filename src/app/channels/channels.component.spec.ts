import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

// RxJS
import { of, Subscription, throwError } from 'rxjs';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoadingSpinnerModule } from '../shared/loading-spinner/loading-spinner.module';
import { RouterTestingModule } from '@angular/router/testing';

// Angular Material Modules
import { 
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSnackBarModule,
  MatToolbarModule,
} from '@angular/material';

// Components
import { ChannelsComponent } from './channels.component';

// Services
import { ListChannelsService } from './services/list-channels.service';

// Firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

// Mock
const mockChannelsArray = [
  { payload: { doc: { 
    data: () => { return { name: 'test channel 1' } },
    id: 'test id 1'
  }}},
  { payload: { doc: { 
    data: () => { return { name: 'test channel 2' } },
    id: 'test id 2'
  }}},
  { payload: { doc: { 
    data: () => { return { name: 'test channel 3' } },
    id: 'test id 3'
  }}},
]

class mockListChannelsService {
  onListAllChannels() {
    return of(mockChannelsArray);
  }
}

describe('ChannelsComponent', () => {
  let component: ChannelsComponent;
  let firestore: AngularFirestore;
  let fixture: ComponentFixture<ChannelsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ChannelsComponent,
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule,
        LoadingSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatSnackBarModule,
        MatToolbarModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: ListChannelsService, useClass: mockListChannelsService },
      ]
    })
    .compileComponents();
    firestore = TestBed.get(AngularFirestore);
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should unsubscribe from listAllChannelsSub subscription during the ngOnDestroy() lifecycle hook`, () => {
    component['listAllChannelsSub'] = new Subscription();
    spyOn(component['listAllChannelsSub'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['listAllChannelsSub'].unsubscribe).toHaveBeenCalled();
  });

  it(`should retrieve a list of channels using the ListChannelsService`, () => {
    component['onListAllChannels']();
    expect(component.allChannels.length).toEqual(3);
  });

  it(`should display an error message to the user if there are no channels`, () => {
    component.channelsExist = false;
    component.isLoading = false;
    component.allChannels = [];
    fixture.detectChanges();
    const errorElement = fixture.debugElement.query(By.css('.error-no-channels')).nativeElement;
    spyOn(component['listChannelsService'], 'onListAllChannels').and.returnValue(
      of([])
    );
    component['onListAllChannels']();
    fixture.detectChanges();
    expect(component.allChannels.length).toEqual(0);
    expect(errorElement.innerHTML).toBeTruthy();
  });

  it(`should display an error message to the user if channels could not be fetched from Firestore`, () => {
    spyOn(component['listChannelsService'], 'onListAllChannels').and.returnValue(
      throwError('TEST ERROR: could not fetch channels.')
      );
      component['onListAllChannels']();
      fixture.detectChanges();
    const errorElement = fixture.debugElement.query(By.css('.error-fetch-channels')).nativeElement;
    expect(errorElement.innerHTML).toBeTruthy();
  });

  it(`should create a new channel via onCreateChannel()`, async () => {
    const routerNavigateSpy = spyOn(component['router'], 'navigate');
    spyOn(component['createChannelService'], 'onCreateChannel').and.returnValue(
      new Promise((resolve, reject) => resolve('test RESOLVE message'))
    );
    await component.onCreateChannel(<NgForm>{ 'value': 'testChannelName' });
    expect(routerNavigateSpy).toHaveBeenCalled();
  });

  it(`should allow users to delete a channel via onDeleteChannel()`, async () => {
    const deleteChannelServiceSpy = spyOn(component['deleteChannelService'], 'onDeleteChannel').and.returnValue(
      new Promise((resolve, reject) => resolve('test RESOLVE message'))
    );
    await component.onDeleteChannel('testChannelName');
    expect(deleteChannelServiceSpy).toHaveBeenCalled();
  });

  // Trying to delete a file that doesn't exist does -not- throw an error.
  // https://stackoverflow.com/questions/53251138/firebase-firestore-returning-true-on-failed-document-delete
  it(`displays an error message to the user if there was a problem deleting a channel`, async () => {
    spyOn(component['deleteChannelService'], 'onDeleteChannel').and.returnValue(
      new Promise((resolve, reject) => reject('test REJECT message'))
    );
    await component.onDeleteChannel('test channelName');
    fixture.detectChanges();
    const errorElement = fixture.debugElement.query(By.css('.error-channel-deletion')).nativeElement;
    expect(errorElement.innerHTML).toBeTruthy();
  });
});
