import { ActionType } from '@mautomate/api-interfaces';

export const ActionTypeParser: Record<ActionType, string> = {
  [ActionType.Routine]: 'Routine',
  [ActionType.TurnOff]: 'Turn off',
  [ActionType.TurnOn]: 'Turn on',
};
