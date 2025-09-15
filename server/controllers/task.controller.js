import Task from '../models/task.model.js';

const getTasks = async (req, res) => {
  const { category } = req.query;
  const filter = { user: req.user._id };

  if (category) {
    filter.category = category;
  }

  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  res.status(200).json(tasks);
};

const createTask = async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !category) {
    res.status(400).json({ message: 'Please add a title and category' });
    return;
  }

  const task = await Task.create({
    title,
    description,
    category,
    user: req.user._id,
  });

  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401).json({ message: 'User not authorized' });
    return;
  }
  
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { isDone: req.body.isDone },
    { new: true }
  );

  res.status(200).json(updatedTask);
};

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401).json({ message: 'User not authorized' });
    return;
  }

  await task.deleteOne();

  res.status(200).json({ id: req.params.id, message: 'Task removed' });
};

export { getTasks, createTask, updateTask, deleteTask };