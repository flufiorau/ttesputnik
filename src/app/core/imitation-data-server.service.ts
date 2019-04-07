import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Pattern} from './interfaces';
import {mockTemplates} from 'src/assets/mock-templates';


@Injectable({
  providedIn: 'root'
})
export class ImitationDataServerService {
  templates = new BehaviorSubject<Array<Pattern>>(undefined);
  loadingProcess = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  querySimulation(): Observable<boolean> {
    this.loadingProcess.next(true);
    setTimeout(() => this.loadingProcess.next(false), 200);
    return of(true);
  }

  getJSON(): void {
    this.querySimulation().subscribe(() => this.templates.next(mockTemplates));
  }

  savePattern(patternId, updatedPattern): Observable<boolean> {
    const newArrayOfPattern = [];

    for (const pattern of this.templates.value) {
      if (pattern.id === patternId) {
        pattern.template = updatedPattern;
        pattern.modified = new Date().getTime();
      }
      newArrayOfPattern.push(pattern);
    }
    this.writeToMemory(newArrayOfPattern);
    return of(true);
  }

  writeToMemory(newArrayOfPattern): any {
    this.querySimulation().subscribe(() => this.templates.next(newArrayOfPattern));
  }
}
