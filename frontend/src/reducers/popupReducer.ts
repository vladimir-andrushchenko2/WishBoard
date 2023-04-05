type OpenedPopup = {
  openedPopup: 'none' | 'edit-profile' | 'edit-avatar' | 'add-place';
};

type OpenedPopupWithImage = {
  openedPopup: 'show-image';
  selectedCard: Card;
};

type PopupState = OpenedPopup | OpenedPopupWithImage;

type PopupAction = {
  type:
    | 'close-all'
    | 'open-edit-profile'
    | 'open-edit-avatar'
    | 'open-add-place';
};

type PopupActionWithCard = {
  type: 'open-show-image';
  payload: {
    selectedCard: Card;
  };
};

type PopupReducerAction = PopupAction | PopupActionWithCard;

export const intialState: OpenedPopup = { openedPopup: 'none' };

export function popupReducer(
  state: PopupState,
  action: PopupReducerAction,
): PopupState {
  switch (action.type) {
    case 'close-all':
      return { openedPopup: 'none' };

    case 'open-add-place':
      return { openedPopup: 'add-place' };

    case 'open-edit-avatar':
      return { openedPopup: 'edit-avatar' };

    case 'open-edit-profile':
      return { openedPopup: 'edit-profile' };

    case 'open-show-image': {
      return {
        openedPopup: 'show-image',
        selectedCard: action.payload.selectedCard,
      };
    }

    default:
      return state;
  }
}
