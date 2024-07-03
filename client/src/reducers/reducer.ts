import { State } from '../models/state';

type Actions =
  { type: "activateAccess", token: string } |
  { type: "changeMenu", option: number };

export default function Reducer(state: State, action: Actions) {
  const reducer = {
    activateAccess: () => {
      state.menuAdminOp = 2;
      state.showOp = true;
      state.token = action.token;

      return state;
    },
    changeMenu: () => {
      state.menuAdminOp = action.option;
      return state;
    },
    logout: () => {
      state.token = null;
      state.showOp = false;
      return state;
    },
    default: () => {
      alert(`the action type '${action.type}' not found.`)
    }
  }

  return (reducer[action.type] || reducer["default"])();
}