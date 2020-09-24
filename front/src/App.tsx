import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

import { TrainMap } from './libs/trainMap';
import { CONFIG } from './config';

export const App: React.FC = () => {
  type Props = {
    trainName: null | string;
  };

  const [props, setProps] = useState<Props>({
    trainName: null,
  });

  useEffect(() => {
    const trainMap = new TrainMap();
    trainMap.onClick((props) => {
      console.log(props);
      setProps({
        ...props,
        ...{ trainName: props === null ? null : props.train_name },
      });
    });
  }, []);

  const ICONS = [
    { icon: faHome, url: CONFIG.HOME_URL },
    { icon: faTwitter, url: CONFIG.TWITTER_URL },
    { icon: faGithub, url: CONFIG.GITHUB_URL },
  ];

  return (
    <>
      <div className="border border-gray-700 rounded bg-white w-full p-2">
        <div className="flex justify-between">
          <h1 className="text-xl">Train MAP</h1>
          <div className="text-2xl text-gray-700">
            {ICONS.map((v, i) => (
              <a
                key={i}
                className="px-1"
                href={v.url}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={v.icon} />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-4">
          選択した列車：{props.trainName === null ? '-' : props.trainName}
        </div>
      </div>
    </>
  );
};
