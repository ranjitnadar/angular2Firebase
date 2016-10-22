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


  activeCompany:string;
  activeCategory:string;
  activeYearsInBusiness:string;
  activeDescription:string;
  activePhone:string;
  activeEmail:string;
  activeStreet:string;
  activeCity:string;
  activeState:string;
  activeZipcode:string;
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


  filterCategory(category){
  	//console.log(category);
  	if(category != 0){
  		this.firebaseservice.getBusinesses(category).subscribe(business =>{
	      //console.log(business);
	      this.businesses = business;
	    });
  	}else{
  		this.firebaseservice.getBusinesses().subscribe(business =>{
	      //console.log(business);
	      this.businesses = business;
	    });
  	}
  	
  }

  addBusiness(
  	company:string,
  	street:string,
  	city:string,
  	state:string,
  	zipcode:number,
  	phone:number,
  	email:string,
  	category:string,
  	years_in_business:number,
  	description:string){
  	var created_at = new Date().toString();

  	var newBusiness = {
  		company:company,
  		category:category,
  		years_in_business:years_in_business,
  		description:description,
  		phone:phone,
  		email:email,
  		street:street,
  		city:city,
  		state:state,
  		zipcode:zipcode,
  		created_at:created_at
  	}

  	this.firebaseservice.addBusiness(newBusiness);

  	this.changeState('default');
  }

  changeState(state,key = null){
    //console.log('Changing State:', state);
    if(key){
      //console.log('Changing State:', key);
      this.activeKey = key;
    }
    this.appState = state;
  }
  editBusiness(business){
  	this.changeState('edit', business.$key);
	this.activeCompany = business.company;
	this.activeCategory = business.category;
	this.activeYearsInBusiness = business.years_in_business;
	this.activeDescription = business.description;
	this.activePhone = business.phone;
	this.activeEmail = business.email;
	this.activeStreet = business.street;
	this.activeCity = business.city;
	this.activeState = business.state;
	this.activeZipcode = business.zipcode;
  }
  /**
   * [updateBusiness Information]
   */
  updateBusiness(){
  	var updateBusiness = {
  		company:this.activeCompany,
  		category:this.activeCategory,
  		years_in_business:this.activeYearsInBusiness,
  		description:this.activeDescription,
  		phone:this.activePhone,
  		email:this.activeEmail,
  		street:this.activeStreet,
  		city:this.activeCity,
  		state:this.activeState,
  		zipcode:this.activeZipcode
  	}

  	this.firebaseservice.updateBusiness(updateBusiness, this.activeKey);

  	this.changeState('default');
  }
  /**
   * [deleteBusiness description]
   */
  deleteBusiness(key){
  	this.firebaseservice.deleteBusiness(key);
  	this.changeState('default');
  }
}
