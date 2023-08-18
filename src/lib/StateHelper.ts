interface StateHelper {
  state: string;
  sent: string;
  keys: string[];
  controllers: number[];
  buttons: number[];
  axes: number[];
  gameFocus: boolean;
}

const stateHelper: StateHelper = {
  state: '',
  sent: '',
  keys: [],
  controllers: [],
  buttons: [],
  axes: [],
  gameFocus: true,
}

export default stateHelper;
