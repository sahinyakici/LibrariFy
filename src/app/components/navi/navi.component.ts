import { SharedService } from './../../services/shared.service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrl: './navi.component.css',
})
export class NaviComponent {
  filterText: string = '';
  constructor(private sharedService: SharedService) {}
  onFilterTextChange() {
    this.sharedService.setFilterText(this.filterText);
  }
}
