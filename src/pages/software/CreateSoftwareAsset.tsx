import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import AssetFormLayout from '../../components/forms/AssetFormLayout';
import FormField from '../../components/forms/FormField';

const CreateSoftwareAsset: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    version: '',
    vendor: '',
    licenseKey: '',
    licenseType: '',
    expiryDate: '',
    installationDate: '',
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
          type: 'software',
          organization_id: '00000000-0000-0000-0000-000000000000', // Replace with actual org ID
        }])
        .select()
        .single();

      if (assetError) throw assetError;

      const { error: softwareError } = await supabase
        .from('software_assets')
        .insert([{
          id: assetData.id,
          version: formData.version,
          vendor: formData.vendor,
          license_key: formData.licenseKey,
          license_type: formData.licenseType,
          expiry_date: formData.expiryDate,
          installation_date: formData.installationDate,
        }]);

      if (softwareError) throw softwareError;

      navigate('/software');
    } catch (error) {
      console.error('Error creating software asset:', error);
      // Add error handling UI here
    }
  };

  return (
    <AssetFormLayout title="Create Software Asset" onSubmit={handleSubmit}>
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
          label="Version"
          name="version"
          value={formData.version}
          onChange={handleChange}
        />
        <FormField
          label="Vendor"
          name="vendor"
          value={formData.vendor}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="License Key"
          name="licenseKey"
          value={formData.licenseKey}
          onChange={handleChange}
        />
        <FormField
          label="License Type"
          name="licenseType"
          value={formData.licenseType}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Installation Date"
          name="installationDate"
          type="date"
          value={formData.installationDate}
          onChange={handleChange}
        />
        <FormField
          label="Expiry Date"
          name="expiryDate"
          type="date"
          value={formData.expiryDate}
          onChange={handleChange}
        />
      </div>
    </AssetFormLayout>
  );
};

export default CreateSoftwareAsset;