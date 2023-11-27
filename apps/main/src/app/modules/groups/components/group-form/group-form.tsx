import { CreateGroupDto, IDevice, IGroup } from '@mautomate/api-interfaces';
import {
  BaseDialogProps,
  Dialog,
  DialogCloseIcon,
  DialogContent,
  DialogTitle,
} from '../../../ui/components/dialog/dialog';
import { FormType } from '../../../ui/types/form-type';
import styles from './group-form.module.scss';
import { useFormControl } from '../../../ui/hook/use-form-control';
import { FormProvider } from 'react-hook-form';
import { FormSelectField } from '../../../ui/components/form-select-field/form-select-field';
import { FormTextField } from '../../../ui/components/form-text-field/form-text-field';
import { requiredValidator } from '../../../ui/validator/required';
import { useDeviceStorage } from '../../../devices/hooks/use-device-storage';
import { DeviceContainer } from '../../../devices/components/device-container/device-container';
import { Button } from '../../../ui/components/button/button';
import { useGroupApi } from '../../hooks/use-group-api';

export interface GroupFormProps extends BaseDialogProps {
  type: FormType;
  group?: IGroup;
}

export function GroupForm(props: GroupFormProps) {
  const { isOpen, close, type, group } = props;
  const { devices } = useDeviceStorage();
  const { createGroup, updateGroupInformation } = useGroupApi();
  const { formMethods, handleSubmit, control, reset } = useFormControl<{
    name: string;
    devices: IDevice[];
  }>({
    name: group?.name ?? 'new group',
    devices: group?.devices ?? [],
  });

  function onSubmit(data: { name: string; devices: IDevice[] }) {
    const { name, devices } = data;
    const deviceIds = devices.map((device) => String(device._id));
    const payload: CreateGroupDto = {
      name,
      deviceIds,
    };
    if (type === 'create') {
      createGroup(payload);
      return handleClose();
    }

    if (!group) {
      return handleClose();
    }
    updateGroupInformation(String(group._id), payload);
    return handleClose();
  }

  function handleClose() {
    reset();
    close();
  }

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

            <FormSelectField
              name="devices"
              label="devices"
              validators={[
                requiredValidator('Group must have at least one device'),
              ]}
              options={devices}
              control={control}
              isOptionEqualToValue={(optionA, optionB) =>
                String(optionA._id) === String(optionB._id)
              }
              multiple
              getOptionLabel={(option) => option.name}
              renderOption={(option) => (
                <div className={styles['option']}>
                  <DeviceContainer device={option} transparent />
                </div>
              )}
            />
            <Button type="submit">{type}</Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
