import { CoreState, selectUser } from '@openware/core-data';
import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Layout } from './routes';

interface AppProps {
    history: History;
    user: CoreState['user'];
}

class AppComponent extends React.Component<AppProps, {}, {}> {
    public render() {
        const { history, user } = this.props;
        return (
            <Router history={history}>
                <React.Fragment>
                    <div className="bitto-app">
                        <Header/>
                        <div className="bitto-main">
                            <Sidebar isUserLoggedIn={user.email.length > 0} />
                            <Layout />
                        </div>
                    </div>
                    <Footer/>
                </React.Fragment>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    user: selectUser(state),
});

const App = connect(mapStateToProps, null)(AppComponent);

export {
    AppProps,
    App,
};
