import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [DataService]
})

export class UserComponent implements OnInit {
  userList: User[]=[];
  loading = false;


constructor(private dataService: DataService, private router: Router) { }


  getUser(){
   this.dataService.getUsersInformation()
      .subscribe( users => {
        this.userList = users;
        console.log('data from data service: '+ this.userList[1].name);
      });
  }

  login(loginForm){
    this.loading = true;
    let lgUser: User = {
      name: '',
      email: '',
      username: loginForm.value.username,
      password: loginForm.value.password
    }
    console.log(lgUser);
    if(lgUser.username != '' && lgUser.password != ''){
      this.dataService.authenticate(lgUser)
      .subscribe(user => {
        this.router.navigate(['/deck']);
        },
    error => {
        this.loading = false;
        alert("Wrong username or password.");
    })
    }else{
      this.loading = false;
      alert("Fill all details first.");
    }
    
  }

  goToSignUp(){
    this.router.navigate(['/signup']);
  }


  ngOnInit() {  }

}
