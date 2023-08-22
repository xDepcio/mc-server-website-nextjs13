const CHANGE_SHOW_STATUS = 'shop/changeShowStatus'

//regular action creator
// @ts-ignore
export const changeShowStatus = (value) => {
  return {
    type: CHANGE_SHOW_STATUS,
    showInfo: value
  }
}

// state object
const initialState = { showInfo: false };

// reducer
// @ts-ignore
const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SHOW_STATUS: {
      const newState = { ...state }
      newState.showInfo = action.showInfo
      return newState
    }
    default:
      return state;
  }
};

export default shopReducer;
