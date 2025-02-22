import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { css } from '@emotion/react'
import { AiOutlineUser } from 'react-icons/ai'
import { ButtonDefault, FONT_SIZE_STYLE } from 'styles/GlobalStyles'
import { RootState } from 'store/configureStore'
import Modal from 'components/Modal'
import MyPage from 'components/MyPage'
import Policy from 'components/Policy'
import Privacy from 'components/Privacy'
import { showModal, SHOW_MYPAGE_MODAL } from 'store/actions/modal'

const MainPage: React.FC = () => {
  const history = useHistory()
  const modal = useSelector((state: RootState) => state.modal)
  const dispatch = useDispatch()

  useEffect(() => {
    const getIdNickname = () => {
      const userId = localStorage.getItem('user_id')
      const nickname = localStorage.getItem('nickname')
      console.log(userId, nickname)
    }

    getIdNickname()
  }, [])

  const handleMenuButtonClick = (menu: string) => {
    history.push(`/${menu}`)
  }

  const myMenuButtonClick = () => {
    dispatch(showModal(SHOW_MYPAGE_MODAL))
  }

  const modalType = () => {
    if (modal.showMyPageModal) return <MyPage />
    if (modal.showPolicyModal) return <Policy />
    if (modal.showPrivacyModal) return <Privacy />
  }

  return (
    <div css={Container}>
      <button
        css={MainMenuButton}
        onClick={() => handleMenuButtonClick('gift')}
      >
        선물하기
      </button>
      <button
        css={MainMenuButton}
        onClick={() => handleMenuButtonClick('sent')}
      >
        보낸 선물 리스트
      </button>
      <button css={MainMenuButton} onClick={myMenuButtonClick}>
        <AiOutlineUser />
      </button>
      <Modal>{modalType()}</Modal>
    </div>
  )
}

export default MainPage

const Container = css`
  width: 100%;
  margin: 0 auto;
  max-width: 768px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: ${FONT_SIZE_STYLE.large};
`
const MainMenuButton = css`
  ${ButtonDefault}
  font-size: ${FONT_SIZE_STYLE.large};
  background-color: #4a847a;
  color: white;
  margin: 10px;
  padding: 10px;
  border-radius: 6px;
`
