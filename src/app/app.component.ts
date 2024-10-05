import {Component, OnInit} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'bancanet-ui';
  isMobile = false;
  constructor(
    private deviceService: DeviceDetectorService
  ) {
  }

  ngOnInit() {
    // this.isMobile = this.deviceService.isMobile()
    // if(!this.isMobile){
    //   return
    // }
    // alert("Ingrese a la pagina en un celular")
  }
}
