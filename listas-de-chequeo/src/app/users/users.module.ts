import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { UsersRoutingModule } from './users-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ AddUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatSelectModule,
    ModalModule,
    FormsModule
  ]
})
export class UsersModule { }
