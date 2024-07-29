import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpService } from '../../http.service';
import { Iuser } from '../../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, ReactiveFormsModule,MatSelectModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'] // Fix typo here
})
export class UserFormComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route=inject(ActivatedRoute);
  userform = this.formBuilder.group({
    user_name: ['', [Validators.required]],
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    user_status: ['', [Validators.required]],
    department: ['', [Validators.required]],
  });
users_name!:string;
isEdit=false;
ngOnInit(){
  this.users_name=this.route.snapshot.params['id'];
  if(this.users_name){
    this.isEdit=true;
    this.httpService.getUser(this.users_name).subscribe(reslt=>{
      console.log(reslt);
      this.userform.patchValue(reslt);
    })
  }
}
  save() {
    console.log(this.userform.value);

    const user: Iuser = {
      user_name: this.userform.value.user_name!,
      first_name: this.userform.value.first_name!,
      last_name: this.userform.value.last_name!,
      email: this.userform.value.email!,
      user_status: this.userform.value.user_status!,
      department: this.userform.value.department!,
    };
if(this.isEdit){
  this.httpService.updateUser(this.users_name,user).subscribe(()=>{
    console.log('success');
    this.router.navigateByUrl("/user-list");
  });
}
else{
    this.httpService.createUser(user).subscribe(() => {
      console.log("Success");
      this.router.navigateByUrl("/user-list");
    }, error => {
      console.error("Error occurred:", error);
    });
  }
  }
}
