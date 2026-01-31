import { Venue, PerformanceSlot, Booking, Performer } from './types';

// Mock venues data
export const venues: Venue[] = [
  {
    id: 'v1',
    name: '星空舞台',
    location: '香港中環',
    capacity: 50,
    imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
    pricePerSong: 200,
    songDuration: 4,
  },
  {
    id: 'v2',
    name: '夜光音樂廳',
    location: '香港尖沙咀',
    capacity: 80,
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
    pricePerSong: 200,
    songDuration: 4,
  },
  {
    id: 'v3',
    name: '銀河劇場',
    location: '香港銅鑼灣',
    capacity: 100,
    imageUrl: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800',
    pricePerSong: 200,
    songDuration: 4,
  },
  {
    id: 'v4',
    name: '璀璨Live House',
    location: '香港旺角',
    capacity: 60,
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800',
    pricePerSong: 200,
    songDuration: 4,
  },
];

// Generate performance slots
export const generatePerformanceSlots = (): PerformanceSlot[] => {
  const slots: PerformanceSlot[] = [];
  const today = new Date();
  
  venues.forEach((venue) => {
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Generate 3 slots per day: afternoon, evening, night
      const times = [
        { start: '14:00', end: '17:00' },
        { start: '18:00', end: '21:00' },
        { start: '21:30', end: '00:30' },
      ];
      
      times.forEach((time, index) => {
        slots.push({
          id: `${venue.id}-${i}-${index}`,
          venueId: venue.id,
          date: date,
          startTime: time.start,
          endTime: time.end,
          duration: 3,
          availableSlots: 15,
          bookedPerformers: Math.floor(Math.random() * 5),
        });
      });
    }
  });
  
  return slots;
};

// Smart scheduling algorithm
export const generateLineup = (bookings: Booking[]): Performer[] => {
  const performers: Performer[] = bookings.map((booking, index) => ({
    name: booking.performerName,
    numberOfSongs: booking.numberOfSongs,
    duration: booking.numberOfSongs * 4,
    order: index + 1,
  }));
  
  // Shuffle for fairness
  return performers.sort(() => Math.random() - 0.5);
};

// Calculate total cost
export const calculateCost = (numberOfSongs: number, pricePerSong: number = 200): number => {
  return numberOfSongs * pricePerSong;
};
