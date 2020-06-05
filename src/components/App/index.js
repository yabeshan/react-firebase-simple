import React from 'react';
import { 
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import HomePage from '../Home';

import * as ROUTERS from '../../constants/routes';

const App = () => (
    <Router>
        <Navigation />
        <hr />
        <Route exact path={ROUTERS.LANDING} component={LandingPage} />
        <Route exact path={ROUTERS.HOME} component={HomePage} />
    </Router>
);

export default App;