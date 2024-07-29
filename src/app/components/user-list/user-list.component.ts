import { Component, OnInit, inject } from '@angular/core';
import { Iuser } from '../../interfaces/user';
import { HttpService } from '../../http.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Console } from 'node:console';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatTableModule, CommonModule,MatButtonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  router=inject(Router);
  users: Iuser[] = [];
  httpService = inject(HttpService);
  displayedColumns: string[] = [
    'user_name',
    'first_name',
    'last_name',
    'email',
    'user_status',
    'department',
    'action'
  ];

  ngOnInit() {
    this.UpdateUsersdata();
  }
  UpdateUsersdata(){
    this.httpService.getAllUsers().subscribe(result => {
      this.users = result;
      console.log(this.users);
    });
  }
  user_update(id:string){
    console.log(id);
    this.router.navigateByUrl("/user/"+id);
  }
  DeleteUsers(user:string){
    this.httpService.DeleteUser(user).subscribe(()=>{
      console.log("success");
      this.UpdateUsersdata();
    })
  }
}
