import { Component, OnInit } from '@angular/core';
import { Election } from '../models/election.model';
import { ElectionService } from '../services/election.service';

@Component({
  selector: 'app-election-list',
  templateUrl: './election-list.component.html',
  styleUrls: ['./election-list.component.css']
})
export class ElectionListComponent implements OnInit {
  elections: Election[] = [];

  constructor(private electionService: ElectionService) { }

  ngOnInit(): void {
    this.loadElections();
  }

  loadElections(): void {
    this.electionService.getElections()
      .subscribe(
        elections => {
          this.elections = elections;
          console.log('Elections dans le composant:', this.elections); // Ajouter ceci pour loguer les élections dans le composant
        },
        error => console.error('Erreur lors de la récupération des élections:', error)
      );
  }
}
