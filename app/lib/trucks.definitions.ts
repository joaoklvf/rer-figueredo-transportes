export type Truck = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};

export type TrucksTable = {
  id: string;
  license_plate: string;
  renavam: string;
  chassi: string;
  truck_brand: string;
  color: string;
  year: string;
  mileage: string;
};

export type TruckForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
