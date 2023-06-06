export interface BusDriverToRegister {
  name: string;
  cc: string;
  license: string;
}

export interface BusDriver {
  name: string;
  cc: string;
  license: string;
  deleted: boolean;
}
