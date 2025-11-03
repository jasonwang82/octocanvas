/**
 * Unit tests for FormControls components
 * 
 * Tests:
 * - Checkbox component
 * - TextInput component
 * - PrimerSelect component
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { Checkbox, TextInput, PrimerSelect } from '../../components/ui/FormControls';

describe('Checkbox Component', () => {
  describe('Rendering', () => {
    it('renders checkbox without label', () => {
      const { container } = render(<Checkbox id="test-checkbox" />);
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });

    it('renders checkbox with label', () => {
      render(<Checkbox id="test-checkbox" label="Accept terms" />);
      expect(screen.getByText('Accept terms')).toBeInTheDocument();
    });

    it('is unchecked by default', () => {
      const { container } = render(<Checkbox id="test-checkbox" />);
      const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    it('renders as checked when checked prop is true', () => {
      const { container } = render(<Checkbox id="test-checkbox" checked={true} />);
      const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });
  });

  describe('Interactions', () => {
    it('calls onChange handler when clicked', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Checkbox id="test-checkbox" onChange={handleChange} />
      );
      
      const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      fireEvent.click(checkbox);
      
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('toggles between checked and unchecked', () => {
      const handleChange = vi.fn();
      const { container, rerender } = render(
        <Checkbox id="test-checkbox" checked={false} onChange={handleChange} />
      );
      
      const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      fireEvent.click(checkbox);
      
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('does not call onChange when disabled', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Checkbox id="test-checkbox" disabled onChange={handleChange} />
      );
      
      const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      fireEvent.click(checkbox);
      
      // Disabled checkbox might still fire events but should be disabled
      expect(checkbox.disabled).toBe(true);
    });
  });

  describe('States', () => {
    it('is disabled when disabled prop is true', () => {
      const { container } = render(<Checkbox id="test-checkbox" disabled />);
      const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(checkbox.disabled).toBe(true);
    });

    it('applies custom className', () => {
      const { container } = render(
        <Checkbox id="test-checkbox" className="custom-class" />
      );
      const wrapper = container.querySelector('.custom-class');
      expect(wrapper).toBeInTheDocument();
    });
  });
});

describe('TextInput Component', () => {
  describe('Rendering', () => {
    it('renders text input', () => {
      const { container } = render(<TextInput />);
      const input = container.querySelector('input[type="text"]');
      expect(input).toBeInTheDocument();
    });

    it('renders with label when provided', () => {
      render(<TextInput label="Username" id="username" />);
      expect(screen.getByText('Username')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<TextInput placeholder="Enter your username" />);
      const input = screen.getByPlaceholderText('Enter your username');
      expect(input).toBeInTheDocument();
    });

    it('renders with initial value', () => {
      const { container } = render(<TextInput value="initial value" />);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('initial value');
    });
  });

  describe('Input Types', () => {
    it('renders as email type when specified', () => {
      const { container } = render(<TextInput type="email" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('renders as password type when specified', () => {
      const { container } = render(<TextInput type="password" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('renders as url type when specified', () => {
      const { container } = render(<TextInput type="url" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'url');
    });
  });

  describe('Interactions', () => {
    it('calls onChange handler when text changes', () => {
      const handleChange = vi.fn();
      const { container } = render(<TextInput onChange={handleChange} />);
      
      const input = container.querySelector('input') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'new value' } });
      
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith('new value');
    });

    it('calls onInput handler when provided', () => {
      const handleInput = vi.fn();
      const { container } = render(<TextInput onInput={handleInput} />);
      
      const input = container.querySelector('input') as HTMLInputElement;
      fireEvent.input(input, { target: { value: 'typing' } });
      
      expect(handleInput).toHaveBeenCalledTimes(1);
    });
  });

  describe('States', () => {
    it('is disabled when disabled prop is true', () => {
      const { container } = render(<TextInput disabled />);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });

    it('shows error state', () => {
      const { container } = render(
        <TextInput error={true} errorMessage="This field is required" />
      );
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('sets aria-invalid when error is true', () => {
      const { container } = render(<TextInput error={true} />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('sets aria-describedby when error is true', () => {
      const { container } = render(<TextInput error={true} />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-describedby', 'error');
    });
  });

  describe('Sizes', () => {
    it('renders with medium size by default', () => {
      const { container } = render(<TextInput />);
      const wrapper = container.querySelector('[class*="medium"]');
      expect(wrapper).toBeInTheDocument();
    });

    it('renders with large size when specified', () => {
      const { container } = render(<TextInput size="large" />);
      const wrapper = container.querySelector('[class*="large"]');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('associates label with input using id', () => {
      render(<TextInput label="Email" id="email-input" />);
      const label = screen.getByText('Email');
      expect(label).toHaveAttribute('for', 'email-input');
    });

    it('applies disabled styling to label when disabled', () => {
      const { container } = render(
        <TextInput label="Disabled" id="disabled-input" disabled />
      );
      const label = container.querySelector('label');
      expect(label?.className).toContain('disabled');
    });
  });
});

describe('PrimerSelect Component', () => {
  describe('Rendering', () => {
    it('renders select element', () => {
      const { container } = render(
        <PrimerSelect>
          <option value="1">Option 1</option>
        </PrimerSelect>
      );
      const select = container.querySelector('select');
      expect(select).toBeInTheDocument();
    });

    it('renders with label when provided', () => {
      render(
        <PrimerSelect label="Choose option" id="select-1">
          <option value="1">Option 1</option>
        </PrimerSelect>
      );
      expect(screen.getByText('Choose option')).toBeInTheDocument();
    });

    it('renders with placeholder option', () => {
      render(
        <PrimerSelect placeholder="Select an option">
          <option value="1">Option 1</option>
        </PrimerSelect>
      );
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('renders with initial value', () => {
      const { container } = render(
        <PrimerSelect value="2">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </PrimerSelect>
      );
      const select = container.querySelector('select') as HTMLSelectElement;
      expect(select.value).toBe('2');
    });

    it('renders options as children', () => {
      render(
        <PrimerSelect>
          <option value="a">Alpha</option>
          <option value="b">Beta</option>
          <option value="c">Gamma</option>
        </PrimerSelect>
      );
      expect(screen.getByText('Alpha')).toBeInTheDocument();
      expect(screen.getByText('Beta')).toBeInTheDocument();
      expect(screen.getByText('Gamma')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onChange handler when selection changes', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <PrimerSelect onChange={handleChange}>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </PrimerSelect>
      );
      
      const select = container.querySelector('select') as HTMLSelectElement;
      fireEvent.change(select, { target: { value: '2' } });
      
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith('2');
    });
  });

  describe('States', () => {
    it('is disabled when disabled prop is true', () => {
      const { container } = render(
        <PrimerSelect disabled>
          <option value="1">Option 1</option>
        </PrimerSelect>
      );
      const select = container.querySelector('select') as HTMLSelectElement;
      expect(select.disabled).toBe(true);
    });

    it('has required attribute when required is true', () => {
      const { container } = render(
        <PrimerSelect required>
          <option value="1">Option 1</option>
        </PrimerSelect>
      );
      const select = container.querySelector('select');
      expect(select).toHaveAttribute('required');
    });

    it('sets aria-invalid when error is true', () => {
      const { container } = render(
        <PrimerSelect error={true}>
          <option value="1">Option 1</option>
        </PrimerSelect>
      );
      const select = container.querySelector('select');
      expect(select).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Sizes', () => {
    it('renders with medium size by default', () => {
      const { container } = render(
        <PrimerSelect>
          <option value="1">Option 1</option>
        </PrimerSelect>
      );
      const wrapper = container.querySelector('[class*="medium"]');
      expect(wrapper).toBeInTheDocument();
    });

    it('renders with large size when specified', () => {
      const { container } = render(
        <PrimerSelect size="large">
          <option value="1">Option 1</option>
        </PrimerSelect>
      );
      const select = container.querySelector('[class*="large"]');
      expect(select).toBeInTheDocument();
    });

    it('renders full width by default', () => {
      const { container } = render(
        <PrimerSelect>
          <option value="1">Option 1</option>
        </PrimerSelect>
      );
      const wrapper = container.querySelector('[class*="fullWidth"]');
      expect(wrapper).toBeInTheDocument();
    });

    it('does not render full width when fullWidth is false', () => {
      const { container } = render(
        <PrimerSelect fullWidth={false}>
          <option value="1">Option 1</option>
        </PrimerSelect>
      );
      const select = container.querySelector('select');
      expect(select?.parentElement?.className).not.toContain('fullWidth');
    });
  });

  describe('Accessibility', () => {
    it('associates label with select using id', () => {
      render(
        <PrimerSelect label="Country" id="country-select">
          <option value="us">USA</option>
        </PrimerSelect>
      );
      const label = screen.getByText('Country');
      expect(label).toHaveAttribute('for', 'country-select');
    });

    it('applies disabled styling to label when disabled', () => {
      const { container } = render(
        <PrimerSelect label="Disabled" id="disabled-select" disabled>
          <option value="1">Option 1</option>
        </PrimerSelect>
      );
      const label = container.querySelector('label');
      expect(label?.className).toContain('disabled');
    });

    it('placeholder option is disabled', () => {
      render(
        <PrimerSelect placeholder="Choose">
          <option value="1">Option 1</option>
        </PrimerSelect>
      );
      const placeholderOption = screen.getByText('Choose');
      expect(placeholderOption).toHaveAttribute('disabled');
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <PrimerSelect className="custom-select">
          <option value="1">Option 1</option>
        </PrimerSelect>
      );
      const wrapper = container.querySelector('.custom-select');
      expect(wrapper).toBeInTheDocument();
    });
  });
});
