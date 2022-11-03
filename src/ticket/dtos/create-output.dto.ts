export class PaidTicketOutput {
  createPersonId: number;
  relatedPersonId: number;
  approverPersonId: number;
  substitutePersonId: number;
  ticketStatusId: number;
  startTime: Date;
  endTime: Date;
  reason: string;
  typePaidId: number;
}
