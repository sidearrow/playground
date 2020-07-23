import React from 'react';
import { render, screen } from '@testing-library/react';
import { MapInfoManager } from './MapInfoManager';

test('test', () => {
  render(<MapInfoManager />);
  screen.debug();
});
