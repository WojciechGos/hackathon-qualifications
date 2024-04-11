import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { UserService } from 'src/app/core/services/user.service';
import { Team, TeamWithPdf } from 'src/app/core/models/team.model';

@Component({
  selector: 'app-my-entries',
  templateUrl: './my-entries.component.html',
  styleUrls: ['./my-entries.component.scss']
})
export class MyEntriesComponent implements OnInit {
  team: Team | null = null; // Dodajemy nową zmienną do przechowywania danych zespołu

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadMyEntries();
  }

  loadMyEntries() {
    this.userService.getTeam().subscribe({
      next: (team: Team) => {
        this.team = team; 
        console.log('Zgłoszenia użytkownika:', team)
      },
      error: (error) => {
        console.error('Wystąpił błąd podczas pobierania zgłoszeń użytkownika:', error);
      }
    });
  }
}
