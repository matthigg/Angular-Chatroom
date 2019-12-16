// Modules
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material Components
import { 
  MatButtonModule,
  MatInputModule
} from '@angular/material';

// Components
import { CreateChannelComponent } from './create-channel.component';

// Pipes
// import { ConsoleLogPipe } from '../console-log.pipe';

@NgModule({
  declarations: [ 
    CreateChannelComponent,
    // ConsoleLogPipe,
  ],
  exports: [ CreateChannelComponent ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class CreateChannelModule { }
