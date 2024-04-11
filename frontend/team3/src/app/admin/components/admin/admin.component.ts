import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Admin } from 'src/app/core/models/admin.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'id',
    'email',
    'role',
    'settings',
  ];
  
  dataSource = new MatTableDataSource<Admin>();
  clickedRows = new Set<Admin>();
  sort!: MatSort;
  selectedRole: string = '';

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

  changeRole(person: Admin | undefined, newRole: string) {
    if (person) {
      console.log(`Changing role of ${person.id} to ${newRole}`);
      this.adminService.updateRole(newRole, person.id).subscribe(
        response => {
          console.log('Role updated successfully:', response);
          // Update the role in the table after successful update on the server
          person.role = newRole;
        },
        error => {
          console.error('Error updating role:', error);
          // Handle error
        }
      );
    }
  }

  delete(position: number) {
    console.log('Deleted:', position);
    // Delete the entry
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      console.log(`Sorted ${sortState.direction}ending`);
    } else {
      console.log('Sorting cleared');
    }
  }
}
