import { ReactComponent as EndSvg } from '@assets/end.svg';
import { ReactComponent as StartSvg } from '@assets/start.svg';
import { Marker as MapboxMarker } from 'react-map-gl/mapbox';
import { Marker as MapLibreMarker } from 'react-map-gl/maplibre';
import { MAP_PROVIDER } from '../../../../core/config';
import styles from './style.module.css';

const ActiveMarker =
  MAP_PROVIDER === 'maplibre' ? MapLibreMarker : MapboxMarker;

interface IRunMarkerProperties {
  startLon: number;
  startLat: number;
  endLon: number;
  endLat: number;
}

const RunMarker = ({
  startLon,
  startLat,
  endLon,
  endLat,
}: IRunMarkerProperties) => {
  const size = 5;
  return (
    <>
      <ActiveMarker
        key="maker_start"
        longitude={startLon}
        latitude={startLat}
        pitchAlignment="viewport"
      >
        <div
          style={{
            transform: `translate(${-size / 2}px,${-size}px)`,
            maxWidth: '25px',
          }}
        >
          <StartSvg className={styles.locationSVG} />
        </div>
      </ActiveMarker>
      <ActiveMarker key="maker_end" longitude={endLon} latitude={endLat}>
        <div
          style={{
            transform: `translate(${-size / 2}px,${-size}px)`,
            maxWidth: '25px',
          }}
        >
          <EndSvg className={styles.locationSVG} />
        </div>
      </ActiveMarker>
    </>
  );
};

export default RunMarker;
