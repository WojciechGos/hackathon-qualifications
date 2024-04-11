import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Jury, JuryStatus } from 'src/app/core/models/jury.model';
import { JuryService } from 'src/app/core/services/jury.service';
import { Router } from '@angular/router';
import { RouterEnum } from 'src/enums/router.enum';
@Component({
  selector: 'app-jury',
  templateUrl: './jury.component.html',
  styleUrls: ['./jury.component.scss'],
})
export class JuryComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'teamName', 'status','details', 'settings'];
  dataSource = new MatTableDataSource<Jury>();
  clickedRows = new Set<Jury>();
  sort!: MatSort;
  selectedStatus: string = '';

  constructor(private juryService: JuryService,private router: Router) {}

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
        this.dataSource.data = juries;
        console.log('Jury:', juries);
      },
      error => {
        console.error('Error fetching jury:', error);
      }
    );
  }

  goToDetails(element: any) {
    this.router.navigate([RouterEnum.jurydetails, element.id]); // Przekazujemy Id zespołu jako parametr
  }
  

  changeStatus(person: JuryStatus| undefined, newStatus: string) {
    if (person) {
      console.log(`Changing status of ${person.id} to ${newStatus}`);
      this.juryService.updateEntrie(newStatus, person.id).subscribe(
        response => {
          console.log('Status updated successfully:', response);
          person.status = newStatus;
        },
        error => {
          console.error('Error updating status:', error);

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
