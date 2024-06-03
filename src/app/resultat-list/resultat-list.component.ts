import { Component, OnInit } from '@angular/core';
import { Resultat } from '../models/resultat.model';
import { ResultatService } from '../services/resultat.service';

@Component({
  selector: 'app-resultat-list',
  templateUrl: './resultat-list.component.html',
  styleUrls: ['./resultat-list.component.css']
})
export class ResultatListComponent implements OnInit {
  resultats: Resultat[] = [];
  electionId: number = 0; // Déclaration de la propriété electionId

  constructor(private resultatService: ResultatService) { }

  ngOnInit(): void {
    // Charge tous les résultats par défaut
    this.loadAllResultats();
  }

  loadAllResultats(): void {
    // Appeler le service pour récupérer tous les résultats
    this.resultatService.getAllResultats()
      .subscribe(resultats => {
        this.resultats = resultats;
        // Appeler la méthode pour générer les graphiques
        this.resultatService.generateCharts().subscribe(() => {
          console.log('Graphiques générés avec succès');
        }, error => {
          console.error('Erreur lors de la génération des graphiques :', error);
        });
      }, error => {
        console.error('Erreur lors du chargement des résultats :', error);
      });
  }

  loadResultatsByElection(electionId: number): void {
    // Appeler le service pour récupérer les résultats par élection
    this.resultatService.getResultsByElection(electionId)
      .subscribe(resultats => {
        this.resultats = resultats;
        // Appeler la méthode pour générer les graphiques
        this.resultatService.generateCharts().subscribe(() => {
          console.log('Graphiques générés avec succès');
        }, error => {
          console.error('Erreur lors de la génération des graphiques :', error);
        });
      }, error => {
        console.error('Erreur lors du chargement des résultats par élection :', error);
      });
  }
  downloadResultsAsCSV(): void {
    // Appeler le service pour télécharger les résultats au format CSV
    this.resultatService.downloadResultsAsCSV(this.electionId)
      .subscribe(blob => {
        // Créer un lien de téléchargement pour le fichier CSV
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resultats.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      }, error => {
        console.error('Erreur lors du téléchargement des résultats au format CSV :', error);
      });
  }
}
