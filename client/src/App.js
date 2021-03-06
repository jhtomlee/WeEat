import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Home from './components/Home';
import Feature1 from './components/Feature1';
import Feature2 from './components/Feature2';
import Feature3 from './components/Feature3';
import SearchPage from './components/SearchPage';
import LandingPage from './components/LandingPage';
import './App.css';

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
				<Route
						exact
						path="/Main"
						render={() => (
							<LandingPage />
						)}
					/>
					<Route
						exact
						path="/"
						render={() => (
							<LandingPage />
						)}
					/>
					<Route
						exact
						path="/Home"
						render={() => (
							<Home />
						)}
					/>
					<Route
						exact
						path="/Feature2"
						render={() => (
							<Feature2 />
						)}
					/>
					<Route
						exact
						path="/Feature1"
						render={() => (
							<Feature1 />
						)}
					/>
					<Route
						exact
						path="/Feature3"
						component={Feature3} 
					/>
					<Route
						exact
						path="/Search"
						component={SearchPage}
					/>
					/>
				</Switch>
			</Router>
		</div>
	);
}

export default App;