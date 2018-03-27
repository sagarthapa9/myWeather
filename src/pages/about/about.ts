import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  map: any;
  constructor(public navCtrl: NavController, private geolocation: Geolocation) {

  }
 /*Intialize the map only when Ion View is loaded */
 ionViewDidLoad(){
   this.intializeMap();
 }

 intializeMap(){
  let locationOptions = {timeout: 10000, enableHighAccuracy: true};
        this.geolocation.getCurrentPosition(locationOptions).then((position) => {
             //console.log(position.coords.latitude);
             //console.log(position.coords.longitude);

            let options = {
              center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
              zoom: 16,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            }
 
            /* Show our lcoation */
            this.map = new google.maps.Map(document.getElementById("map_canvas"), options);
 
            /* We can show our location only if map was previously initialized */
            this.showMyLocation();
 
        }).catch((error) => {
          console.log('Error getting location', error);
        });
 }

  /*
     * This function will create and show a marker representing your location
     */
    showMyLocation(){
 
      let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: this.map.getCenter()
      });

      let markerInfo = "<h4>You are here!</h4>";         

      let infoModal = new google.maps.InfoWindow({
          content: markerInfo
      });

      google.maps.event.addListener(marker, 'click', () => {
          infoModal.open(this.map, marker);
      });
  }
}
