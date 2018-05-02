import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css'],
  providers: [DataService]
})
export class UserSignupComponent implements OnInit {
  userList: User[]=[];

  constructor(private dataService: DataService, private router: Router, private router1: ActivatedRoute) { }

  signUp(signUpForm){
    let newUser: User = {
      name: signUpForm.value.name,
      email: signUpForm.value.email,
      username: signUpForm.value.username,
      password: signUpForm.value.password
    }
    if(newUser.name != '' && newUser.email != '' && newUser.username != '' && newUser.password != ''){
      this.dataService.addUser(newUser)
      .subscribe(user => {
      alert("User successfully added. ");
      this.router.navigate(['/user']);
    })  
    }else{
      alert("Please enter all details.");
    }
    
  }

  ngOnInit() {
  }


}
