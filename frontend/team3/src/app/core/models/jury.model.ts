import { InteractivityChecker } from "@angular/cdk/a11y";

  export interface Jury {
    id:number;
    teamName: string;
    email: string;
    status: string;
    
  }
  export interface JuryPdf{
    pdfFile: Blob;
  }

export interface AllDetails{
  id:number;
  teamName: string;
  teamDescription: string;
  participantNumber:number;
  status: string;
  participantList: Pariticipants[]
}
export interface Pariticipants{
  id:number;
  nameAndSurname: string;
  email: string;
  
}
  export interface JuryStatus{

    id:number;
    status: string;

  }

