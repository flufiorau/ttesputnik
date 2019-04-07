import {Component, EventEmitter, OnInit} from '@angular/core';
import {ImitationDataServerService} from '../../core/imitation-data-server.service';
import {PanelData} from '../../core/interfaces';

@Component({
  selector: 'app-panel-for-change-text-and-font-size',
  template: `
    <mat-card>
      <h1 mat-dialog-title>You have possibility to change text and font-size him</h1>
      <section>
        <div>
          <label>Select font size
            <mat-slider min="2" max="50" step="1" value="14" thumbLabel [displayWith]="formatLabel"
                        (change)="setFontSize($event)"
                        [value]="data.fontSize"></mat-slider>
          </label>
        </div>
        <mat-form-field color="accent">
          <input matInput type="text" [value]="data.text" placeholder="Change selected text"
                 (keyup)="setInnerText($event)">
        </mat-form-field>
      </section>
      <div mat-dialog-actions>
        <button mat-raised-button color="primary" (click)="cancelAndClose()" cdkFocusInitial>No. Thanks</button>
        <button mat-raised-button color="accent" (click)="saveAndClose()">Save</button>
      </div>
    </mat-card>`,
  styles: [
    '.mat-card {position: absolute;top: 0;left: calc(50% - 368px);z-index: 1}',
    '.mat-card-content {max-height: 300px; overflow-y: auto}',
    '.mat-card-actions {justify-content: space-evenly;display: flex;}',
    '.mat-form-field {width: auto;}'
  ]

})
export class PanelForChangeTextAndFontSizeComponent implements OnInit {

  elem: HTMLElement;
  id: number;
  saveInstance = new EventEmitter();
  undoInstance = new EventEmitter();
  showErrorInstance = new EventEmitter();
  data: PanelData;


  constructor(private dataService: ImitationDataServerService) {
  }

  ngOnInit() {
    this.data = {
      fontSize: this.getFontSizeFromString(),
      text: this.elem.innerText
    };
  }

  saveAndClose() {
    // @ts-ignore
    const updatedPattern = document.getElementById('pattern').firstChild.outerHTML;
    this.dataService.savePattern(this.id, updatedPattern).subscribe(() => {
        this.saveInstance.emit();
      },
      error => {
        this.showErrorInstance.emit(error);
        this.cancelAndClose();
      }
    );
  }

  cancelAndClose() {
    this.undoInstance.emit();
  }

  setFontSize(event) {
    this.elem.style.fontSize = `${event.value}px`;
  }

  setInnerText(event) {
    const inputValue = event.target.value || event.srcElement.value || event.currentTarget.value;
    this.elem.innerText = `${inputValue}`;
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    return `${value}px`;
  }

  private getFontSizeFromString(): number {
    return +this.elem.style.fontSize.substr(0, this.elem.style.fontSize.length - 2);
  }

}
