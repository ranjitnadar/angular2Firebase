import { Component,OnInit } from '@angular/core';
import { FirebaseService } from './shared/services/firebase.service';
import {Business} from './business';
import {Category} from './Category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[FirebaseService]
})
export class AppComponent implements OnInit{
  title = 'app works!';
  categories:Category[];
  businesses:Business[];

  appState: string;
  activeKey: string;
 // items: FirebaseListObservable <any[]>;

  constructor(private firebaseservice:FirebaseService) {
   // this.items = af.database.list('items');
  }
  ngOnInit(){
    this.firebaseservice.getBusinesses().subscribe(business =>{
      //console.log(business);
      this.businesses = business;
    });

    this.firebaseservice.getCategories().subscribe(category =>{
      //console.log(category);
      this.categories = category;
    });
  }

  changeState(state,key){
    //console.log('Changing State:', state);
    if(key){
      //console.log('Changing State:', key);
      this.activeKey = key;
    }
    this.appState = state;
  }
}
