import {
  CreateDeviceDTO,
  DeviceType,
  IDevice,
} from '@mautomate/api-interfaces';
import { useFormControl } from '../../../ui/hook/use-form-control';
import styles from './device-form.module.scss';
import { FormType } from '../../../ui/types/form-type';
import { FormProvider } from 'react-hook-form';
import { FormTextField } from '../../../ui/components/form-text-field/form-text-field';
import { requiredValidator } from '../../../ui/validator/required';
import { minValidator } from '../../../ui/validator/min-validator';
import { FormSelectField } from '../../../ui/components/form-select-field/form-select-field';
import {
  DeviceTypeToIcon,
  DeviceTypes,
} from '../../../shared/utilities/device-type-parser';
import {
  BaseDialogProps,
  Dialog,
  DialogCloseIcon,
  DialogContent,
  DialogTitle,
} from '../../../ui/components/dialog/dialog';
import { Button } from '../../../ui/components/button/button';
import { useDeviceApi } from '../../hooks/use-device-api';

export interface DeviceFormProps extends BaseDialogProps {
  type: FormType;
  device?: IDevice;
}

export function DeviceForm(props: DeviceFormProps) {
  const { isOpen, close, type, device } = props;
  const { postDevice, updateDeviceInformation } = useDeviceApi();

  const { formMethods, handleSubmit, control } =
    useFormControl<CreateDeviceDTO>({
      name: device?.name ?? 'new device',
      pin: device?.pin ?? 0,
      type: device?.type ?? DeviceType.Light,
    });

  function onSubmit(data: CreateDeviceDTO) {
    if (type === 'create') {
      postDevice(data);
      return close();
    }

    if (!device) {
      return close();
    }
    updateDeviceInformation(String(device._id), data);
    return close();
  }

  return (
    <Dialog isOpen={isOpen} close={close}>
      <DialogCloseIcon onClose={close} />
      <DialogTitle>
        {type === 'create' && 'Add a new device'}
        {type === 'edit' && 'Update your device'}
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
              validators={[requiredValidator('Device must have a name')]}
            />
            <FormTextField
              name="pin"
              label="pin number"
              className={styles['input']}
              control={control}
              validators={[minValidator(0)]}
            />
            <FormSelectField
              name="type"
              label="device type"
              validators={[requiredValidator('Device must have a type')]}
              options={DeviceTypes}
              control={control}
              isOptionEqualToValue={(optionA, optionB) => optionA === optionB}
              getOptionLabel={(option) => String(option)}
              renderOption={(option) => (
                <div className={styles['option']}>
                  {DeviceTypeToIcon[option]} {option}
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
