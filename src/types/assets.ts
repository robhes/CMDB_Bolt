export type AssetType = 'hardware' | 'software';
export type AssetStatus = 'active' | 'inactive' | 'maintenance' | 'retired';
export type RelationshipType = 'runs_on' | 'connects_to' | 'depends_on' | 'manages' | 'contains';

export interface Asset {
  id: string;
  name: string;
  description?: string;
  type: AssetType;
  status: AssetStatus;
  created_at: string;
  updated_at: string;
  created_by: string;
  organization_id: string;
}

export interface HardwareAsset extends Asset {
  manufacturer?: string;
  model?: string;
  serial_number?: string;
  purchase_date?: string;
  warranty_expiry?: string;
  location?: string;
  rack_position?: string;
  specifications?: Record<string, any>;
}

export interface SoftwareAsset extends Asset {
  version?: string;
  vendor?: string;
  license_key?: string;
  license_type?: string;
  expiry_date?: string;
  installation_date?: string;
  requirements?: Record<string, any>;
}

export interface AssetRelationship {
  id: string;
  source_asset_id: string;
  target_asset_id: string;
  relationship_type: RelationshipType;
  created_at: string;
  created_by: string;
  organization_id: string;
}