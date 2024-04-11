import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Admin } from 'src/app/core/models/admin.model';
import { AdminService } from 'src/app/core/services/admin.service';



export interface PeriodicElement {
  email: string;
  position: number;
  UserRole: string;
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'id',
    'email',
    'UserRole',
    'settings',
  ];
  

  dataSource = new MatTableDataSource<Admin>;
  clickedRows = new Set<Admin>();
  sort!: MatSort;
  selectedRole: string = '';
  cdr: any;
  _liveAnnouncer: any;

  constructor(private adminService: AdminService) {}

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.sort = sort;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.getAdmin();
  }

  getAdmin() {
    this.adminService.getAllEntries().subscribe(
      (admins: Admin[]) => {
        admins.forEach((admin, index) => {
          admin.id = index + 1;
        });
        this.dataSource.data = admins;
        console.log('Admin:', admins);
      },
      error => {
        console.error('Error fetching admin:', error);
      }
    );
  }


  changerole(person: Admin | undefined, newStatus: string) {
    if (person) {
      console.log(`Changing status of ${person.id} to ${newStatus}`);
      this.adminService.updateEntrie(newStatus, person.id).subscribe(
        response => {
          console.log('Status updated successfully:', response);
          // Aktualizacja statusu w tabeli po udanej aktualizacji na serwerze
          person.UserRole = newStatus;
        },
        error => {
          console.error('Error updating status:', error);
          // Obsługa błędu
        }
      );
    }
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
