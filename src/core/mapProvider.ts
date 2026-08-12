import mapboxgl from 'mapbox-gl';
import * as maplibregl from 'maplibre-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  MAPBOX_TOKEN,
  MAPLIBRE_STYLE_DARK,
  MAPLIBRE_STYLE_LIGHT,
  MAP_PROVIDER,
} from './config';

export type RouteMapInstance = mapboxgl.Map;
export type RouteMapBounds = mapboxgl.LngLatBounds;

type LngLatPoint = [number, number];

interface RouteMapOptions {
  container: HTMLElement;
  style: string;
  center: LngLatPoint;
  zoom: number;
}

export const getRouteMapStyle = (dark?: boolean): string => {
  if (MAP_PROVIDER === 'mapbox') {
    return dark !== false
      ? 'mapbox://styles/mapbox/dark-v11'
      : 'mapbox://styles/mapbox/light-v11';
  }

  return dark !== false ? MAPLIBRE_STYLE_DARK : MAPLIBRE_STYLE_LIGHT;
};

export const createRouteMap = (options: RouteMapOptions): RouteMapInstance => {
  if (MAP_PROVIDER === 'mapbox') {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    return new mapboxgl.Map(options);
  }

  return new maplibregl.Map(options) as unknown as RouteMapInstance;
};

export const createRouteMapBounds = (
  southwest?: LngLatPoint,
  northeast?: LngLatPoint
): RouteMapBounds => {
  if (MAP_PROVIDER === 'mapbox') {
    return southwest && northeast
      ? new mapboxgl.LngLatBounds(southwest, northeast)
      : new mapboxgl.LngLatBounds();
  }

  return (southwest && northeast
    ? new maplibregl.LngLatBounds(southwest, northeast)
    : new maplibregl.LngLatBounds()) as unknown as RouteMapBounds;
};

export const addRouteMapControls = (
  map: RouteMapInstance,
  options: { fullscreen?: boolean } = {}
) => {
  if (MAP_PROVIDER === 'mapbox') {
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    if (options.fullscreen) {
      map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    }
    return;
  }

  const maplibreMap = map as unknown as maplibregl.Map;
  maplibreMap.addControl(new maplibregl.NavigationControl(), 'top-right');
  if (options.fullscreen) {
    maplibreMap.addControl(new maplibregl.FullscreenControl(), 'top-right');
  }
};
