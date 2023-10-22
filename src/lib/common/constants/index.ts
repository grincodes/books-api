export interface UpdateResponse {
  id: string;
  status: boolean;
}

export interface DeletedResponse {
  id: string;
  status: boolean;
}

export interface CreateResponse {
  id: string;
  status?: string;
}
