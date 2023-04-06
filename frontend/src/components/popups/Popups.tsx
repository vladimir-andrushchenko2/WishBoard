import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import InfoTooltip from './InfoTooltip'
import { PopupState, PopupReducerAction } from '../../reducers/popupReducer'
import { Dispatch } from 'react'
import { api } from '../../utils/api'

type PopupsProps = {
  popupState: PopupState
  dispatchPopupAction: Dispatch<PopupReducerAction>
  setCards: React.Dispatch<React.SetStateAction<Card[]>>
  cards: Card[]
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export default function Popups({
  popupState,
  dispatchPopupAction,
  setCards,
  cards,
  setCurrentUser,
}: PopupsProps) {
  function handleAddPlaceSubmit(name: string, link: string) {
    api
      .postCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards])
        // closeAllPopups()
        dispatchPopupAction({
          type: 'close-all',
        })
      })
      .catch((err) => console.error(err))
  }

  function handleUpdateUser({ name, about }: { name: string; about: string }) {
    api
      .patchUserInfo(name, about)
      .then((updatedUser: User) => {
        setCurrentUser(updatedUser)
        dispatchPopupAction({
          type: 'close-all',
        })
      })
      .catch((err) => console.error(err))
  }

  function handleUpdateAvatar({ avatar }: { avatar: string }) {
    api
      .patchUserAvatar(avatar)
      .then((updatedUser: User) => {
        setCurrentUser(updatedUser)
        dispatchPopupAction({
          type: 'close-all',
        })
      })
      .catch((err) => console.error(err))
  }

  return (
    <>
      <EditProfilePopup
        isOpen={popupState.openedPopup === 'edit-profile'}
        onClose={() => dispatchPopupAction({ type: 'close-all' })}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={popupState.openedPopup === 'add-place'}
        onClose={() => dispatchPopupAction({ type: 'close-all' })}
        onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup
        isOpen={popupState.openedPopup === 'edit-avatar'}
        onClose={() => dispatchPopupAction({ type: 'close-all' })}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ImagePopup
        card={
          popupState.openedPopup === 'show-image'
            ? popupState.selectedCard
            : undefined
        }
        onClose={() => dispatchPopupAction({ type: 'close-all' })}
      />

      <InfoTooltip
        onClose={() => dispatchPopupAction({ type: 'close-all' })}
        isOpen={
          popupState.openedPopup === 'success-tooltip' ||
          popupState.openedPopup === 'error-tooltip'
        }
        isSuccess={popupState.openedPopup === 'success-tooltip'}
      ></InfoTooltip>
    </>
  )
}
