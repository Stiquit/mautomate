import { FormType } from '../../../ui/types/form-type';
import styles from './routine-form.module.scss';
import { Button } from '../../../ui/components/button/button';
import { FormProvider } from 'react-hook-form';
import { FormTextField } from '../../../ui/components/form-text-field/form-text-field';
import { requiredValidator } from '../../../ui/validator/required';
import { RecurrencePickerField } from '../../../ui/components/recurrence-picker-field/recurrence-picker-field';
import { useRoutineForm } from '../../hooks/use-routine-form';
import { FormSelectField } from '../../../ui/components/form-select-field/form-select-field';
import {
  ActionStateOptions,
  RoutineActionType,
} from '../../types/routine-form.type';
import { minValidator } from '../../../ui/validator/min-validator';
import { Card } from '../../../ui/components/card/card';
import { useDeviceStorage } from '../../../devices/hooks/use-device-storage';
import { DeviceContainer } from '../../../devices/components/device-container/device-container';
import { FormColorPicker } from '../../../ui/components/form-color-picker/form-color-picker';
import { RoutineActionContainer } from '../routine-action-container/routine-action-container';
import { MainLayout } from '../../../shared/components/main-layout/main-layout';
import { useParams } from 'react-router-dom';
import { useRoutineStorage } from '../../hooks/use-routine-storage';
import { useOnInit } from '../../../shared/hooks/use-on-init';
import { useRouter } from '../../../routing/hooks/use-router';
import { FaTrashCan } from 'react-icons/fa6';
import { useRoutineApi } from '../../hooks/use-routine-api';

export interface RoutineFormProps {
  type: FormType;
}

export function RoutineForm(props: RoutineFormProps) {
  const { type } = props;
  const {
    formMethods,
    handleSubmit,
    onSubmit,
    control,
    routineActionType,
    submitAction,
    actions,
    setRoutineValues,
    removeAction,
  } = useRoutineForm();
  const { id } = useParams<{ id: string }>();
  const { switchDevices, lightDevices } = useDeviceStorage();
  const { goToRoutines } = useRouter();
  const { findRoutine } = useRoutineStorage();
  const { getUserRoutines } = useRoutineApi();
  const routineToUpdate = findRoutine(id);

  useOnInit(() => {
    getUserRoutines();
    if (type === 'edit' && routineToUpdate) {
      setRoutineValues(routineToUpdate);
    }
  });

  if (type === 'edit' && !routineToUpdate) {
    return (
      <MainLayout>
        <Card>
          <div className={styles['not-found']}>
            <div className={styles['title']}>Routine not found</div>
            <Button onClick={goToRoutines}>Go to Routines</Button>
          </div>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles['container']}>
        <div className={styles['title']}>
          {type === 'create' && 'Add a new routine'}
          {type === 'edit' && 'Edit your routine'}
        </div>
        <FormProvider {...formMethods}>
          <form
            className={styles['form-container']}
            onSubmit={handleSubmit((data) => onSubmit(data, type, String(id)))}
          >
            <FormTextField
              name="name"
              label="name"
              className={styles['input']}
              control={control}
              validators={[requiredValidator('Group must have a name')]}
            />
            <div className={styles['subtitle']}>Repeat on</div>
            <RecurrencePickerField
              name="recurrence"
              label="recurrence"
              className={styles['humanized-cron']}
              control={control}
              validators={[requiredValidator('Select a recurrence')]}
            />
            <div className={styles['subtitle']}>Actions</div>

            <div className={styles['actions']}>
              {actions.length > 0 && (
                <div className={styles['routine-actions']}>
                  {actions.map((action, i) => (
                    <div className={styles['action']} key={`action-${i}`}>
                      <div className={styles['delete']}>
                        <FaTrashCan onClick={() => removeAction(i)} />
                      </div>
                      <RoutineActionContainer action={action} />
                    </div>
                  ))}
                </div>
              )}
              <Card color="secondary">
                <div className={styles['configuration']}>
                  <FormSelectField
                    name="routineActionType"
                    label="Action type"
                    control={control}
                    options={Object.values(RoutineActionType)}
                    getOptionLabel={(routineActionType) => routineActionType}
                    isOptionEqualToValue={(optionA, optionB) =>
                      optionA === optionB
                    }
                    validators={[requiredValidator()]}
                  />
                  {routineActionType === RoutineActionType.Wait && (
                    <FormTextField
                      name="actionConfig.waitFor"
                      label="Minutes to wait"
                      className={styles['input']}
                      type="number"
                      validators={[minValidator(1)]}
                      control={control}
                    />
                  )}
                  {routineActionType !== RoutineActionType.Wait && (
                    <>
                      {routineActionType === RoutineActionType.Light && (
                        <FormSelectField
                          name="actionConfig.device"
                          label="Device to apply"
                          options={lightDevices}
                          control={control}
                          isOptionEqualToValue={(optionA, optionB) =>
                            String(optionA._id) === String(optionB._id)
                          }
                          getOptionLabel={(option) => option.name}
                          renderOption={(option) => (
                            <div className={styles['option']}>
                              <DeviceContainer device={option} transparent />
                            </div>
                          )}
                        />
                      )}
                      {routineActionType === RoutineActionType.Device && (
                        <FormSelectField
                          name="actionConfig.device"
                          label="Device to apply"
                          options={switchDevices}
                          control={control}
                          isOptionEqualToValue={(optionA, optionB) =>
                            String(optionA._id) === String(optionB._id)
                          }
                          getOptionLabel={(option) => option.name}
                          renderOption={(option) => (
                            <div className={styles['option']}>
                              <DeviceContainer device={option} transparent />
                            </div>
                          )}
                        />
                      )}

                      <FormSelectField
                        name="actionConfig.state"
                        label="device state"
                        control={control}
                        options={ActionStateOptions}
                        getOptionLabel={(actionState) => actionState.label}
                        isOptionEqualToValue={(optionA, optionB) =>
                          optionA.value === optionB.value
                        }
                      />

                      {routineActionType === RoutineActionType.Light && (
                        <FormColorPicker
                          name="actionConfig.color"
                          control={control}
                          className={styles['input']}
                        />
                      )}
                    </>
                  )}
                  <Button onClick={submitAction}>Add action</Button>
                </div>
              </Card>
            </div>

            <Button type="submit">{type}</Button>
          </form>
        </FormProvider>
      </div>
    </MainLayout>
  );
}
