import { createMachine, interpret } from 'xstate';
import stateHelper from '$lib/StateHelper';

export const machine = createMachine(
  {
    id: 'PlayerStateMachine',
    initial: 'idle',
    states: {
      idle: {
        entry: {
          type: 'playerIdle',
          params: {},
        },
        on: {
          walk: {
            target: 'walk',
          },
          run: {
            target: 'run',
          },
        },
      },
      walk: {
        entry: {
          type: 'playerWalk',
          params: {},
        },
        on: {
          idle: {
            target: 'idle',
          },
          run: {
            target: 'run',
          },
        },
      },
      run: {
        entry: {
          type: 'playerRun',
          params: {},
        },
        on: {
          idle: {
            target: 'idle',
          },
          walk: {
            target: 'walk',
          },
        },
      },
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      playerRun: () => {},

      playerWalk: () => {},

      playerIdle: () => {},
    },
    services: {},
    guards: {},
    delays: {},
  },
);

const service = interpret(machine);

service
  .onTransition((state, event) => {
    stateHelper.state = state.value.toString();
  })
  .onEvent((a) => {
    stateHelper.sent = a.type;

    // stateHelper.sent = state.value.toString();
  });

service.start();

export default service;
