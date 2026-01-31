export interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  imageUrl: string;
  pricePerSong: number;
  songDuration: number; // in minutes
}

export interface PerformanceSlot {
  id: string;
  venueId: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number; // in hours
  availableSlots: number;
  bookedPerformers: number;
}

export interface Booking {
  id: string;
  venueId: string;
  slotId: string;
  performerName: string;
  numberOfSongs: number;
  totalPrice: number;
  paymentMethod: 'payme' | 'fps' | 'bank-transfer' | 'pending';
  paymentStatus: 'pending' | 'completed' | 'failed';
  performanceOrder?: number;
  bookingDate: Date;
  phoneNumber: string;
  email?: string;
}

export interface Performer {
  name: string;
  numberOfSongs: number;
  duration: number;
  order: number;
}

export type PaymentMethod = 'payme' | 'fps' | 'bank-transfer';
