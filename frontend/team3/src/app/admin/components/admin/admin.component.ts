import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

export interface PeriodicElement {
  name: string;
  position: number;
  last_name: string;
  rola: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', last_name: 'Be', rola: 'H' },
  { position: 2, name: 'Helium', last_name: 'Be', rola: 'He' },
  { position: 3, name: 'Lithium', last_name: 'Be', rola: 'Li' },
  { position: 4, name: 'Beryllium', last_name: 'Be', rola: 'Be' },
  { position: 5, name: 'Boron', last_name: 'Be', rola: 'B' },
  { position: 6, name: 'Carbon', last_name: 'Be', rola: 'C' },
  { position: 7, name: 'Nitrogen', last_name: 'Be', rola: 'N' },
  { position: 8, name: 'Oxygen', last_name: 'Be', rola: 'O' },
  { position: 9, name: 'Fluorine', last_name: 'Be', rola: 'F' },
  { position: 10, name: 'Neon', last_name: 'Be', rola: 'Ne' },
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatButtonModule, MatMenuModule, MatSelectModule, FormsModule], 
})
export class AdminComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'last_name', 'rola', 'settings'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<PeriodicElement>();
  sort!: MatSort; 
  selectedRole: string = ''; 

  constructor(private _liveAnnouncer: LiveAnnouncer, private cdr: ChangeDetectorRef) {}

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.sort = sort;
    this.dataSource.sort = this.sort;
  }

  changeRole(person: PeriodicElement | undefined, newRole: string) {
    if (person) {
      console.log(`Changing role of ${person.name} to ${newRole}`);
      person.rola = newRole;
      // Implement your logic here to update the role in the database or perform other actions
    }

    this.cdr.detectChanges(); // Refresh the view after changing data
  }

  delete(position: number) {
    console.log('Deleted:', position);
    // Delete the entry
    this.cdr.detectChanges(); 
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
