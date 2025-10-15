export type Driver = {
  id: string;
  name: string;
  rg: string;
  cpf: string;
  birth_date: string;
  phone_number: string;
  commission_percentage: number;
};

export type DriversTable = {
  id: string;
  name: string;
  phone_number: string;
};

export type IDriverForm = {
  id: string;
  name: string;
  rg: string;
  cpf: string;
  birth_date: Date;
  phone_number: string;
  commission_percentage: number;
};

export type DriverState = {
  errors?: {
    name?: string[];
    rg?: string[];
    cpf?: string[];
    birth_date?: string[];
    phone_number?: string[];
    commission_percentage?: string[];
  };
  message?: string | null;
};

export type DriverField = {
  id: string;
  name: string;
};
