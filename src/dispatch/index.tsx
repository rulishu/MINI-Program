import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';

interface ToastProps {
  children?: React.ReactNode;
}
// eslint-disable-next-line import/no-mutable-exports
let dispatch: Dispatch<AnyAction>;

const ComDispatch = (props: ToastProps) => {
  const { children } = props;
  dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'global/getUserInfo' });
  }, []);

  return children;
};

export { dispatch };

export default ComDispatch;
