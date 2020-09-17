### Nestio Satellite Tracking

This React.JS project requires getting information from an API and displaying it in a simple but effective manner in addition to displaying the history using D3.js. The requirements are below. You can see this app running on http://okrand.github.io/nestio-space/

### Running the app
Run `yarn` to download dependencies before starting
### `yarn start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Requirements
Funnel has launched a satellite in order to tackle the lucrative lunar real estate market. To make sure the satellite doesn’t come crashing back down, we’re creating a web application to monitor its status. Your job is to write the frontend for it.

Realtime information about the satellite is available from the nestio.space/api/satellite/data endpoint. The data is updated every ten seconds. The data is returned in this format:

{
  “last_updated”: “2017-04-07T02:53:10.000Z”,
  “altitude”:  “213.001”
}

last_updated is an ISO 8601 representation of the last time the data was updated and altitude is the altitude of the satellite in kilometers. 

Your application should:

* Display the current altitude of the satellite. 
* Continuously update the data so a user can keep the web page open and monitor the altitude of the satellite
* Display a history of the altitude of the satellite over the last 10 minutes (or since the web page was opened). Bonus Points: display it graphically using a library like D3.js.
* Whenever the average altitude of the satellite goes below 160km for more than 1 minute, show an alert that says “WARNING: RAPID ORBITAL DECAY IMMINENT”.
* If the average altitude of the satellite returns to above 160km for over one minute, show an alert that says “Sustained Low Earth Orbit Resumed”.
* Make sure all alerts stay on the page for historical reasons
* Write tests for the alerting logic
* Please provide a README describing how to setup and run the application.


