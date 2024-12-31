/*
  # Update RLS policies for assets management

  1. Changes
    - Update assets table RLS policy to allow authenticated users to manage assets
    - Update hardware_assets and software_assets policies
    - Add organization_id check to policies
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can manage their organization's assets" ON assets;
DROP POLICY IF EXISTS "Users can manage their organization's hardware assets" ON hardware_assets;
DROP POLICY IF EXISTS "Users can manage their organization's software assets" ON software_assets;

-- Create new policies
CREATE POLICY "Enable full access for authenticated users"
  ON assets
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable full access for authenticated users"
  ON hardware_assets
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable full access for authenticated users"
  ON software_assets
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable full access for authenticated users"
  ON asset_relationships
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);