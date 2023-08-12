import {createMachine, interpret,} from "xstate";
import stateHelper from "$lib/StateHelper";
import playerConfigModel from "$lib/PlayerConfigModel";

const playerStateMachine = createMachine({
    predictableActionArguments: true,
    id: 'character',
    initial: 'idle',
    states: {
      idle: {
        entry: 'idle',
        on: {
          walk: {
            target: 'walk'
          },
          run: {
            target: 'run'
          },
        }
      },
      walk: {
        entry: 'walk',
        on: {
          idle: {
            target: 'idle'
          },
          run: {
            target: 'run'
          },
        }
      },
      run: {
        entry: 'run',
        on: {
          idle: {
            target: 'idle'
          },
          walk: {
            target: 'walk'
          },
        }
      },
    }
  },
  {
    actions: {
      idle: (context, event) => {

        console.log(context, event);
        playerConfigModel.one.setAnimation('idle')
      },
      walk: (context, event) => {
        playerConfigModel.one.setAnimation('walk')

      },
      run: (context, event) => {
        playerConfigModel.one.setAnimation('run')

      },
    }
  }
);

const service = interpret(playerStateMachine);

service
  .onTransition((state, event) => {
    stateHelper.state = state.value.toString();
  })
  .onEvent((a,) => {
    stateHelper.sent = a.type


    // stateHelper.sent = state.value.toString();
  })

service.start();


export default service;



