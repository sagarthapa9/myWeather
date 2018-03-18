// import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core';


/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {
  apiKey = '43fef8161f00cf14';
  url;
  constructor(public http: Http) {
    console.log('Hello WeatherProvider Provider');
    this.url = 'http://api.wunderground.com/api/'+this.apiKey+'/conditions/q/';
  }

 getWeather(city, state){
  return this.http.get(this.url+'/'+state+'/'+city+'.json')
  .map(res=>res.json());
 }
}
