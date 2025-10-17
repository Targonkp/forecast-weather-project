export interface Location {
  name: string;
  country: string;
  state?: string;
  local_names?: {
    [key: string]: string;
  };
}
