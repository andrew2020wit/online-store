export class StatusMessageDto {
  message: string;
  source: string;
  ok: boolean;
  resultId?: string;
  constructor(source: string) {
    this.message = '';
    this.ok = false;
    this.source = source;
  }
}
