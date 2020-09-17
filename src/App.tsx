import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { setInterval } from 'timers';
import { getApiCall } from './api-call'
import Status from './Status/Status'
import AltitudeDisplay from './AltitudeDisplay/AltitudeDisplay'
import LineChart from './LineChart/LineChart'
import moment from 'moment'
import { Button, Sidebar, Segment, Menu, Label } from 'semantic-ui-react';

export interface AltitudeResponse {
  last_updated: string,
  altitude: number
}

export interface WarningInfo {
  avgAlt: number,
  dateTime: moment.Moment
}

function App() {
  const [rollingAltitude, setRollingAlt] = useState<AltitudeResponse[]>([])
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [warnings, setWarnings] = useState<WarningInfo[]>([])
  useEffect(() => {
    getAltitude(setRollingAlt)
    const interval = setInterval(() => {
      getAltitude(setRollingAlt)
    }, 10000);
    return clearInterval(interval)
  }, [])

  const warningsListVisible = () => setSidebarVisible(true)

  const warningsSidebar = (
    <Sidebar
      as={Menu}
      animation='overlay'
      direction='right'
      onHide={() => setSidebarVisible(false)}
      icon='labeled'
      width='very wide'
      divided
      inverted
      vertical
      visible={sidebarVisible}
    >
      {getListItemsFromWarnings(warnings)}
    </Sidebar>
  )

  return (
    <div className="App">
        <Sidebar.Pushable as={Segment} className='info-row'>
          {warningsSidebar}
          {rollingAltitude.length ? <AltitudeDisplay altitude={rollingAltitude.slice(-1)[0].altitude}/> 
            : <Label>Loading</Label>}
          <Status rollingAltitude={rollingAltitude} setWarnings={setWarnings}/>
          <Sidebar.Pusher>
            {warnings.length ? <Button onClick={warningsListVisible} color='orange' icon='warning sign'/> : null}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      <div className='chart-container'>
        <LineChart altitudeData={rollingAltitude}/>
      </div>
    </div>
  )
}

const getListItemsFromWarnings = (warnings: WarningInfo[]) => warnings.map((warning, index) => 
  <Menu.Item key={index}>Low Average Altitude happened on {moment(warning.dateTime).format('lll')}</Menu.Item>)

const getAltitude = (setRollingAlt: React.Dispatch<React.SetStateAction<AltitudeResponse[]>>) => {
  getApiCall('http://nestio.space/api/satellite/data', {}).then((data: AltitudeResponse) => {
    console.log("New Altitude", data)
    setRollingAlt(rollingAlt => rollingAlt && [...rollingAlt, data].slice(-60))
  })
}

export default App;
