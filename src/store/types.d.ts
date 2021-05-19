export type GraphQLResponse<T> = {
  errors?: Array<unknown>;
  data?: T;
};

export type AreaPermitZone = {
  value: string;
  text: string;
};

export type AreaPermit = {
  licensePlate: string;
  zone: AreaPermitZone;
  isValid: boolean;
};

export type State = {
  loading: boolean;
  zones: Array<AreaPermitZone>;
  permit?: AreaPermit;
  error?: string;
};
