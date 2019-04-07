import {AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {ImitationDataServerService} from '../../core/imitation-data-server.service';
import {BehaviorSubject} from 'rxjs';
import {Pattern} from '../../core/interfaces';
import {PanelForChangeTextAndFontSizeComponent} from './panel-for-change-text-and-font-size.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-template-page',
  templateUrl: './template-page.component.html',
  styleUrls: ['./template-page.component.css']
})

export class TemplatePageComponent implements OnInit, AfterViewInit {
  pattern = new BehaviorSubject<Pattern>(undefined);

  @ViewChild('panelForChangeTextAndFontSizeComponent', {read: ViewContainerRef}) popupEntry: ViewContainerRef;
  loading: boolean;

  constructor(private router: Router,
              private elementRef: ElementRef,
              public snackBar: MatSnackBar,
              private resolver: ComponentFactoryResolver,
              private dataService: ImitationDataServerService) {
  }

  ngOnInit() {
    this.dataService.loadingProcess.subscribe(value => this.loading = value);
    this.getPattern();
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.querySelector('#pattern')
      .addEventListener('selectstart', this.onSelectStart.bind(this));
  }

  getPattern() {
    const routeURLtoArray = this.router.url.split('/');
    const patternId = parseFloat(routeURLtoArray[routeURLtoArray.length - 1]);
    const patternExist = () => {
      return !!this.dataService.templates.value.find(item => item.id === patternId);
    };

    const redirectToTemplateListPage = () => {
      this.router.navigate(['/patterns']);
    };

    const setCurrentPatternValue = () => {
      this.pattern.next(this.dataService.templates.value.find(item => item.id === patternId));
    };

    if (patternExist()) {
      setCurrentPatternValue();
    } else {
      redirectToTemplateListPage();
    }
  }

  onSelectStart(event: any) {

    const target = event.target || event.srcElement || event.currentTarget;
    const elem = target.parentElement;

    const factory = this.resolver.resolveComponentFactory(PanelForChangeTextAndFontSizeComponent);
    let componentRef;
    componentRef = this.popupEntry.createComponent(factory);

    componentRef.instance.elem = elem;
    componentRef.instance.id = this.pattern.value.id;
    componentRef.instance.undoInstance.subscribe(() => {
      this.closePanel();
    });
    componentRef.instance.showErrorInstance.subscribe(
      error =>
        this.showPopUp(`Произошла ошибка сохранения ${error}`, 'OK')
    );
    componentRef.instance.saveInstance.subscribe(() => {
      this.showToast('Успешно сохранено!');
      this.closePanel();
    });
  }

  closePanel() {
    this.popupEntry.clear();
  }

  showPopUp(textString: string, action?: string) {
    this.snackBar.open(textString, action, {
      duration: 150000000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: 'snack-bar-pop-up'
    });
  }

  showToast(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'snack-bar-toast'
    });
  }


}
