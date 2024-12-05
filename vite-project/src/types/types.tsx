export interface AddressField {
  value: string;
}

export interface Contact {
  name: string;
  phoneNumber: string;
  email: string;
  addresses: AddressField[];
  longitude: number;
  latitude: number;
}
