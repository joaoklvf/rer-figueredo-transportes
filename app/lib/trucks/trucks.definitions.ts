export type Truck = {
  id: string;
  license_plate: string;
  renavam: string;
  chassi: string;
  truck_brand: string;
  color: string;
  year: string;
  mileage: string;
};

export type TrucksTable = {
  id: string;
  license_plate: string;
  truck_brand: string;
  color: string;
  year: string;
};

export type TruckForm = {
  id: string;
  license_plate: string;
  renavam: string;
  chassi: string;
  truck_brand: string;
  color: string;
  year: string;
  mileage: string;
};

export type TruckState = {
  errors?: {
    license_plate?: string[];
    renavam?: string[];
    chassi?: string[];
    truck_brand?: string[];
    color?: string[];
    year?: string[];
    mileage?: string[];
  };
  message?: string | null;
};

export type TruckField = {
  id: string;
  license_plate: string;
};
