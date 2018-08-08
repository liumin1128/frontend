import request from '@/utils/request';
import Router from 'next/router';
import { setStorage } from '@/utils/store';
import { STORE_USER_KEY } from '@/constants/base';

export default {
  test: () => {
    console.log('test effects');
  },
  'user/loginByOauth': async ({ payload, cb }, { getState, dispatch }) => {
    try {
      const { token } = payload;
      if (token) {
        await setStorage(STORE_USER_KEY, { token });
        await dispatch({ type: 'user/save', payload: { token } });
        await Router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  },
  'user/login': async ({ payload, cb }, { getState, dispatch }) => {
    try {
      const { status, token, userInfo } = await request('user/login', payload);
      if (status === 200) {
        await setStorage(STORE_USER_KEY, { token });
        await dispatch({ type: 'user/save', payload: { userInfo } });
      }
    } catch (error) {
      console.log(error);
    }
  },
  'common/getQiniuToken': async ({ payload, cb }, { getState, dispatch }) => {
    const { token } = await request('common/getQiniuToken');
    await dispatch({ type: 'common/save', payload: { qiniuToken: token } });
  },
};
