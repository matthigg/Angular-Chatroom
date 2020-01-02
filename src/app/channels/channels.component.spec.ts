import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

// RxJS
import { Observable, of, Subscription, throwError } from 'rxjs';

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

describe('ChannelsComponent', () => {
  let component: ChannelsComponent;
  let fixture: ComponentFixture<ChannelsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ChannelsComponent,
      ],
      imports: [
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
      ]
    })
    .compileComponents();
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

  it(`should unsubscribe from all subscriptions during the ngOnDestroy() lifecycle hook`, () => {
    component['createChannelSub'] = new Subscription();
    component['deleteChannelSub'] = new Subscription();
    component['listAllChannelsSub'] = new Subscription();
    spyOn(component['createChannelSub'], 'unsubscribe');
    spyOn(component['deleteChannelSub'], 'unsubscribe');
    spyOn(component['listAllChannelsSub'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['createChannelSub'].unsubscribe).toHaveBeenCalled();
    expect(component['deleteChannelSub'].unsubscribe).toHaveBeenCalled();
    expect(component['listAllChannelsSub'].unsubscribe).toHaveBeenCalled();
  });

  it(`should retrieve a list of channels using the ListChannelsService`, () => {
    spyOn(component['listChannelsService'], 'onListAllChannels').and.returnValue(
      of({
        'test key 1': { channelName: 'test channel 1'},
        'test key 2': { channelName: 'test channel 2'},
        'test key 3': { channelName: 'test channel 3'},
        'test key 4': { channelName: 'test channel 4'},
        'test key 5': { channelName: 'test channel 5'},
      }),
    );
    component['onListAllChannels']();
    expect(component.allChannels.length).toEqual(5);
  });

  it(`should display an error message to the user if there are no channels`, () => {
    component.isLoading = false;
    fixture.detectChanges();
    const errorElement = fixture.debugElement.query(By.css('.error-no-channels')).nativeElement;
    spyOn(component['listChannelsService'], 'onListAllChannels').and.returnValue(
      of(null)
    );
    component['onListAllChannels']();
    fixture.detectChanges();
    expect(component.allChannels.length).toEqual(0);
    expect(errorElement.innerHTML).toBeTruthy();
  });

  it(`should create a new channel via onCreateChannel()`, () => {
    const routerNavigateSpy = spyOn(component['router'], 'navigate');
    spyOn(component['createChannelService'], 'onCreateChannel').and.returnValue(
      of({ 'response': 'test unused response' }),
    );
    const testNgForm = <NgForm>{ 'value': 'testChannelName' };
    component.onCreateChannel(testNgForm);
    expect(routerNavigateSpy).toHaveBeenCalled();
  });

  it(`displays an error message to the user if there was a problem creating a new channel`, () => {
    const routerNavigateSpy = spyOn(component['router'], 'navigate');
    spyOn(component['createChannelService'], 'onCreateChannel').and.returnValue(
      throwError('TEST ERROR: could not create channel.')
    );
    component.onCreateChannel(<NgForm>{ 'value': 'testChannelName' });
    fixture.detectChanges();
    const errorElement = fixture.debugElement.query(By.css('.error-channel-creation')).nativeElement;
    expect(errorElement.innerHTML).toBeTruthy();
    expect(routerNavigateSpy).not.toHaveBeenCalled();
  });

  it(`should allow users to delete a channel via onDeleteChannel()`, () => {
    const deleteChannelServiceSpy = spyOn(component['deleteChannelService'], 'onDeleteChannel').and.returnValue(
      of({ 'test': 'unused test data'})
    );
    component.onDeleteChannel('testChannelId', 'testChannelName');
    expect(deleteChannelServiceSpy).toHaveBeenCalled();
  });

  // Trying to delete a file that doesn't exist does -not- throw an error.
  // https://stackoverflow.com/questions/53251138/firebase-firestore-returning-true-on-failed-document-delete
  it(`displays an error message to the user if there was a problem deleting a channel`, () => {
    spyOn(component['deleteChannelService'], 'onDeleteChannel').and.returnValue(
      throwError('TEST ERROR: could not delete channel.')
    );
    component.onDeleteChannel('test channelId', 'test channelName');
    fixture.detectChanges();
    const errorElement = fixture.debugElement.query(By.css('.error-channel-deletion')).nativeElement;
    expect(errorElement.innerHTML).toBeTruthy();
  });
});
