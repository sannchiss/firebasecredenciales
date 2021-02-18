import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'NgUser';
  config:any;
  collection = {count:60, data : [{ }] }
  ngOnInit(): void {


  }


}
