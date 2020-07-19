import React from 'react';
import { shallow } from 'enzyme';
import { SwitchBtn } from './SwitchBtn';

test('test SwtichBtn component', () => {
  const switchBtnON = shallow(<SwitchBtn isOn={true} lable="switchButton" />);

  expect(switchBtnON.text()).toContain('switchButton');
  expect(switchBtnON.text()).toContain('ON');

  const switchBtnOFF = shallow(<SwitchBtn isOn={false} lable="switchButton" />);

  expect(switchBtnOFF.text()).toContain('switchButton');
  expect(switchBtnOFF.text()).toContain('OFF');
});
