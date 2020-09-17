import '@testing-library/jest-dom/extend-expect'
import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom'
import Status, {getAverageAltitude, SAFE_MESSAGE, WARNING_MESSAGE} from './Status'

const makeMockData = (alt: number) => {return {altitude: alt, last_updated: "2020-09-16T20:23:20"}}
const simpleMock = [makeMockData(120), makeMockData(130)]

test('helper functions', () => {
    expect(getAverageAltitude()).toBe(0)
    expect(getAverageAltitude(simpleMock)).toBe(125)
})

test('Should Display Correct Status when not enough data', () => {
    const setWarning = jest.fn()
    render(<Status rollingAltitude={simpleMock} setWarnings={setWarning} />)
    expect(screen.getByTestId('warning-label')).toHaveTextContent(SAFE_MESSAGE)
    expect(setWarning).not.toHaveBeenCalled()
})

test('Should Display Correct Status when high average', () => {
    const setWarning = jest.fn()
    const mockData = Array(15).fill(makeMockData(170))
    render(<Status rollingAltitude={mockData} setWarnings={setWarning} />)
    expect(screen.getByTestId('warning-label')).toHaveTextContent(SAFE_MESSAGE)
    expect(setWarning).not.toHaveBeenCalled()
})

test('Should Display Correct Status when low average', () => {
    const setWarning = jest.fn()
    const mockData = Array(15).fill(makeMockData(120))
    render(<Status rollingAltitude={mockData} setWarnings={setWarning} />)
    expect(screen.getByTestId('warning-label')).toHaveTextContent(WARNING_MESSAGE)
    expect(setWarning).toHaveBeenCalled()
})
