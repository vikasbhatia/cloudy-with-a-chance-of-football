import { toISODate } from '../utils/temperature.js'

const raw = [
  {
    group: 'A',
    matches: [
      { date: 'Thu, Jun 11', home: 'Mexico',       away: 'South Africa', city: 'Mexico City' },
      { date: 'Thu, Jun 11', home: 'South Korea',  away: 'Czechia',      city: 'Guadalajara' },
      { date: 'Thu, Jun 18', home: 'Czechia',      away: 'South Africa', city: 'Atlanta' },
      { date: 'Thu, Jun 18', home: 'Mexico',       away: 'South Korea',  city: 'Guadalajara' },
      { date: 'Wed, Jun 24', home: 'Czechia',      away: 'Mexico',       city: 'Mexico City' },
      { date: 'Wed, Jun 24', home: 'South Africa', away: 'South Korea',  city: 'Monterrey' },
    ],
  },
  {
    group: 'B',
    matches: [
      { date: 'Fri, Jun 12', home: 'Canada',                   away: 'Bosnia and Herzegovina', city: 'Toronto' },
      { date: 'Sat, Jun 13', home: 'Qatar',                    away: 'Switzerland',            city: 'San Francisco' },
      { date: 'Thu, Jun 18', home: 'Switzerland',              away: 'Bosnia and Herzegovina', city: 'Los Angeles' },
      { date: 'Thu, Jun 18', home: 'Canada',                   away: 'Qatar',                  city: 'Vancouver' },
      { date: 'Wed, Jun 24', home: 'Switzerland',              away: 'Canada',                 city: 'Vancouver' },
      { date: 'Wed, Jun 24', home: 'Bosnia and Herzegovina',   away: 'Qatar',                  city: 'Seattle' },
    ],
  },
  {
    group: 'C',
    matches: [
      { date: 'Sat, Jun 13', home: 'Brazil',   away: 'Morocco',  city: 'New York/New Jersey' },
      { date: 'Sat, Jun 13', home: 'Haiti',    away: 'Scotland', city: 'Boston' },
      { date: 'Fri, Jun 19', home: 'Scotland', away: 'Morocco',  city: 'Boston' },
      { date: 'Fri, Jun 19', home: 'Brazil',   away: 'Haiti',    city: 'Philadelphia' },
      { date: 'Wed, Jun 24', home: 'Scotland', away: 'Brazil',   city: 'Miami' },
      { date: 'Wed, Jun 24', home: 'Morocco',  away: 'Haiti',    city: 'Atlanta' },
    ],
  },
  {
    group: 'D',
    matches: [
      { date: 'Fri, Jun 12', home: 'United States', away: 'Paraguay',      city: 'Los Angeles' },
      { date: 'Fri, Jun 12', home: 'Australia',     away: 'Turkiye',       city: 'Vancouver' },
      { date: 'Fri, Jun 19', home: 'United States', away: 'Australia',     city: 'Seattle' },
      { date: 'Thu, Jun 18', home: 'Turkiye',       away: 'Paraguay',      city: 'San Francisco' },
      { date: 'Thu, Jun 25', home: 'Turkiye',       away: 'United States', city: 'Los Angeles' },
      { date: 'Thu, Jun 25', home: 'Paraguay',      away: 'Australia',     city: 'San Francisco' },
    ],
  },
  {
    group: 'E',
    matches: [
      { date: 'Sun, Jun 14', home: 'Germany',     away: 'Curacao',     city: 'Houston' },
      { date: 'Sun, Jun 14', home: 'Ivory Coast', away: 'Ecuador',     city: 'Philadelphia' },
      { date: 'Sat, Jun 20', home: 'Germany',     away: 'Ivory Coast', city: 'Toronto' },
      { date: 'Sat, Jun 20', home: 'Ecuador',     away: 'Curacao',     city: 'Kansas City' },
      { date: 'Thu, Jun 25', home: 'Ecuador',     away: 'Germany',     city: 'New York/New Jersey' },
      { date: 'Thu, Jun 25', home: 'Curacao',     away: 'Ivory Coast', city: 'Philadelphia' },
    ],
  },
  {
    group: 'F',
    matches: [
      { date: 'Sun, Jun 14', home: 'Netherlands', away: 'Japan',       city: 'Dallas' },
      { date: 'Sun, Jun 14', home: 'Sweden',      away: 'Tunisia',     city: 'Monterrey' },
      { date: 'Sat, Jun 20', home: 'Netherlands', away: 'Sweden',      city: 'Houston' },
      { date: 'Fri, Jun 19', home: 'Tunisia',     away: 'Japan',       city: 'Monterrey' },
      { date: 'Thu, Jun 25', home: 'Japan',       away: 'Sweden',      city: 'Dallas' },
      { date: 'Thu, Jun 25', home: 'Tunisia',     away: 'Netherlands', city: 'Kansas City' },
    ],
  },
  {
    group: 'G',
    matches: [
      { date: 'Mon, Jun 15', home: 'Belgium',     away: 'Egypt',       city: 'Seattle' },
      { date: 'Mon, Jun 15', home: 'Iran',        away: 'New Zealand', city: 'Los Angeles' },
      { date: 'Sun, Jun 21', home: 'Belgium',     away: 'Iran',        city: 'Los Angeles' },
      { date: 'Sun, Jun 21', home: 'New Zealand', away: 'Egypt',       city: 'Vancouver' },
      { date: 'Fri, Jun 26', home: 'Egypt',       away: 'Iran',        city: 'Seattle' },
      { date: 'Fri, Jun 26', home: 'New Zealand', away: 'Belgium',     city: 'Vancouver' },
    ],
  },
  {
    group: 'H',
    matches: [
      { date: 'Mon, Jun 15', home: 'Spain',        away: 'Cape Verde',   city: 'Atlanta' },
      { date: 'Mon, Jun 15', home: 'Saudi Arabia', away: 'Uruguay',      city: 'Miami' },
      { date: 'Sun, Jun 21', home: 'Spain',        away: 'Saudi Arabia', city: 'Atlanta' },
      { date: 'Sun, Jun 21', home: 'Uruguay',      away: 'Cape Verde',   city: 'Miami' },
      { date: 'Fri, Jun 26', home: 'Cape Verde',   away: 'Saudi Arabia', city: 'Houston' },
      { date: 'Fri, Jun 26', home: 'Uruguay',      away: 'Spain',        city: 'Guadalajara' },
    ],
  },
  {
    group: 'I',
    matches: [
      { date: 'Tue, Jun 16', home: 'France',  away: 'Senegal', city: 'New York/New Jersey' },
      { date: 'Tue, Jun 16', home: 'Iraq',    away: 'Norway',  city: 'Boston' },
      { date: 'Mon, Jun 22', home: 'France',  away: 'Iraq',    city: 'Philadelphia' },
      { date: 'Mon, Jun 22', home: 'Norway',  away: 'Senegal', city: 'New York/New Jersey' },
      { date: 'Fri, Jun 26', home: 'Norway',  away: 'France',  city: 'Boston' },
      { date: 'Fri, Jun 26', home: 'Senegal', away: 'Iraq',    city: 'Toronto' },
    ],
  },
  {
    group: 'J',
    matches: [
      { date: 'Tue, Jun 16', home: 'Argentina', away: 'Algeria',   city: 'Kansas City' },
      { date: 'Mon, Jun 15', home: 'Austria',   away: 'Jordan',    city: 'San Francisco' },
      { date: 'Mon, Jun 22', home: 'Argentina', away: 'Austria',   city: 'Dallas' },
      { date: 'Mon, Jun 22', home: 'Jordan',    away: 'Algeria',   city: 'San Francisco' },
      { date: 'Sat, Jun 27', home: 'Algeria',   away: 'Austria',   city: 'Kansas City' },
      { date: 'Sat, Jun 27', home: 'Jordan',    away: 'Argentina', city: 'Dallas' },
    ],
  },
  {
    group: 'K',
    matches: [
      { date: 'Wed, Jun 17', home: 'Portugal',   away: 'DR Congo',   city: 'Houston' },
      { date: 'Wed, Jun 17', home: 'Uzbekistan', away: 'Colombia',   city: 'Mexico City' },
      { date: 'Tue, Jun 23', home: 'Portugal',   away: 'Uzbekistan', city: 'Houston' },
      { date: 'Tue, Jun 23', home: 'Colombia',   away: 'DR Congo',   city: 'Guadalajara' },
      { date: 'Sat, Jun 27', home: 'Colombia',   away: 'Portugal',   city: 'Miami' },
      { date: 'Sat, Jun 27', home: 'DR Congo',   away: 'Uzbekistan', city: 'Atlanta' },
    ],
  },
  {
    group: 'L',
    matches: [
      { date: 'Wed, Jun 17', home: 'England', away: 'Croatia', city: 'Dallas' },
      { date: 'Wed, Jun 17', home: 'Ghana',   away: 'Panama',  city: 'Toronto' },
      { date: 'Tue, Jun 23', home: 'England', away: 'Ghana',   city: 'Boston' },
      { date: 'Tue, Jun 23', home: 'Panama',  away: 'Croatia', city: 'Toronto' },
      { date: 'Sat, Jun 27', home: 'Panama',  away: 'England', city: 'New York/New Jersey' },
      { date: 'Sat, Jun 27', home: 'Croatia', away: 'Ghana',   city: 'Philadelphia' },
    ],
  },
]

export const groupStageData = raw.map(group => ({
  ...group,
  matches: group.matches.map((match, idx) => {
    const fullDate = match.date.replace(/^[A-Za-z]+, /, '') + ', 2026'
    return {
      ...match,
      fullDate: match.date + ', 2026',
      isoDate: toISODate(fullDate),
      matchId: `G-${group.group}-${idx + 1}`,
    }
  }),
}))
