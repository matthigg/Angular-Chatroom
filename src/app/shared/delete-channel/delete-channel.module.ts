// Modules
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Angular Material Modules
import { 
  MatButtonModule,
  MatIconModule
} from '@angular/material';

// Components
import { DeleteChannelComponent } from './delete-channel.component';

@NgModule({
  declarations: [
    DeleteChannelComponent,
  ],
  exports: [
    DeleteChannelComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class DeleteChannelModule { }
