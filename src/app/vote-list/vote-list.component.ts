import { Component, OnInit } from '@angular/core';
import { Vote } from '../models/vote.model';
import { VoteService } from '../services/vote.service';

@Component({
  selector: 'app-vote-list',
  templateUrl: './vote-list.component.html',
  styleUrls: ['./vote-list.component.css']
})
export class VoteListComponent implements OnInit {
  votes: Vote[] = [];

  constructor(private voteService: VoteService) { }

  ngOnInit(): void {
    this.loadAllVotes();
  }

  loadAllVotes(): void {
    this.voteService.getAllVotes()
      .subscribe(votes => {
        this.votes = votes;
      }, error => {
        console.error('Erreur lors du chargement des votes :', error);
      });
  }
}
