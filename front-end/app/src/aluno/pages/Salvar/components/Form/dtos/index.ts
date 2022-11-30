export interface ICreateUseHistory {
  button: HTMLButtonElement;
  title: HTMLInputElement;
  description: HTMLTextAreaElement;
}

export interface IHistoryRequest {
  name: string;
  description: string;
}
export interface IHistoryResponse {
  description: string;
  name: string;
  room_id: string;
  room_token: string;
  token: string;
  average: number;
  round: number;
  id: string;
}
