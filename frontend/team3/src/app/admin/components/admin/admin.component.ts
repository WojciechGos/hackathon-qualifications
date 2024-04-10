import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';


export interface PeriodicElement {
  name: string;
  position: number;
  last_name: string;
  group: string;
  
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', last_name: 'Be', group: 'H'},
  {position: 2, name: 'Helium', last_name: 'Be', group: 'He'},
  {position: 3, name: 'Lithium', last_name: 'Be', group: 'Li'},
  {position: 4, name: 'Beryllium', last_name: 'Be', group: 'Be'},
  {position: 5, name: 'Boron', last_name: 'Be', group: 'B'},
  {position: 6, name: 'Carbon', last_name: 'Be', group: 'C'},
  {position: 7, name: 'Nitrogen', last_name: 'Be', group: 'N'},
  {position: 8, name: 'Oxygen', last_name: 'Be', group: 'O'},
  {position: 9, name: 'Fluorine', last_name: 'Be', group: 'F'},
  {position: 10, name: 'Neon', last_name: 'Be', group: 'Ne'},
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatSortModule],
})
export class AdminComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'last_name', 'group'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  sort!: MatSort; // Definite assignment assertion

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.sort = sort;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
