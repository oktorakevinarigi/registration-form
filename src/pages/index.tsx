import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const Routes = () => {

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Suspense fallback={<div>Loading</div>}>
          <Route exact path="/" component={lazy(() => import('./form-registration/form-registration'))} />
        </Suspense>
      </Switch>
    </Router>
  );
};

export default observer(Routes);
