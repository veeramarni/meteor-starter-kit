import { Route, Router, browserHistory } from 'react-router';
import App from './components/App';
import AboutPage from './components/AboutPage';

export default (
    <Route>
        <Route path="/(:filter)" component={App} />
        <Route path="/about" component={AboutPage}/>
    </Route>
);