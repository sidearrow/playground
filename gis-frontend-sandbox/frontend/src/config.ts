const ATTRIBUTES = {
  GSI:
    '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">国土地理院</a>',
};

const baseMaps = [
  {
    id: 'std',
    name: '標準地図',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
    attributes: ATTRIBUTES.GSI,
  },
  {
    id: 'pale',
    name: '淡色地図',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
    attributes: ATTRIBUTES.GSI,
  },
  {
    id: 'blank',
    name: '白地図',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png',
    attributes: ATTRIBUTES.GSI,
  },
  {
    id: 'relief',
    name: '色別標高図',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png',
    attributes: ATTRIBUTES.GSI,
  },
];

const RAILWAY_TILE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/railway/{z}/{x}/{y}.pbf'
    : '/tiles/railway/{z}/{x}/{y}.pbf';

export const config = {
  baseMaps: baseMaps,
  railwayTileUrl: RAILWAY_TILE_URL,
};
