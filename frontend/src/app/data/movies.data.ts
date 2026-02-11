import { Movie } from '../models/movie.model';

export const MOVIES: Movie[] = [
  {
    id: 1,
    name: 'Interstellar',
    duration: '2h 49m',
    rating: 8.6,
    image: '/movies/interstellar.jpg',
    description:
      'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival when Earth becomes uninhabitable.',
    cast: [
      {
        name: 'Matthew McConaughey',
        role: 'Actor',
        image: '/movies/mathew.jpg'
      },
      {
        name: 'Anne Hathaway',
        role: 'Actress',
        image: '/movies/anna.jpg'
      },
      {
        name: 'Christopher Nolan',
        role: 'Director',
        image: '/movies/nolan.jpg'
      }
    ]
  },
  {
    id: 2,
    name: 'Inception',
    duration: '2h 28m',
    rating: 8.8,
    image: '/movies/inception.jpg',
    description:
      'A skilled thief who steals corporate secrets through dream-sharing technology is given a chance to erase his past crimes.',
    cast: [
      {
        name: 'Leonardo DiCaprio',
        role: 'Actor',
        image: '/movies/leo.jpg'
      },
      {
        name: 'Joseph Gordon-Levitt',
        role: 'Actor',
        image: '/movies/joseph.jpg'
      },
      {
        name: 'Christopher Nolan',
        role: 'Director',
        image: '/movies/nolan.jpg'
      }
    ]
  },
  {
    id: 3,
    name: 'Avatar',
    duration: '2h 42m',
    rating: 7.9,
    image: '/movies/avatar.jpg',
    description:
      'A paraplegic Marine is dispatched to the moon Pandora on a unique mission and becomes torn between following orders and protecting the world.',
    cast: [
      {
        name: 'Sam Worthington',
        role: 'Actor',
        image: '/movies/sam.jpg'
      },
      {
        name: 'Zoe Saldana',
        role: 'Actress',
        image: '/movies/zoe.jpg'
      },
      {
        name: 'James Cameron',
        role: 'Director',
        image: '/movies/james.jpg'
      }
    ]
  },
  {
    id: 4,
    name: 'The Dark Knight',
    duration: '2h 32m',
    rating: 9.0,
    image: '/movies/dark-knight.jpg',
    description:
      'Batman faces the Joker, a criminal mastermind who plunges Gotham City into chaos and challenges the hero’s moral limits.',
    cast: [
      {
        name: 'Christian Bale',
        role: 'Actor',
        image: '/movies/bale.jpg'
      },
      {
        name: 'Heath Ledger',
        role: 'Actor',
        image: '/movies/heath.jpg'
      },
      {
        name: 'Christopher Nolan',
        role: 'Director',
        image: '/movies/nolan.jpg'
      }
    ]
  }
];
