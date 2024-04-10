import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  email: string;
  position: number;
  rola: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, email: 'Hydrogen', rola: 'H' },
  { position: 2, email: 'Helium',  rola: 'He' },
  { position: 3, email: 'Lithium',  rola: 'Li' },
  { position: 4, email: 'Beryllium', rola: 'Be' },
  { position: 5, email: 'Boron', rola: 'B' },
  { position: 6, email: 'Carbon', rola: 'C' },
  { position: 7, email: 'Nitrogen',  rola: 'N' },
  { position: 8, email: 'Oxygen',  rola: 'O' },
  { position: 9, email: 'Fluorine', rola: 'F' },
  { position: 10, email: 'Neon', rola: 'Ne' },
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'position',
    'email',
    'rola',
    'settings',
  ];

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<PeriodicElement>();
  sort!: MatSort;
  selectedRole: string = '';

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private cdr: ChangeDetectorRef
  ) {}

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.sort = sort;
    this.dataSource.sort = this.sort;
  }

  changeRole(person: PeriodicElement | undefined, newRole: string) {
    if (person) {
      console.log(`Changing role of ${person.email} to ${newRole}`);
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
