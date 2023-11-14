const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SET_AUTHENTICATION = 'SET_AUTHENTICATION';

export const login = () => ({
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setAuthentication = (isAuthenticated) => ({
  type: SET_AUTHENTICATION,
  payload: isAuthenticated,
});

export const sessionReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuthenticated: true };
    case LOGOUT:
      return { ...state, isAuthenticated: false };
    case SET_AUTHENTICATION:
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
};

const SELECT_TRANSACTION = 'SELECT_TRANSACTION';
const SELECT_CATEGORY = 'SELECT_CATEGORY';
const SELECT_MONEY_POT = 'SELECT_MONEY_POT';
const SELECT_SCHEDULED_ACTION = 'SELECT_SCHEDULED_ACTION';

export const selectTransaction = (id, data) => ({
  type: SELECT_TRANSACTION,
  payload: { id, data },
});
export const selectCatgeory = (id, data) => ({
  type: SELECT_CATEGORY,
  payload: { id, data },
});
export const selectMoneyPot = (id, data) => ({
  type: SELECT_MONEY_POT,
  payload: { id, data },
});
export const selectScheduledAction = (id, data) => ({
  type: SELECT_SCHEDULED_ACTION,
  payload: { id, data },
});

export const selectItemReducer = (state, action) => {
  const actionObj = {
    id: action.payload.id,
    data: action.payload.data,
  };
  switch (action.type) {
    case SELECT_TRANSACTION:
      console.log(actionObj)
      return {
        ...state,
        selectedTransaction: {
          id: action.payload.id,
          data: action.payload.data,
        },
      };
    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: actionObj,
      };
    case SELECT_MONEY_POT:
      return {
        ...state,
        selectedMoneyPot: actionObj,
      };
    case SELECT_SCHEDULED_ACTION:
      return {
        ...state,
        selectedScheduledAction: actionObj,
      };
    default:
      return state;
  }
};
