/*
  # CMDB Initial Schema

  1. New Tables
    - `assets`
      - Base table for all assets (both hardware and software)
      - Common fields like name, description, status
    - `hardware_assets`
      - Extends assets for hardware-specific details
      - Tracks physical attributes like location, serial number
    - `software_assets`
      - Extends assets for software-specific details
      - Tracks version, license info
    - `asset_relationships`
      - Tracks relationships between assets
      - Supports different types of relationships

  2. Security
    - Enable RLS on all tables
    - Policies for authenticated users to manage their organization's assets
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Asset Types enum
CREATE TYPE asset_type AS ENUM ('hardware', 'software');

-- Asset Status enum
CREATE TYPE asset_status AS ENUM ('active', 'inactive', 'maintenance', 'retired');

-- Base Assets table
CREATE TABLE IF NOT EXISTS assets (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  type asset_type NOT NULL,
  status asset_status DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  organization_id uuid NOT NULL
);

-- Hardware Assets table
CREATE TABLE IF NOT EXISTS hardware_assets (
  id uuid PRIMARY KEY REFERENCES assets(id),
  manufacturer text,
  model text,
  serial_number text,
  purchase_date date,
  warranty_expiry date,
  location text,
  rack_position text,
  specifications jsonb
);

-- Software Assets table
CREATE TABLE IF NOT EXISTS software_assets (
  id uuid PRIMARY KEY REFERENCES assets(id),
  version text,
  vendor text,
  license_key text,
  license_type text,
  expiry_date date,
  installation_date date,
  requirements jsonb
);

-- Relationship Types enum
CREATE TYPE relationship_type AS ENUM (
  'runs_on',
  'connects_to',
  'depends_on',
  'manages',
  'contains'
);

-- Asset Relationships table
CREATE TABLE IF NOT EXISTS asset_relationships (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_asset_id uuid REFERENCES assets(id) ON DELETE CASCADE,
  target_asset_id uuid REFERENCES assets(id) ON DELETE CASCADE,
  relationship_type relationship_type NOT NULL,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  organization_id uuid NOT NULL,
  UNIQUE(source_asset_id, target_asset_id, relationship_type)
);

-- Enable RLS
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE hardware_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE software_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_relationships ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can manage their organization's assets"
  ON assets
  USING (auth.uid() = created_by);

CREATE POLICY "Users can manage their organization's hardware assets"
  ON hardware_assets
  USING (
    id IN (
      SELECT id FROM assets 
      WHERE created_by = auth.uid()
    )
  );

CREATE POLICY "Users can manage their organization's software assets"
  ON software_assets
  USING (
    id IN (
      SELECT id FROM assets 
      WHERE created_by = auth.uid()
    )
  );

CREATE POLICY "Users can manage their organization's asset relationships"
  ON asset_relationships
  USING (created_by = auth.uid());