export type Trip = {
  id: string;
  truck_id: string;
  driver_id: string;
  origin: string;
  load_city?: string | null;
  destination?: string | null;
  odometer_start?: number | null;
  odometer_loaded_city?: number | null;
  odometer_end?: number | null;
  empty_distance?: number | null;
  load_distance?: number | null;
  fuel_empty_amount?: number | null;
  fuel_empty_media?: number | null;
  fuel_empty_price?: number | null;
  fuel_empty_total?: number | null;
  fuel_loaded_amount?: number | null;
  fuel_loaded_media?: number | null;
  fuel_loaded_price?: number | null;
  fuel_loaded_total?: number | null;
  toll_empty?: number | null;
  toll_loaded?: number | null;
  total_empty?: number | null;
  date_empty?: string | null; // ISO date (YYYY-MM-DD)
  date_loaded?: string | null; // ISO date (YYYY-MM-DD)
  note_number?: string | null;
  load_weight?: number | null;
  load_price?: number | null;
  load_total?: number | null;
  discounts?: number | null;
  meal?: number | null;
  driver_payment?: number | null;
  trip_cost?: number | null;
  trip_profit?: number | null;
};

export type TripsTable = {
  id: string;
  driver_name: string;
  origin: string;
  destination: string;
  date_empty?: string | null;
  date_loaded?: string | null;
};

export type TripForm = {
  truck_id: string;
  driver_id: string;
  origin: string;
  load_city?: string;
  destination?: string;
  odometer_start?: string;
  odometer_loaded_city?: string;
  odometer_end?: string;
  empty_distance?: string;
  load_distance?: string;
  fuel_empty_amount?: string;
  fuel_empty_media?: string;
  fuel_empty_price?: string;
  fuel_empty_total?: string;
  fuel_loaded_amount?: string;
  fuel_loaded_media?: string;
  fuel_loaded_price?: string;
  fuel_loaded_total?: string;
  toll_empty?: string;
  toll_loaded?: string;
  total_empty?: string;
  date_empty?: string;
  date_loaded?: string;
  note_number?: string;
  load_weight?: string;
  load_price?: string;
  load_total?: string;
  discounts?: string;
  meal?: string;
  driver_payment?: string;
  trip_cost?: string;
  trip_profit?: string;
};


export type TripState = {
  errors?: {
    truck_id?: string[];
    driver_id?: string[];
    origin?: string[];
    load_city?: string[];
    destination?: string[];
    odometer_start?: string[];
    odometer_loaded_city?: string[];
    odometer_end?: string[];
    empty_distance?: string[];
    load_distance?: string[];
    fuel_empty_amount?: string[];
    fuel_empty_media?: string[];
    fuel_empty_price?: string[];
    fuel_empty_total?: string[];
    fuel_loaded_amount?: string[];
    fuel_loaded_media?: string[];
    fuel_loaded_price?: string[];
    fuel_loaded_total?: string[];
    toll_empty?: string[];
    toll_loaded?: string[];
    total_empty?: string[];
    date_empty?: string[];
    date_loaded?: string[];
    note_number?: string[];
    load_weight?: string[];
    load_price?: string[];
    load_total?: string[];
    discounts?: string[];
    meal?: string[];
    driver_payment?: string[];
    trip_cost?: string[];
    trip_profit?: string[];
  };
  message?: string | null;
};
