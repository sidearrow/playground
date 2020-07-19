import React from 'react';
import { render } from 'enzyme';
import { MapInfoManager, MapInfoManagerItem } from './MapInfoManager';

test('test', () => {
  const mapInfoManager = render(
    <MapInfoManager state={{ key1: true, key2: false, key3: true }}>
      <MapInfoManagerItem itemKey="key1">key1</MapInfoManagerItem>
      <MapInfoManagerItem itemKey="key2">key2</MapInfoManagerItem>
      <MapInfoManagerItem itemKey="key3">key3</MapInfoManagerItem>
    </MapInfoManager>
  );

  expect(mapInfoManager.text()).toContain('key1');
  expect(mapInfoManager.text()).toContain('key3');
  expect(mapInfoManager.text()).not.toContain('key2');
});
