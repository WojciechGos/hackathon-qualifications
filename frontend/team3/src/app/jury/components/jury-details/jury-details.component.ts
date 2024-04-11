import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { AllDetails, Pariticipants } from 'src/app/core/models/jury.model';
import { JuryService } from 'src/app/core/services/jury.service';

@Component({
  selector: 'app-jury-details',
  templateUrl: './jury-details.component.html',
  styleUrls: ['./jury-details.component.scss']
})
export class JuryDetailsComponent implements OnInit {
  details: AllDetails | undefined;
  dataSource: any;
  sort: any;
clickedRows: any;
displayedColumns: Iterable<string> | undefined;
id!:number;
  constructor(
    private route: ActivatedRoute,
    private juryService: JuryService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const juryId = +params['id']; // Pobieramy id z parametrów adresu URL
      this.id=juryId;

      // Pobieramy szczegóły zespołu na podstawie id
      this.juryService.getJuryDetails(juryId).subscribe(
        (details: AllDetails) => {
          this.details = details;
        },
        error => {
          console.error('Error fetching jury details:', error);
        }
      );
    });
  }
  downloadPdf(){
    this.juryService.getPdf(this.id).subscribe((data: any) => {
      const blob = new Blob([data], { type: 'application/pdf' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'jury_details.pdf';
      link.click();
      window.URL.revokeObjectURL(link.href);
    });
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
