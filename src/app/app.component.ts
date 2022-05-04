import { Component } from '@angular/core';
import * as dayjs from 'dayjs';
import { StopsService } from './stops.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mtba-test';
  stops = []
  selectedStop: any = {}
  nextArrival: any[] =[]
  stopName: any = ''
  constructor(public stopsService: StopsService){}
  // retailsale-302028
  ngOnInit(){
    this.stopsService.getStops().subscribe((res) => {
      console.log(res);
      this.stops =res.data
    })
  }
  nextTime(stop: any){
    this.stopName = stop.relationships.stop.data.id
    this.stopsService.getPredictions(stop.relationships.stop.data.id).subscribe((res) => {
      console.log(res);
      this.selectedStop = res.data
      this.filterArrivalTimes()
    })
  }
  filterArrivalTimes(){
    // TODO: better filter
    let thing: any[] = []
    this.selectedStop.forEach((element: { attributes: { arrival_time: any; }; } | null) => {
      console.log(element?.attributes.arrival_time);
      if(element != null){
        thing.push(element?.attributes.arrival_time)
      }
    });
    this.nextArrival = thing
  }
}
