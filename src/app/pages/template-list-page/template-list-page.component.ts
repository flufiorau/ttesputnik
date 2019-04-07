import {Component, OnInit} from '@angular/core';
import {ImitationDataServerService} from '../../core/imitation-data-server.service';
import {Pattern} from '../../core/interfaces';

@Component({
  selector: 'app-template-list-page',
  templateUrl: './template-list-page.component.html',
  styleUrls: ['./template-list-page.component.css']
})
export class TemplateListPageComponent implements OnInit {
  patterns: Array<Pattern>;
  columnsToDisplay = ['id', 'name', 'modified'];

  constructor(private dataService: ImitationDataServerService) {
  }

  ngOnInit() {
    this.subscribeToPatterns();
  }

  subscribeToPatterns(): any {
    this.dataService.templates.subscribe(patterns => {
      this.patterns = patterns;
    });
  }

}
