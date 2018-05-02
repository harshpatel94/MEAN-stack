import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getUsersInformation(){
    return this.http.get('http://localhost:3000/api/users')
    .map(res => res.json());
  }

  authenticate(newuser){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/login', newuser, { header:headers})
    .map( res => res.json());
  }

  addUser(newuser){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/users', newuser, { headers: headers})
      .map( res => res.json());
  }

  saveDeck(newDeck){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/dealdecks', newDeck, { headers: headers})
    .map ( res => res.json());
  }

  getAllDeck(newDeck){
    return this.http.get('http://localhost:3000/api/dealdecks')
    .map(res => res.json());
  }
}
