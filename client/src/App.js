import React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { listLogEntries } from './API'
import LogEntryForm from './LogEntryForm';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh ',
    latitude: 48.864716,
    longitude: 2.349014, 
    zoom: 1.80
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })()
  },[])

  const showAddMarkerPopup = (event) => {
    const [ longitude, latitude ] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    })
  }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(entry => (
          <>
            <Marker 
              key={entry._id}
              latitude={entry.latitude} 
              longitude={entry.longitude} 
            >
              <svg 
                onClick={() =>
                  setShowPopup({
                    [entry._id]: true,
                  })
                }
                className="marker" 
                style={{
                  width: `${8 * viewport.zoom}`,
                  height: `${8 * viewport.zoom}`
                }}
                viewBox="0 0 24 24" 
                stroke-width="2" 
                fill='orange' 
                stroke-linecap="round" 
                stroke-linejoin="round"> 
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude} 
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() =>
                    setShowPopup({})}
                  anchor="top"
                >
                  <div className="popup">
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
                    <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                  </div>
                </Popup>
              ) : null
            }
            {
              addEntryLocation ? (
                <>
                  <Marker 
                    latitude={addEntryLocation.latitude} 
                    longitude={addEntryLocation.longitude} 
                  >
                  <svg 
                    className="marker" 
                    style={{
                      width: `${8 * viewport.zoom}`,
                      height: `${8 * viewport.zoom}`
                    }}
                    viewBox="0 0 24 24" 
                    stroke-width="2" 
                    fill='blue' 
                    stroke-linecap="round" 
                    stroke-linejoin="round"> 
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </Marker>
                <Popup
                  latitude={addEntryLocation.latitude} 
                  longitude={addEntryLocation.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setAddEntryLocation(null)}
                  anchor="top"
                >
                  <div className="popup">
                    <LogEntryForm/>
                  </div>
                </Popup>
                </>
              ) : null
            }
          </>
        ))
      }
    </ReactMapGL>
  );
}

export default App