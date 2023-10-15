import { useState } from 'react';
import { FormType } from '../types/form-type';

export function useFormDialog() {
  const [isOpenForm, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>('create');

  const openCreateForm = () => {
    setFormType('create');
    setIsOpen(true);
  };

  const openEditForm = () => {
    setFormType('edit');
    setIsOpen(true);
  };
  const closeForm = () => {
    setIsOpen(false);
  };

  return { isOpenForm, openCreateForm, openEditForm, closeForm, formType };
}
