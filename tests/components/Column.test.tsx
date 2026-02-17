import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Column } from '@/features/board/components/Column'
import { DndContext } from '@dnd-kit/core'

// Mock useDroppable
vi.mock('@dnd-kit/core', async () => {
  const actual = await vi.importActual('@dnd-kit/core')
  return {
    ...actual,
    useDroppable: () => ({
      setNodeRef: vi.fn(),
      isOver: false,
    }),
  }
})

// Mock SortableContext
vi.mock('@dnd-kit/sortable', async () => {
  const actual = await vi.importActual('@dnd-kit/sortable')
  return {
    ...actual,
    SortableContext: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }
})

describe('Column', () => {
  const mockColumn = {
    id: 'todo',
    title: 'Todo',
  }

  const mockTasks = [
    {
      id: 'task-1',
      title: 'Test Task 1',
      description: 'Description 1',
      priority: 'High' as const,
      status: 'todo' as const,
      dueDate: '',
      tags: ['bug'],
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task-2',
      title: 'Test Task 2',
      description: 'Description 2',
      priority: 'Medium' as const,
      status: 'todo' as const,
      dueDate: '',
      tags: [],
      createdAt: new Date().toISOString(),
    },
  ]

  const mockOnEditTask = vi.fn()
  const mockOnDeleteTask = vi.fn()

  // Test 11: Renders column with title and task count
  it('renders column title and task count', () => {
    render(
      <DndContext>
        <Column
          column={mockColumn}
          tasks={mockTasks}
          onEditTask={mockOnEditTask}
          onDeleteTask={mockOnDeleteTask}
        />
      </DndContext>
    )
    
    expect(screen.getByText('Todo')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  // Test 12: Shows empty state when no tasks
  it('displays empty state when column has no tasks', () => {
    render(
      <DndContext>
        <Column
          column={mockColumn}
          tasks={[]}
          onEditTask={mockOnEditTask}
          onDeleteTask={mockOnDeleteTask}
        />
      </DndContext>
    )
    
    expect(screen.getByText('Drop here')).toBeInTheDocument()
  })

  // Test 13: Renders all tasks in column
  it('renders all tasks in the column', () => {
    render(
      <DndContext>
        <Column
          column={mockColumn}
          tasks={mockTasks}
          onEditTask={mockOnEditTask}
          onDeleteTask={mockOnDeleteTask}
        />
      </DndContext>
    )
    
    expect(screen.getByText('Test Task 1')).toBeInTheDocument()
    expect(screen.getByText('Test Task 2')).toBeInTheDocument()
  })
})
