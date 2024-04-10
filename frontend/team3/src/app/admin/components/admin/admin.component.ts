import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild,inject} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { ChangeDetectorRef } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  last_name: string;
  rola: string;
  
  
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', last_name: 'Be', rola: 'H'},
  {position: 2, name: 'Helium', last_name: 'Be', rola: 'He'},
  {position: 3, name: 'Lithium', last_name: 'Be', rola: 'Li'},
  {position: 4, name: 'Beryllium', last_name: 'Be', rola: 'Be'},
  {position: 5, name: 'Boron', last_name: 'Be', rola: 'B'},
  {position: 6, name: 'Carbon', last_name: 'Be', rola: 'C'},
  {position: 7, name: 'Nitrogen', last_name: 'Be', rola: 'N'},
  {position: 8, name: 'Oxygen', last_name: 'Be', rola: 'O'},
  {position: 9, name: 'Fluorine', last_name: 'Be', rola: 'F'},
  {position: 10, name: 'Neon', last_name: 'Be', rola: 'Ne'},
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatSortModule,MatButtonModule, MatMenuModule,MatSelectModule],
})
export class AdminComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'last_name', 'rola','settings'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<PeriodicElement>();
  sort!: MatSort; // Definite assignment assertion

  constructor(private _liveAnnouncer: LiveAnnouncer, private cdr: ChangeDetectorRef) {}

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.sort = sort;
    this.dataSource.sort = this.sort;
  }
  
  changeRole(position: number,rola: string, person: PeriodicElement) {
    // Tutaj możesz zaimplementować logikę zmiany roli osoby
    console.log('position:', position);
    console.log(`Changing role of ${person.rola} to ${rola}`);
    // Na przykład możesz wysłać żądanie do serwera lub zmienić wartość 'group' dla danej osoby w źródle danych
    
    this.cdr.detectChanges();
  }
  delete(){

    //usuwanie postaci
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