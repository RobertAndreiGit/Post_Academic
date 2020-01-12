import { withRouter, Switch, Route} from "react-router-dom";
import HomePage from './js/HomePage';
import LoginPage from './js/LoginPage';
import NotFound from './js/404';
import GradesPage from './js/GradesPage';
import AttendancePage from './js/AttendancePage';
import AdminAdministrateAccountsPage from './js/AdminAdministrateAccountsPage'
import ContractsPage from './js/ContractsPage'
import StudentInfoPage from "./js/StudentInfoPage"
import ResultsPage from "./js/ResultsPage"
import EmailPage from "./js/EmailPage"
import SendEmailPage from "./js/SendEmailPage"
import AdminOptionsPage from "./js/AdminOptionsPage"
import LocationsPage from "./js/LocationsPage"
import React from 'react'
import AI from "./js/AI";
import Trade from "./js/Trade"
import MyTrade from "./js/MyTrade"

function App() {	
	return (
	    <Switch>
			<Route path="/mytrade/" component={MyTrade} />
			<Route path="/trade" component={Trade} />
			<Route path="/location" component={LocationsPage} />
			<Route path="/ai" component={AI} />
	    	<Route path="/admin_options" component={AdminOptionsPage} />
	    	<Route path="/send_email" component={SendEmailPage} />
	    	<Route path="/email" component={EmailPage} />
	    	<Route path="/medii" component={ResultsPage} />
	    	<Route path="/student" component={StudentInfoPage} />
	    	<Route path="/contracte" component={ContractsPage} />
	    	<Route path="/admin_accounts" component={AdminAdministrateAccountsPage} />
			<Route path="/prezenta" component={AttendancePage} />
			<Route path="/note" component={GradesPage} />
			<Route path="/home" component={HomePage} />
			<Route path="/" component={LoginPage} />
			<Route component={NotFound} />
		</Switch>
	);
}


export default withRouter(App);