import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { SideNavComponent } from './side-nav/side-nav.component';
import { SisuComponent } from './sisu/sisu.component';

const routes: Routes = [
  { path: '', component: SisuComponent },
  { path: 'home', component: SideNavComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
