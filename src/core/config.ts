/**
 * 配置从根目录 config.yml 加载，由 Vite 在构建时转换。
 * 直接编辑 config.yml 即可，无需改动此文件。
 */
import rawConfig from '@config';
import type { Locale } from './i18n';

export type MapProvider = 'mapbox' | 'maplibre';

export interface GoalConfig {
  yearly: number;
  monthly: number;
  weekly: number;
  /** 'distance' (km) | 'time' (minutes) */
  unit: 'distance' | 'time';
}

interface AppConfig {
  locale: Locale;
  theme: 'light' | 'dark' | 'system';
  theme_preset: string;
  goals: Record<string, GoalConfig>;
  avatar?: string;
  mapbox_token?: string;
  map_provider?: MapProvider;
  maplibre_style_light?: string;
  maplibre_style_dark?: string;
}

const config = rawConfig as unknown as AppConfig;

export const DEFAULT_LOCALE: Locale = config.locale ?? 'zh';
export const DEFAULT_THEME: 'light' | 'dark' | 'system' =
  config.theme ?? 'system';
export const THEME_PRESET: string = config.theme_preset ?? 'default';
export const GOALS: Record<string, GoalConfig> = config.goals ?? {};
export const DEFAULT_GOAL: GoalConfig = GOALS.all ?? {
  yearly: 2000,
  monthly: 150,
  weekly: 35,
  unit: 'distance',
};
export const AVATAR: string = config.avatar ?? '';
export const MAPBOX_TOKEN: string =
  import.meta.env.VITE_MAPBOX_TOKEN || config.mapbox_token || '';

const configuredMapProvider = config.map_provider;

export const MAP_PROVIDER: MapProvider =
  configuredMapProvider === 'mapbox' || configuredMapProvider === 'maplibre'
    ? configuredMapProvider
    : MAPBOX_TOKEN
      ? 'mapbox'
      : 'maplibre';

export const MAPLIBRE_STYLE_LIGHT =
  config.maplibre_style_light ||
  'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

export const MAPLIBRE_STYLE_DARK =
  config.maplibre_style_dark ||
  'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';
