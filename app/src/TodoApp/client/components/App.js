import React, { PropTypes } from 'react';
import AddTodo from './AddTodo';
import { Link } from 'react-router';
import VisibleTodoList from './VisibleTodoList';
import Footer from './Footer';

const App = ({params}) => (
        <div>
            <AddTodo />

            {/** Need to remove params so it can inject directly into VisibleTodoList, right now it fails*/}
            <VisibleTodoList params={params} />
            <Footer />
            <Link to="/about">About</Link>

        </div>
);
App.propTypes = {
    params: PropTypes.shape({
        filter: PropTypes.string
    })
};

export default App;