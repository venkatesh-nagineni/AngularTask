import { Component, OnInit } from '@angular/core';
import {TaskService} from './task.service';
declare var google;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  houseList: any;
  sortListByDistance: any;
  sortListByNoOfRooms = [];
  sortByValue = [];
  movingHouse: any;

  constructor(public taskService: TaskService) {}

  ngOnInit() {
    // getting list of house from given api
    this.taskService.getListOfHouses().then((data: any) => {
      this.houseList = data;
      this.houseList.houses.forEach((eachHouse, index) => {
        const p1 = new google.maps.LatLng(Number(eachHouse.coords.lat), Number(eachHouse.coords.lon));
        const p2 = new google.maps.LatLng(52.5418739, 13.4057378);
        const distance = this.getDistance(p1, p2);
        this.houseList.houses[index].distance = Number(distance.toFixed(2));
      });

      this.sortListByDistance = this.houseList.houses.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

      // list all houses with more than 5 rooms
      this.houseList.houses.forEach(eachHouse => {
        if (eachHouse.params) {
          const noOfRooms = Number(eachHouse.params.rooms);
          if (noOfRooms > 5) {
            this.sortListByNoOfRooms.push(eachHouse);
          }
        }
      });

      // sorting from lowest to hihgest based on number of rooms
      this.sortListByNoOfRooms = this.sortListByNoOfRooms.sort((a, b) => Number(a.params.rooms) - Number(b.params.rooms));

      // comparing by more than 10 rooms and value less than or equal to 5000000
      this.sortListByDistance.forEach(eachHouse => {
        if (eachHouse.params) {
          if (Number(eachHouse.params.rooms) >= 10 && Number(eachHouse.params.value) <= 5000000) {
            this.sortByValue.push(eachHouse);
          }
        }
      });

      // eliminating sistes house for calculate nearest distance
      this.sortByValue.shift();

      // sort by nearsest ditsance to sisters house
      this.movingHouse = this.sortByValue.sort((a, b) => Number(a.distance) - Number(b.distance));
      this.movingHouse = this.movingHouse.shift();
      console.log(this.movingHouse);


    });

  }

  // getting distance for each house to sister house
  getDistance(p1, p2) {
    const R = 6378137; // Earth’s mean radius in meter
    const dLat = this.rad(p2.lat() - p1.lat());
    const dLong = this.rad(p2.lng() - p1.lng());
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(p1.lat())) * Math.cos(this.rad(p2.lat())) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d / 1000; // returns the distance in kms
  }

  rad (x) {
    return x * Math.PI / 180;
  }

}

