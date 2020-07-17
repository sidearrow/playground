const baseMaps = [
  {
    id: 'std',
    name: '標準地図',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
  },
  {
    id: 'pale',
    name: '淡色地図',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
  },
];

export const config = {
  baseMaps: baseMaps,
};
