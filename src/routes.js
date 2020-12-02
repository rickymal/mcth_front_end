import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import TeamCreationPage from "./pages/teamcreationpage";
import MentoringSelectionPage from "./pages/mentoringselectionpage";
//import ChallengeSelectionPage from './pages/challengeselectionpage'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/dashboard" component={Dashboard} exact />
        <Route path="/teamcreationpage" component={TeamCreationPage} exact />
        <Route
          path="/mentoringselecionpage"
          component={MentoringSelectionPage}
          exact
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
