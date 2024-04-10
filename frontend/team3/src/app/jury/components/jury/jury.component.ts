import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Jury } from 'src/app/core/models/jury.model';
import { JuryService } from 'src/app/core/services/jury.service';

@Component({
  selector: 'app-jury',
  templateUrl: './jury.component.html',
  styleUrls: ['./jury.component.scss'],
})
export class JuryComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'teamName', 'status', 'settings'];
  dataSource = new MatTableDataSource<Jury>();
  clickedRows = new Set<Jury>();
  sort!: MatSort;
  selectedRole: string = '';

  constructor(private juryService: JuryService) {}

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.sort = sort;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.getJury();
  }

  getJury() {
    this.juryService.getAllEntries().subscribe(
      (juries: Jury[]) => {
        juries.forEach((jury, index) => {
          jury.id = index + 1;
        });
        this.dataSource.data = juries;
        console.log('Jury:', juries);
      },
      error => {
        console.error('Error fetching jury:', error);
      }
    );
  }

  changeRole(person: Jury | undefined, newRole: string) {
    if (person) {
      console.log(`Changing role of ${person.email} to ${newRole}`);
      person.status = newRole;
      // Implement your logic here to update the role in the database or perform other actions
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
