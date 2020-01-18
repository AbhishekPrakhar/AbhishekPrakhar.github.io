const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Compound A' },
    'task-2': { id: 'task-2', content: 'Compound B' },
    'task-3': { id: 'task-3', content: 'Compound C' },
    'task-4': { id: 'task-4', content: 'Compound D' },
    'task-5': { id: 'task-5', content: 'Compound E' },
    'task-6': { id: 'task-6', content: 'Compound F' },
    'task-7': { id: 'task-7', content: 'Compound G' },
    'task-8': { id: 'task-8', content: 'Compound H' },
    'task-9': { id: 'task-9', content: 'Compound I' }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: '2020',
      taskIds: ['task-1']
    },
    'column-2': {
      id: 'column-2',
      title: '2021',
      taskIds: []
    },
    'column-3': {
      id: 'column-3',
      title: '2022',
      taskIds: ['task-3', 'task-2']
    },
    'column-4': {
      id: 'column-4',
      title: '2023',
      taskIds: ['task-4', 'task-5', 'task-6', 'task-7']
    },
    'column-5': {
      id: 'column-5',
      title: '2024',
      taskIds: ['task-8', 'task-9']
    }
  },
  // Facilitate reordering of the columns
  columnOrder: [
    'column-1',
    'column-2',
    'column-3',
    'column-4',
    'column-5'
  ]
}

export default initialData
