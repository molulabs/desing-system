/** A step's state: its own override, else done before the current one and todo after it. */
export const statusOf = (s, i, current) => s.status || (i < current ? 'done' : i === current ? 'current' : 'todo');
