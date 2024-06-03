export interface Event {
    id?: number;
    nom: string;
    description: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    isPlaying: boolean;
    isPaused: boolean;
    electionId: number;
    restrictionId: number;
  }
  