import { schemeCategory10 } from 'd3-scale-chromatic';
import { AssetType } from '../types/assets';

export const assetTypeColors: Record<AssetType, string> = {
  hardware: schemeCategory10[0],
  software: schemeCategory10[1],
};