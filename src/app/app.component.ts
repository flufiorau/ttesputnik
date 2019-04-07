import {Component, OnInit} from '@angular/core';
import {ImitationDataServerService} from './core/imitation-data-server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TTeSputnik';

  constructor(private dataService: ImitationDataServerService) {
  }

  ngOnInit() {
    this.getPatternsInitialData();
  }

  getPatternsInitialData(): void {
    this.dataService.getJSON();
  }

}
