import React, { useState } from 'react';
import { BasicInfoTabContent } from './BasicInfoTabContent';
import { Tabs, Tab } from 'react-bootstrap';

const LineTabContent: React.FC = () => <div>路線</div>;

export const CompanyDetailPage: React.FC = () => {
  const tabs = [
    { name: '基本情報', component: BasicInfoTabContent },
    { name: '路線', component: LineTabContent },
  ];

  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  return (
    <>
      <h1>事業者詳細画面</h1>
      <ul className="nav nav-tabs">
        {tabs.map((tab, i) => (
          <li className="nav-item" key={i}>
            <a
              className={`nav-link ${activeTabIndex === i ? 'active' : ''}`}
              href="#"
              onClick={(): void => setActiveTabIndex(i)}
            >
              {tab.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="container pt-3">
        {tabs.map((tab, i) => {
          const Component = tab.component;
          return (
            <div
              className={activeTabIndex === i ? 'd-block' : 'd-none'}
              key={i}
            >
              <Component />
            </div>
          );
        })}
      </div>
    </>
  );
};
