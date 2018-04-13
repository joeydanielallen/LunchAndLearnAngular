import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SysadminRoutingModule } from './sysadmin-routing.module';
import { UsersComponent } from './components/users/users.component';
import { UserService } from './services/user.service';
import { BoolToYesNoPipe } from './pipes/bool-to-yes-no.pipe';
import { UserComponent } from './components/user/user.component';

@NgModule({
  imports: [
    CommonModule,
    SysadminRoutingModule
  ],
  declarations: [
    UsersComponent,
    BoolToYesNoPipe,
    UserComponent
  ],
  providers: [
    UserService
  ]
})
export class SysadminModule { }
