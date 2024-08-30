export interface Task {
    id: number;
    name: string;
    cgSupervisor2_name:string;
    cgArtist_name:string;
    type: string;
    dateCreated: string;
    dateDue: string;
    completed: boolean;
    producerID: number;
    supervisorID: number;
    cgArtistId: number | null;
    PRODUCTIONId: number;
  }