export interface Electeur {
    id: number;
    prenom: string;
    nom: string;
    dateNaissance: Date;
    email: string;
    listeElectorale: any; // Modifier selon la structure de votre modèle ListeElectorale
  }
  