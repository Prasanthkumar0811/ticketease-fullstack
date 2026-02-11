import { Theatre } from "../models/theatre.model";

export const THEATRES: Theatre[] = [
  {
    id: 1,
    name: 'Srinivas Theatre',
    shows: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
    seatCategories:[
        {
            type:'BALCONY',
            price:250,
            rows:['A','B'],
            seatsPerRow:10
        },
         {
        type: 'FIRST',
        price: 180,
        rows: ['C', 'D', 'E'],
        seatsPerRow: 14
      },
      {
        type: 'BOX',
        price: 300,
        rows: ['F'],
        seatsPerRow: 6
      }
    ]
  },
  {
    id: 2,
    name: 'Sakthi Cinemas',
    shows: ['9:30 AM', '12:30 PM', '3:30 PM', '6:30 PM', '9:30 PM'],
    seatCategories:[
        {
            type:'BALCONY',
            price:200,
            rows:['A','B'],
            seatsPerRow:10
        },
         {
        type: 'FIRST',
        price: 180,
        rows: ['C', 'D', 'E'],
        seatsPerRow: 14
      },
      {
        type: 'BOX',
        price: 300,
        rows: ['F','G'],
        seatsPerRow: 6
      }
    ]
  },
  {
    id: 3,
    name: 'Shivan Cinemas',
    shows: ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'],
     seatCategories: [
      {
        type: 'BALCONY',
        price: 480,
        rows: ['A', 'B'],
        seatsPerRow: 12
      },
      {
        type: 'FIRST',
        price: 280,
        rows: ['C', 'D', 'E', 'F'],
        seatsPerRow: 16
      },
      {
        type: 'BOX',
        price: 600,
        rows: ['G'],
        seatsPerRow: 8
      }
    ]
  },
  {
    id: 4,
    name: 'Sri Sakthi Screens',
    shows: [
      '9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM',
      '3:00 PM', '4:30 PM', '6:00 PM', '7:30 PM',
      '9:00 PM', '10:30 PM', '11:45 PM', '12:30 AM'
    ],
     seatCategories: [
      {
        type: 'BALCONY',
        price: 480,
        rows: ['A', 'B'],
        seatsPerRow: 12
      },
      {
        type: 'FIRST',
        price: 280,
        rows: ['C', 'D', 'E', 'F'],
        seatsPerRow: 16
      },
      {
        type: 'BOX',
        price: 600,
        rows: ['G'],
        seatsPerRow: 8
      }
    ]
  },
  {
    id: 5,
    name: 'Diamond Multiplex',
    shows: ['10:15 AM', '1:15 PM', '4:15 PM', '7:15 PM', '9:45 PM', '11:30 PM'],
     seatCategories: [
      {
        type: 'BALCONY',
        price: 480,
        rows: ['A', 'B'],
        seatsPerRow: 12
      },
      {
        type: 'FIRST',
        price: 280,
        rows: ['C', 'D', 'E', 'F'],
        seatsPerRow: 16
      },
      {
        type: 'BOX',
        price: 600,
        rows: ['G'],
        seatsPerRow: 8
      }
    ]
  }
];