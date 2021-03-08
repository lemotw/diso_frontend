import {Redirect} from "react-router-dom"

export const PrivateRoute = ({
  auth: auth,
  children: children,
  redirect: redirect
}) => {
  return auth.isLogin ? (children) : (<Redirect to={redirect}/>);
}

export const PrivateItem = ({
  auth, children
}) => {
  return auth.isLogin?(children):NaN;
};

export const NotPrivateItem = ({
  auth, children
}) => {
  return !auth.isLogin?(children):NaN;
}