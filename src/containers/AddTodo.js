import React, { useEffect, useState } from 'react'
import { TextField, Stack, Box, Toolbar, Button } from '@mui/material';
import { getAuth } from '@firebase/auth';
import { getDatabase, ref, update, push } from "firebase/database";
import { connect } from 'react-redux'
import { addTodo, addDueDate } from '../actions'
import DatePicker from "react-datepicker";

const AddTodo = (props) => {
  const [input, setInput] = useState("");
  useEffect(() => {
    if (props.todos.currentTodoData) {
      const auth = getAuth()
      const userId = auth.currentUser.uid;
      const db = getDatabase();
      const listRef = ref(db, 'users/' + userId + '/list')
      const newListRef = push(listRef);
      update(newListRef, props.todos.currentTodoData);
    }
  }, [props.todos.currentTodoData])
  const handleChange = (e) => {
    setInput(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) {
      return
    }
    props.dispatch(addTodo(input));
    setInput("");
  }
  return (
    <Box sx={{ width: "50%" }}>
      <Toolbar />
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} margin={2}>
          <TextField style={{ background: "white", borderRadius: "10px" }} label="Add task" variant="outlined" onChange={handleChange} value={input} required />
          <div className=''>
            <DatePicker
              selected={props.todos.dueDate}
              onChange={props.addDueDate}
              className='addDueDateInput'
              placeholderText="MM/DD/YYYY"
              required
            />
          </div>
          <Button sx={{ width: "110px" }} type="submit" variant="contained">Add</Button>
        </Stack>
      </form>
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDueDate: (date) => {
      dispatch(addDueDate(date));
    },
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
