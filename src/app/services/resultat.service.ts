import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resultat } from '../models/resultat.model';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ResultatService {
  private baseUrl = 'https://127.0.0.1:8000/api/resultats';

  constructor(private http: HttpClient) { }

  getAllResultats(): Observable<Resultat[]> {
    return this.http.get<Resultat[]>(this.baseUrl);
  }

  getResultatById(id: number): Observable<Resultat> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Resultat>(url);
  }

  createResultat(resultat: Resultat): Observable<Resultat> {
    return this.http.post<Resultat>(this.baseUrl, resultat);
  }

  updateResultat(id: number, resultat: Resultat): Observable<Resultat> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Resultat>(url, resultat);
  }

  deleteResultat(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  getResultsByElection(electionId: number): Observable<Resultat[]> {
    const url = `${this.baseUrl}?electionId=${electionId}`;
    return this.http.get<Resultat[]>(url);
  }
  visualizeResults(resultats: Resultat[]): void {
    const labels = resultats.map(resultat => resultat.candidat);
    const data = resultats.map(resultat => resultat.totalVotes);

    // Récupérer l'élément HTML
    const ctx = document.getElementById('resultatsChart');

    // Vérifier si l'élément HTML existe
    if (ctx instanceof HTMLCanvasElement) {
      // Créer le graphique
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Nombre de votes',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Impossible de trouver l\'élément HTML pour le graphique.');
    }
  }
  generateCharts(): Observable<any> {
    // Ajoutez le code pour la génération de graphiques ici
    return new Observable(observer => {
        // Récupérer les résultats
        this.getAllResultats().subscribe(resultats => {
            // Appeler la méthode pour visualiser les résultats
            this.visualizeResults(resultats);
            // Renvoyer une confirmation que les graphiques ont été générés
            observer.next('Les graphiques ont été générés avec succès');
            observer.complete();
        }, error => {
            // En cas d'erreur, renvoyer l'erreur
            observer.error('Une erreur est survenue lors de la récupération des résultats');
        });
    });
}
  downloadResultsAsCSV(electionId: number): Observable<Blob> {
    const url = `${this.baseUrl}/download/csv?electionId=${electionId}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
