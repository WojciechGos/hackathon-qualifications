export interface User {
  nameAndSurname: string;
  email: string;
}

export interface Team {
  teamName: string;
  teamDescription: string;
  participantNumber: number;
  participantList: User[];
  status: string;
  fileName: string | null;
  filePath: string | null;
}

export interface TeamWithPdf {
  team: Team;
  pdfPath: File
}

export interface Pdf{
  pdfFile: File
}