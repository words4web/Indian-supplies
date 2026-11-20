export interface ICompanyAddress {
  streetAddress?: string;
  building?: string;
  city?: string;
  postalCode?: string;
}

export interface IContactPerson {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  business: string;
  addresses?: any[];
  allowCredit?: boolean;
  creditLimit?: number;
  minOrderAmount?: number;
  companyRegistrationNumber?: string;
  vatNumber?: string;
  registeredAddress?: ICompanyAddress;
  directorDetails?: IContactPerson;
  accountsPayable?: IContactPerson;
}

export interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
}

export interface AuthContextValue {
  user: AuthUser | null;
  ready: boolean;
  signIn: (user: AuthUser) => void;
  signOut: () => void;
}
