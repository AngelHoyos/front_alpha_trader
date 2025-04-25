export interface DataUser {
    profilePicture?: string;
    FullName: string;
    Email: string;
    DateOfBirth: string | Date;
    telefono: string;
    Password: string;
  
    Status?: boolean;
    coinsList?: Array<string>;
    googleId?: string;
    facebookId?: string;
    acceptedTerms?: boolean;
  }
  export interface ApiResponse<T> {
    status: boolean;
    message: string;
    data: T;
  }
  export interface RawUserData {
    ID: string;
    Email: string;
    FullName: string;
    DateOfBirth: string;
    Status: boolean;
    Password: string;
    googleId: string | null;
    facebookId: string | null;
    DateOfRegistry: string;
    Telefono: string;
    acceptedTerms: boolean;
    profilePicture: string;
    public_id: string;
    coinsList?: string[]; 
  }
  
  export const normalizeUserData = (rawData: RawUserData): DataUser => ({
    FullName: rawData.FullName,
    Email: rawData.Email,
    DateOfBirth: rawData.DateOfBirth,
    telefono: rawData.Telefono,
    Password: rawData.Password,
    profilePicture: rawData.profilePicture,
    Status: rawData.Status,
    acceptedTerms: rawData.acceptedTerms,
    googleId: rawData.googleId ?? undefined,
    facebookId: rawData.facebookId ?? undefined,
    coinsList: rawData.coinsList ?? [],
  });
  