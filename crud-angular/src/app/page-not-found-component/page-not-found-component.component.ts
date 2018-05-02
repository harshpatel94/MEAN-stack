import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found-component',
  template: `template: '<h2>Page not found</h2>'`,
  templateUrl: './page-not-found-component.component.html',
  styleUrls: ['./page-not-found-component.component.css']
})
export class PageNotFoundComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
