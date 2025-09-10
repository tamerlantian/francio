import React from 'react';
import { ConductorWizard } from './conductor-wizard';
import { Conductor } from '../interfaces/conductor.interface';

interface ConductorFormularioProps {
  initialData?: Partial<Conductor>;
  onSubmit?: (data: Partial<Conductor>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

export default function ConductorFormulario({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
  mode,
}: ConductorFormularioProps) {
  const handleFormSubmit = (data: Partial<Conductor>) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <ConductorWizard
      initialData={initialData}
      onSubmit={handleFormSubmit}
      onCancel={handleCancel}
      isLoading={isLoading}
      mode={mode || 'create'}
    />
  );
}
