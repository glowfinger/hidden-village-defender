import { createMachine, interpret } from 'xstate';
import stateHelper from '$lib/StateHelper';

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAUA2BDAnmATgZQBd0CwBZdAYwAsBLAOzADoaJUwBiAd3VQGsBtAAwBdRKAAOAe1g0CNSXTEgAHogBMagKyMAnJoDMARjV7BOgByCDANgA0ITOs2DGWwe-MB2Tc42e1AL4B9mhYuITEZJS0DMysHDgArnRCokggUjJyCkqqCBraekYmzhZW+nYOiOaGjAAsOo0W5vo61nVqhtZBIRjY+EQk5NT0TNx87CxsqUqZsvKK6XlqRoyanoJq5tZWhi2e5vaOCIaNjN7um4Z1dZ7WOj0gof0RQ9GjjOO87EkpIrPSeY5JaIHbaTrWfSCPaaNpaQ5VBBGcyMfRaWHmCyGbGCOqPZ7hQZREaxX6TeIzdJzbKLUB5BpqRiGTTWNSCGrba7WayeI6IfSeHRrFr6Oq43F1fTmQLBJ59QmRYYxJhkr6UiSAmm5RAs2pde7bHRi66ivknM4XdydG53B6POiSCBwJQEgaK94MAFZBbahAAWkqxz9Ytc5hqsM0Yp2d26stdr2JyribC9QNpKkQHTN+lWkpztwubXM+PlbreJLGPF4qa1IPy5jqTJMgihmx0opMvMRWkbbQ6mi2LahamsxbjpYTSo+vxrPrrHSF7a0bPWGjUdUMZturmxDc0NRhDWuQSCQA */
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
});

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
