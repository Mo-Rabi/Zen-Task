import React, { useState } from 'react';
//import styles from './Profile.module.css'
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import jwtDecode from 'jwt-decode';

//! React Query get all tasks
export default function Profile() {
  let [apiResponse, setApiResponse] = useState({ message: '', status: '' });
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields, isDirty, isValid },
    control,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    newTaskMutation.mutate({
      ...data,
      authorId,
    });
  };

  const { onChange, onBlur, name, ref } = register('title');
  //! Get User ID from token
  const token = localStorage.getItem('token');
  console.log(token);
  const authorId = jwtDecode(token).id;
  console.log('Auhor ID: ', authorId);

  const queryClient = useQueryClient();

  //! Retrieve tasks
  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      console.log('Hi');
      let { data } = await axios.get('https://zen-task.onrender.com/tasks');
      data = data.allTasks;
      console.log(data);
      return data;
    },
  });

  //! React Query add a new task
  const newTaskMutation = useMutation({
    mutationFn: (values) => {
      let response = axios.post('https://zen-task.onrender.com/addTask', values);
      console.log(response);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    },
  });

  if (tasksQuery.isLoading) return <h1>Loading...</h1>;
  if (tasksQuery.isError) return <pre>{JSON.stringify(tasksQuery.error)}</pre>;

  if (newTaskMutation.isLoading) return <h1>Adding task...</h1>;
  if (newTaskMutation.isError)
    return <pre>{JSON.stringify(newTaskMutation.error)}</pre>;

  return (
    <div className="d-flex flex-wrap m-2 justify-content-center">
      {tasksQuery.data.map((task) => (
        <div
          className={`d-flex flex-wrap flex-row m-2  ${
            task.status === 'done'
              ? 'bg-success'
              : task.status === 'toDo'
              ? 'bg-primary'
              : task.status === 'inProgress'
              ? 'bg-warning'
              : ''
          } mb-1 w-25`}
          key={task._id}
        >
          {task.title} <br />
          {task.status} <br />
          <br />
        </div>
      ))}
      <br />
      <div className="container mt-5 col-12 d-block">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3 form-floating">
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Title"
              {...register('title')}
            />

            <label htmlFor="titlte" className="form-label">
              Title
            </label>
          </div>

          <div className="mb-3 form-floating">
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Description"
              {...register('description')}
            />

            <label htmlFor="description" className="form-label">
              Description
            </label>
          </div>

          <div className="mb-3 form-floating">
            <input
              type="email"
              className="form-control"
              id="assignTo"
              name="assignTo"
              placeholder="Assign To"
              {...register('assignTo')}
            />

            <label htmlFor="assignTo" className="form-label">
              Assign To
            </label>
          </div>
          {/* Status */}
          <select
            className="form-select mb-3"
            aria-label="Default select example"
            id="status"
            name="status"
            {...register('status')}
          >
            <option selected disabled>
              Status
            </option>
            <option value="toDo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>

          {/* Priority */}
          <select
            className="form-select mb-3"
            aria-label="Default select example"
            id="priority"
            name="priority"
            {...register('priority')}
          >
            <option selected>Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {/*! Deadline */}
          <div className="mb-3 form-floating">
            <input
              type="date"
              className="form-control"
              id="deadline"
              name="deadline"
              placeholder="Deadline"
              {...register('deadline')}
            />

            <label htmlFor="deadline" className="form-label">
              Deadline
            </label>
          </div>

          <div className="mb-3 text-center">
            <button type="submit" className="btn btn-primary text-white col-4">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
