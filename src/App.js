import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

import Auth from './pages/Auth';
import ManageUsers from './pages/ManageUsers'
import CottageForm from './pages/CottageForm'
import Header from './pages/pageComponents/Header'
import ManageCottage from './pages/pageComponents/ManageCottage'

import Modal from "./components/Modal";

import './assets/styles/main.css';


export const AppContext = React.createContext({
  authToken: '',
  manageCottageVisible: false
});

class AppContextRoot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authToken: Cookies.get('auth-token'),
      manageCottageVisible: false
    };
  }

  handleAuthState = (token) => {
    this.setState({
      authToken: token
    });

    if (token) {
      Cookies.set('auth-token', token);
    } else {
      Cookies.remove('auth-token');
    }
  }

  handleManageCottageVisible = (manageCottageVisible) => {
    this.setState({
      manageCottageVisible
    })
  }

  render() {

    const { authToken, manageCottageVisible } = this.state;

    return (
      <AppContext.Provider value={{
        authToken,
        manageCottageVisible,
        handleAuthState: this.handleAuthState,
        handleManageCottageVisible: this.handleManageCottageVisible
      }}>
        <App
          manageCottageVisible={manageCottageVisible}
          authToken={authToken}
          handleManageCottageVisible={this.handleManageCottageVisible}
          handleAuthState={this.handleAuthState}
        />
      </AppContext.Provider>
    );
  }
}

const App = ({authToken,manageCottageVisible, handleManageCottageVisible, handleAuthState}) => {

  return (
    <div className="App">
      <Router>
        {authToken && <Header />}
        <main>
          <Switch>
            {authToken ?
              (
                <>
                  <Route exact path="/manageUsers">
                    <ManageUsers />
                  </Route>
                  <Route exact path="/cottageForm/:cottageId">
                    <CottageForm />
                  </Route>
                </>
              ) :
              <>
                <Route exact path="/auth">
                  <Auth handleAuthState={handleAuthState} />
                </Route>
                <Redirect to="/auth" />
              </>
            }
          </Switch>
        </main>
        {manageCottageVisible && (
          <Modal
            wide
            isOpen={true}
            onExit={() => handleManageCottageVisible(false)}>
            <ManageCottage />
          </Modal>
        )}
      </Router>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        closeOnClick
      />
    </div>
  );
};

App.propTypes = {
  authToken: PropTypes.string,
  handleAuthState: PropTypes.func
};

export default AppContextRoot;
