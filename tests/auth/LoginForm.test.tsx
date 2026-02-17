import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginForm } from '@/features/auth/components/LoginForm'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}))

// Mock toast provider
vi.mock('@/components/ui/toast-provider', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}))

// Mock auth store
const mockLogin = vi.fn()
vi.mock('@/store/useAuthStore', () => ({
  useAuthStore: () => ({
    login: mockLogin,
  }),
}))

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  // Test 1: Renders login form correctly
  it('renders login form with email and password inputs', () => {
    render(<LoginForm />)
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  // Test 2: Shows error for invalid credentials
  it('displays error message for invalid credentials', async () => {
    render(<LoginForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    
    fireEvent.change(emailInput, { target: { value: 'wrong@email.com' } })
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })
  })

  // Test 3: Trims whitespace from email and password inputs
  it('trims whitespace from email and password before validation', async () => {
    render(<LoginForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    
    // Enter valid credentials with extra spaces
    fireEvent.change(emailInput, { target: { value: '  intern@demo.com  ' } })
    fireEvent.change(passwordInput, { target: { value: '  intern123  ' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('intern@demo.com')
    })
  })

  // Test 4: Remember me checkbox toggles correctly
  it('toggles remember me checkbox', () => {
    render(<LoginForm />)
    
    const rememberMeCheckbox = screen.getByLabelText(/remember me/i)
    
    expect(rememberMeCheckbox).not.toBeChecked()
    
    fireEvent.click(rememberMeCheckbox)
    expect(rememberMeCheckbox).toBeChecked()
    
    fireEvent.click(rememberMeCheckbox)
    expect(rememberMeCheckbox).not.toBeChecked()
  })

  // Test 5: Shows loading state during submission
  it('displays loading state while submitting', async () => {
    render(<LoginForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    
    fireEvent.change(emailInput, { target: { value: 'intern@demo.com' } })
    fireEvent.change(passwordInput, { target: { value: 'intern123' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/signing in/i)).toBeInTheDocument()
  })
})
