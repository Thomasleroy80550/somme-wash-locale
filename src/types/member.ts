
export interface MemberProfile {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
  };
  businessInfo: {
    profileType: 'gite' | 'grand-compte';
    numberOfProperties: number;
    totalCapacity: number;
    location: string;
    description?: string;
  };
  preferences: {
    deliveryDelay: 'j-1' | 'j-2' | 'j-3';
    services: string[];
    specialRequests?: string;
  };
  status: 'pending' | 'validated' | 'priority';
  registrationDate: string;
  position?: number;
}

export interface WaitingListStats {
  totalMembers: number;
  averageWaitTime: string;
  nextUpdateDate: string;
}
