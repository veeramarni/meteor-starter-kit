import React from 'react';
import TodoList from './TodoList';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleComplete } from '../actions/actions';


const getVisibleTodo = (todos, filter) => {
    console.log(todos);
    switch(filter){
        case "all":
            return todos;
        case "completed":
            return todos.filter( t => t.completed);
        case "active":
            return todos.filter( t => !t.completed);
        default:
            console.log("different page");
    }
};

const mapStateToProps = (state, { params }) => ({
    todos: getVisibleTodo(state.todoApp.todos, params.filter || 'all')
});

const mapDispatchToProps = (dispatch) =>  ({
        onTodoClick: (id) => dispatch(toggleComplete(id))
});


const VisibleTodoList = withRouter(connect(mapStateToProps,
        mapDispatchToProps
)(TodoList));

export default VisibleTodoList;