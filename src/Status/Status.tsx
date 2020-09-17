import React, { useState, useEffect } from 'react'
import { AltitudeResponse, WarningInfo } from '../App'
import moment from 'moment'
import { Label } from 'semantic-ui-react'

export const WARNING_MESSAGE = 'WARNING: RAPID ORBITAL DECAY IMMINENT'
export const SAFE_MESSAGE = 'Sustained Low Earth Orbit Resumed'

interface StatusProps {
    rollingAltitude: AltitudeResponse[],
    setWarnings: React.Dispatch<React.SetStateAction<WarningInfo[]>>
}

export const WARNING_THRESHOLD = 160
const Status = (props: StatusProps) => {
    const { rollingAltitude, setWarnings } = props
    const [avgAlt, setAvgAlt] = useState(WARNING_THRESHOLD)
    useEffect(() => {
        if (rollingAltitude.length > 9) {
            const minuteData = (rollingAltitude.slice(-10))
            const newAvg = getAverageAltitude(minuteData)
            avgAlt >= WARNING_THRESHOLD && newAvg < WARNING_THRESHOLD && setWarnings(warnings => [{avgAlt: newAvg, dateTime: moment()}, ...warnings])
            setAvgAlt(newAvg)
        }
    }, [avgAlt, rollingAltitude, setWarnings])
    
    return <Label data-testid='warning-label' color={avgAlt < WARNING_THRESHOLD ? 'red': 'green'} size='massive'>{avgAlt < WARNING_THRESHOLD ? WARNING_MESSAGE : SAFE_MESSAGE}</Label>
}

export const getAverageAltitude = (altitudes?: AltitudeResponse[]) => {
    if (!altitudes) return 0
    const total = altitudes.reduce((total, alt) => alt.altitude + total, 0)
    return total / altitudes.length
}

export default Status