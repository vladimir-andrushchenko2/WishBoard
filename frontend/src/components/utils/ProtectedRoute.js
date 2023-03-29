import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, checkCallback, redirectPath, ...props }) {
  return (
    <Route>
      {() => checkCallback() ? <Component {...props} /> : <Redirect to={redirectPath} />}
    </Route>
  )
}

export default ProtectedRoute;
