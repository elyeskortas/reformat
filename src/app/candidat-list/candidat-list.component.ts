import { Component, OnInit } from '@angular/core';
import { Candidat } from '../models/candidat.model';
import { CandidatService } from '../services/candidat.service';

@Component({
  selector: 'app-candidat-list',
  templateUrl: './candidat-list.component.html',
  styleUrls: ['./candidat-list.component.css']
})
export class CandidatListComponent implements OnInit {
  candidats: Candidat[] = [];

  constructor(private candidatService: CandidatService) { }

  ngOnInit(): void {
    this.getCandidats();
  }

  getCandidats(): void {
    this.candidatService.getAllCandidats()
      .subscribe(candidats => this.candidats = candidats);
  }
}
