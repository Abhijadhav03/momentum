import { describe, it, expect, beforeEach } from 'vitest'
import { useTaskStore } from '@/store/useTaskStore'

describe('useTaskStore', () => {
  beforeEach(() => {
    // Reset store to initial state
    useTaskStore.setState({
      tasks: [],
      searchQuery: '',
      filterPriority: 'All',
      sortBy: 'none',
    })
  })

  // Test 6: Add task to store
  it('adds a new task to the store', () => {
    const store = useTaskStore.getState()
    
    store.addTask({
      title: 'Test Task',
      description: 'Test Description',
      priority: 'High',
      status: 'todo',
      dueDate: '',
      tags: [],
    })
    
    const state = useTaskStore.getState()
    expect(state.tasks).toHaveLength(1)
    expect(state.tasks[0].title).toBe('Test Task')
    expect(state.tasks[0].priority).toBe('High')
  })

  // Test 7: Move task between columns
  it('moves task from todo to doing', () => {
    const store = useTaskStore.getState()
    
    store.addTask({
      title: 'Test Task',
      description: 'Test Description',
      priority: 'Medium',
      status: 'todo',
      dueDate: '',
      tags: [],
    })
    
    const taskId = useTaskStore.getState().tasks[0].id
    store.moveTask(taskId, 'doing')
    
    const state = useTaskStore.getState()
    expect(state.tasks[0].status).toBe('doing')
  })

  // Test 8: Delete task from store
  it('deletes a task from the store', () => {
    const store = useTaskStore.getState()
    
    store.addTask({
      title: 'Task to Delete',
      description: 'Will be deleted',
      priority: 'Low',
      status: 'todo',
      dueDate: '',
      tags: [],
    })
    
    const taskId = useTaskStore.getState().tasks[0].id
    store.deleteTask(taskId)
    
    const state = useTaskStore.getState()
    expect(state.tasks).toHaveLength(0)
  })

  // Test 9: Update task properties
  it('updates task title and priority', () => {
    const store = useTaskStore.getState()
    
    store.addTask({
      title: 'Original Title',
      description: 'Original Description',
      priority: 'Low',
      status: 'todo',
      dueDate: '',
      tags: [],
    })
    
    const taskId = useTaskStore.getState().tasks[0].id
    store.updateTask(taskId, { title: 'Updated Title', priority: 'High' })
    
    const state = useTaskStore.getState()
    expect(state.tasks[0].title).toBe('Updated Title')
    expect(state.tasks[0].priority).toBe('High')
    expect(state.tasks[0].description).toBe('Original Description')
  })

  // Test 10: Reset board clears all tasks
  it('clears all tasks when resetting board', () => {
    const store = useTaskStore.getState()
    
    store.addTask({
      title: 'Task 1',
      description: 'Description 1',
      priority: 'High',
      status: 'todo',
      dueDate: '',
      tags: [],
    })
    
    store.addTask({
      title: 'Task 2',
      description: 'Description 2',
      priority: 'Medium',
      status: 'doing',
      dueDate: '',
      tags: [],
    })
    
    expect(useTaskStore.getState().tasks).toHaveLength(2)
    
    store.resetBoard()
    
    const state = useTaskStore.getState()
    expect(state.tasks).toHaveLength(0)
  })
})
