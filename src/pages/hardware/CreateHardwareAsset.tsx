import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import AssetFormLayout from '../../components/forms/AssetFormLayout';
import FormField from '../../components/forms/FormField';

const CreateHardwareAsset: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    purchaseDate: '',
    warrantyExpiry: '',
    location: '',
    rackPosition: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: assetData, error: assetError } = await supabase
        .from('assets')
        .insert([{
          name: formData.name,
          description: formData.description,
          type: 'hardware',
          organization_id: '00000000-0000-0000-0000-000000000000', // Replace with actual org ID
        }])
        .select()
        .single();

      if (assetError) throw assetError;

      const { error: hardwareError } = await supabase
        .from('hardware_assets')
        .insert([{
          id: assetData.id,
          manufacturer: formData.manufacturer,
          model: formData.model,
          serial_number: formData.serialNumber,
          purchase_date: formData.purchaseDate,
          warranty_expiry: formData.warrantyExpiry,
          location: formData.location,
          rack_position: formData.rackPosition,
        }]);

      if (hardwareError) throw hardwareError;

      navigate('/hardware');
    } catch (error) {
      console.error('Error creating hardware asset:', error);
      // Add error handling UI here
    }
  };

  return (
    <AssetFormLayout title="Create Hardware Asset" onSubmit={handleSubmit}>
      <FormField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <FormField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        textarea
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Manufacturer"
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
        />
        <FormField
          label="Model"
          name="model"
          value={formData.model}
          onChange={handleChange}
        />
      </div>
      <FormField
        label="Serial Number"
        name="serialNumber"
        value={formData.serialNumber}
        onChange={handleChange}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Purchase Date"
          name="purchaseDate"
          type="date"
          value={formData.purchaseDate}
          onChange={handleChange}
        />
        <FormField
          label="Warranty Expiry"
          name="warrantyExpiry"
          type="date"
          value={formData.warrantyExpiry}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        <FormField
          label="Rack Position"
          name="rackPosition"
          value={formData.rackPosition}
          onChange={handleChange}
        />
      </div>
    </AssetFormLayout>
  );
};

export default CreateHardwareAsset;