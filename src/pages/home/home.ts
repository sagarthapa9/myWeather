import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider} from '../../providers/weather/weather';
import { Storage} from '@ionic/storage';
import { Flashlight } from '@ionic-native/flashlight';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isOn: boolean = false;
  weather: any;
  location:{
  	city: string;
  	state: string;
  }

  constructor(public navCtrl: NavController,
   private weatherProvider: WeatherProvider,
   private storage: Storage,
   private flashLight: Flashlight) {


  }

   ionViewWillEnter(){
   	this.storage.get('location').then((val) => {
          if(val != null){
              this.location = JSON.parse(val);
          }else{
             this.location = {
             		city: 'Oxford',
   					state: 'UK'
             }
          }

 	this.weatherProvider.getWeather(this.location.city, this.location.state)
   		.subscribe(weather => {
   		this.weather = weather.current_observation;
   		});
   	});
   }
  
async isAvailable():Promise<boolean>{
  try{
    return await this.flashLight.available();
  }catch(e){
    console.log(e);
  }
}

async toggleFlash():Promise<void>{
  try{
    let available = await this.isAvailable();
    if(available){
      await this.flashLight.toggle();
      this.isOn = !this.isOn;
    }else{
      console.log("Isn't available.")
    }
  }catch(e){
    console.log(e);
  }
}
}
