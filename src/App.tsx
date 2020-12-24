import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Diagram } from "./components/diagram/Diagram";
import { Sidebar } from "./components/sidebar/Sidebar";
import { TimeTable } from "./components/timeTable/TimeTable";

import diajson from "../test/sample.dia.json";
import { StationConfig } from "./components/stationConfig/StationConfig";
import { DiaDataManager } from "./diaDataManager";
const diajsonStr = JSON.stringify(diajson);

export const App: React.FC = () => {
  const diaData = DiaDataManager.parseJson(diajsonStr);
  const ddm = new DiaDataManager(diaData);
  const dias = ddm.getDias();
  const stations = ddm.getStations();

  return (
    <BrowserRouter>
      <div className="w-full h-full flex flex-col">
        <header className="px-4 py-2 border-b border-gray-200 flex-shrink-0">
          Diagram Viewer
        </header>
        <main className="w-full flex flex-grow min-h-0">
          <Sidebar diaNames={dias.map((v) => v.diaName)} />
          <div className="flex flex-1 min-w-0">
            <Switch>
              <Route path="/" exact={true}>
                <div>INDEX</div>
              </Route>
              <Route path="/station" exact={true}>
                <StationConfig stationConfig={stations} />
              </Route>
              <Route path="/train" exact={true}>
                <div>TRAIN</div>
              </Route>
              <Route path="/json-viewer" exact>
                <div>{ddm.getDiaDataRaw()}</div>
              </Route>
              {dias.map((dia, i) => (
                <React.Fragment key={i}>
                  <Route path={`/dias-${i}-diagram`} exact={true}>
                    <Diagram stations={stations} diaData={dia.diaData} />
                  </Route>
                  <Route path={`/dias-${i}-timetable-up`} exact={true}>
                    <TimeTable
                      stations={stations}
                      diaData={dia.diaData}
                      isUp={false}
                    />
                  </Route>
                  <Route path={`/dias-${i}-timetable-down`} exact={true}>
                    <TimeTable
                      stations={stations}
                      diaData={dia.diaData}
                      isUp={false}
                    />
                  </Route>
                </React.Fragment>
              ))}
            </Switch>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
};
