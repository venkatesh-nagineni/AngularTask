export class Coords {
lat: string;
lon: string;
}

export class Params {
  rooms?: number;
  value?: number;
}

export class HousesProps {
  coords: Coords;
  params?: Params;
  street: string;
  distance: number;
}

export class Houses {
  houses: HousesProps[];
}
