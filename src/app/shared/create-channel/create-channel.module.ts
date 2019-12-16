// Modules
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material Components
import { 
  MatButtonModule,
  MatInputModule
} from '@angular/material';

// Components
import { CreateChannelComponent } from './create-channel.component';

@NgModule({
  declarations: [ CreateChannelComponent ],
  exports: [ CreateChannelComponent ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class CreateChannelModule { }
