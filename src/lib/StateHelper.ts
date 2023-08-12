interface StateHelper {
  state: string;
  sent: string;
  keys: string[];
  controllers: number[];
  buttons: number[];
  axes: number[];
}

const stateHelper: StateHelper = {
  state: '',
  sent: '',
  keys: [],
  controllers: [],
  buttons: [],
  axes: [],
}

export default stateHelper;
