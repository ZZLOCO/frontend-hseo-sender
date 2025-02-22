import React, { useState } from 'react'
import { css } from '@emotion/react'
import { useEffect } from 'react'
import { BASE_URL } from 'config'
import axios from 'axios'

const KakaoLoginPage: React.FC = () => {
  const code = new URL(window.location.href).searchParams.get('code')

  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/login/kakao`, {
          headers: {
            'Authorization-Code': `${code}`,
          },
        })

        const access_token = res.data.access_token
        const refresh_token = res.data.refresh_token
        const user_id = res.data.user.id
        const nickname = res.data.user.nickname

        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
        localStorage.setItem('user_id', user_id)
        localStorage.setItem('nickname', nickname)
        console.log(user_id, nickname)
      } catch (e) {
        console.log(e)
      }
    }

    getToken()
    //window.location.assign('/main')
  }, [])

  return (
    <div css={Container}>
      <h1>로그인 중입니다. 잠시만 기다려 주세요</h1>
    </div>
  )
}

export default KakaoLoginPage

const Container = css`
  width: 60%;
  margin: 0 auto;
  max-width: 1256px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
