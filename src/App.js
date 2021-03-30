import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';
import axios from "axios";

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

import Auth from './pages/Auth';
import ManageUsers from './pages/ManageUsers'
import CottageForm from './pages/CottageForm'
import Header from './pages/pageComponents/Header'
import ManageCottage from './pages/pageComponents/ManageCottage'

import api from './api';

import Modal from "./components/Modal";

import './assets/styles/main.css';
import {httpErrorCodeToMessage, isAdmin} from "./utils";

export const AppContext = React.createContext({
  accessToken: '',
  manageCottageVisible: false,
  user: null,
  setUser: () => {
  }
});

class AppContextRoot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: localStorage.getItem('accessToken'),
      manageCottageVisible: false,
      user: null,
    };
  }

  componentDidMount() {
    this.handleAuthToken()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.accessToken !== this.state.accessToken) {
      this.handleAuthToken()
    }
  }

  handleAuthState = (accessToken) => {
    this.setState({
      accessToken
    });

    if (accessToken) {
      axios.defaults.headers
      localStorage.setItem('accessToken',accessToken)
    } else {
      localStorage.removeItem('accessToken')
    }
  }

  handleAuthToken = () => {
    if (!this.state.accessToken) {
      delete api.defaults.headers['Authorization']
      localStorage.removeItem('accessToken')
      this.setState({
        user: null
      })
    } else {
      api.defaults.headers['Authorization'] = `Bearer ${this.state.accessToken}`;
      this.fetchUser()
    }
  }

  fetchUser = () => {
    api.get('Users/current')
      .then(({data}) => {
        this.setState({
          user: {
            ...data.data,
            isAdmin: isAdmin(data.data.role)
          }
        })
      }).catch(() => {
        toast.error(httpErrorCodeToMessage());
    })
  }

  handleManageCottageVisible = (manageCottageVisible) => {
    this.setState({
      manageCottageVisible
    })
  }

  render() {

    const {accessToken, manageCottageVisible, user} = this.state;

    return (
      <AppContext.Provider value={{
        accessToken,
        manageCottageVisible,
        user,
        handleAuthState: this.handleAuthState,
        handleManageCottageVisible: this.handleManageCottageVisible
      }}>
        <App
          manageCottageVisible={manageCottageVisible}
          accessToken={accessToken}
          handleManageCottageVisible={this.handleManageCottageVisible}
          handleAuthState={this.handleAuthState}
          user={user}
        />
      </AppContext.Provider>
    );
  }
}

const App = ({
               accessToken,
               manageCottageVisible,
               handleManageCottageVisible,
               handleAuthState,
               user,
             }) => {

  return (
    <div className="App">
      <Router>
        {!!accessToken && <Header/>}
        <main>
          <Switch>
            {accessToken ?
              (
                <>
                  <Route exact path={`/manageUsers`}>
                    {user && !user?.isAdmin ?
                      (<Redirect to={'/'} />)
                      : <ManageUsers/>
                    }
                  </Route>
                  <Route exact path="/cottageForm/:cottageId">
                    <CottageForm/>
                  </Route>
                </>
              ) :
              <>
                <Route exact path={`/auth`}>
                  <Auth handleAuthState={handleAuthState}/>
                </Route>
                <Redirect to={`/auth`}/>
              </>
            }
          </Switch>
        </main>
        {manageCottageVisible && (
          <Modal
            wide
            isOpen={true}
            onExit={() => handleManageCottageVisible(false)}>
            <ManageCottage/>
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
  accessToken: PropTypes.string,
  handleAuthState: PropTypes.func
};

export default withRouter(AppContextRoot);
