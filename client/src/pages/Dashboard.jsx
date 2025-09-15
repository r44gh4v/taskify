import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from '../features/tasks/tasksApiSlice';
import { useLogoutMutation } from '../features/auth/usersApiSlice';
import { logout } from '../features/auth/authSlice';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('personal');
  const [filter, setFilter] = useState('');

  const { userInfo } = useSelector((state) => state.auth);
  const { data: tasks, isLoading, error } = useGetTasksQuery(filter);

  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [logoutApiCall] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (title) {
      try {
        await createTask({ title, category }).unwrap();
        toast.success('Task created!');
        setTitle('');
      } catch {
        toast.error('Could not create task');
      }
    }
  };

  const handleUpdateTask = async (id, isDone) => {
    try {
      await updateTask({ id, isDone: !isDone }).unwrap();
    } catch {
      toast.error('Could not update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id).unwrap();
      toast.success('Task deleted');
    } catch {
      toast.error('Could not delete task');
    }
  };

  const categories = ['personal', 'work', 'study', 'other'];

  return (
    <div className='container mx-auto p-4 max-w-3xl' aria-busy={isLoading ? 'true' : 'false'}>
      <header className='flex justify-between items-center py-6'>
        <div>
          <p className='text-sm text-gray-500'>Welcome back</p>
          <h1 className='text-2xl font-semibold'>Hi, {userInfo?.name}</h1>
        </div>
        <button onClick={handleLogout} className='px-3 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer'>
          Logout
        </button>
      </header>
      <div className='my-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200'>
        <form onSubmit={handleCreateTask} className='flex flex-col sm:flex-row gap-3'>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-grow px-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer">
            {categories.map(cat => <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}
          </select>
          <button type="submit" disabled={isCreating} aria-disabled={isCreating} className="px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-indigo-400 cursor-pointer disabled:cursor-not-allowed">
            {isCreating ? 'Adding...' : 'Add Task'}
          </button>
        </form>
      </div>
      <div className='mb-4 flex items-center gap-2 overflow-x-auto whitespace-nowrap -mx-4 px-4'>
        <span className='text-sm text-gray-600 mr-1'>Filter:</span>
        <button onClick={() => setFilter('')} className={`px-3 py-1.5 rounded-full text-sm border cursor-pointer ${!filter ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>All</button>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1.5 rounded-full text-sm border cursor-pointer ${filter === cat ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-200'>
        {isLoading ? (
          <ul className='space-y-3 animate-pulse' role='status' aria-live='polite'>
            {[0,1,2].map((i) => (
              <li key={i} className='flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100'>
                <div className='flex items-center gap-3 w-full'>
                  <div className='h-5 w-5 rounded bg-gray-200' />
                  <div className='flex-1'>
                    <div className='h-4 bg-gray-200 rounded w-40 mb-2' />
                    <div className='h-3 bg-gray-200 rounded w-16' />
                  </div>
                </div>
                <div className='h-4 w-12 bg-gray-200 rounded' />
              </li>
            ))}
          </ul>
        ) : error ? (
          <p className='text-red-500'>Error loading tasks.</p>
        ) : (
          tasks?.length ? (
            <ul className='space-y-3'>
              {tasks.map((task) => (
                <li key={task._id} className='flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100'>
                  <div className='flex items-center'>
                    <input
                      type="checkbox"
                      checked={task.isDone}
                      onChange={() => handleUpdateTask(task._id, task.isDone)}
                      className='h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer'
                    />
                    <div className='ml-3'>
                      <p className={`text-base ${task.isDone ? 'line-through text-gray-500' : 'text-gray-900'}`}>{task.title}</p>
                      <span className='text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full'>{task.category}</span>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteTask(task._id)} className='text-red-500 hover:text-red-600 text-sm cursor-pointer'>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className='text-center py-10 text-gray-600'>
              <p className='text-base'>No tasks yet</p>
              <p className='text-sm'>Add your first task to get started.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
