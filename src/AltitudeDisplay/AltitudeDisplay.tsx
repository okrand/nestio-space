import React from 'react'
import './AltitudeDisplay.css'
import satellite from './satellite.png'
import { Label } from 'semantic-ui-react'
import { WARNING_THRESHOLD } from '../Status/Status'

interface AltitudeDisplayProps {
    altitude: number
}
const AltitudeDisplay = (props: AltitudeDisplayProps) => {
    const { altitude } = props
    return (
    <div className="display">
        <img className="image" width="60%" src={satellite} alt="satellite"/>
        <Label color={altitude > WARNING_THRESHOLD ? 'green' : 'red'} size='massive'>{altitude.toFixed(2)}</Label>
    </div>)
}

export default AltitudeDisplay