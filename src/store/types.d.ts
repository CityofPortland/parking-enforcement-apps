export type GraphQLResponse<T> = {
  errors?: Array<unknown>;
  data?: T;
};

export type AreaPermitZone = {
  id: string;
  name?: string;
  displayName: string;
  visitorLimit: string;
  enforcementHours: string;
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
};
