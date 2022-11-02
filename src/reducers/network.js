export const NETWORK = "NETWORK";

export const networkChange = value => ({ type: NETWORK, value });

const initalState = {
  value: 0
};

export const network = (state = initalState, action) => {
  switch (action.type) {
    case NETWORK:
      return {
        ...state,
        value: action.value
      };

    // default를 쓰지 않으면 맨처음 state에 count값이 undefined가 나옵니다 꼭! default문을 넣으세요
    default:
      return state;
  }
};