import { IRoutine, RoutineAction } from '@mautomate/api-interfaces';
import {
  BaseDialogProps,
  Dialog,
  DialogCloseIcon,
  DialogContent,
  DialogTitle,
} from '../../../ui/components/dialog/dialog';
import { FormType } from '../../../ui/types/form-type';
import styles from './routine-form.module.scss';
import { Button } from '../../../ui/components/button/button';
import { FormProvider } from 'react-hook-form';
import { FormTextField } from '../../../ui/components/form-text-field/form-text-field';
import { requiredValidator } from '../../../ui/validator/required';
import { useFormControl } from '../../../ui/hook/use-form-control';
import { RecurrencePickerField } from '../../../ui/components/recurrence-picker-field/recurrence-picker-field';
import construe from 'cronstrue';
import { useRoutineForm } from '../../hooks/use-routine-form';

export interface RoutineFormProps extends BaseDialogProps {
  type: FormType;
  routine?: IRoutine[];
}

export function RoutineForm(props: RoutineFormProps) {
  const { isOpen, close, type, routine } = props;
  const { formMethods, handleSubmit, onSubmit, control } = useRoutineForm();

  return (
    <Dialog isOpen={isOpen} close={close} maxWidth={'md'}>
      <DialogCloseIcon onClose={close} />
      <DialogTitle>
        {type === 'create' && 'Add a new group'}
        {type === 'edit' && 'Update your group'}
      </DialogTitle>
      <DialogContent>
        <FormProvider {...formMethods}>
          <form
            className={styles['form-container']}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormTextField
              name="name"
              label="name"
              className={styles['input']}
              control={control}
              validators={[requiredValidator('Group must have a name')]}
            />

            <RecurrencePickerField
              name="recurrence"
              label="recurrence"
              control={control}
              validators={[requiredValidator('Group must have a name')]}
            />

            <Button type="submit">{type}</Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
