export interface Customer {
  id: number;
  last_updated: string;
  attributes: {
    company: string;
    created_at: string;
    email: string;
    id: string;
    last_name: string;
  };
}
