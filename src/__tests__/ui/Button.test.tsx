/**
 * Unit tests for Button component
 * 
 * Tests:
 * - Rendering variants (primary, secondary)
 * - Different sizes (medium, large)
 * - Click handlers
 * - Disabled state
 * - Full width mode
 * - Icon display
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { Button, PrimaryButton, SecondaryButton } from '../../components/ui/Button';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders button with children text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Click me');
    });

    it('renders as primary variant by default', () => {
      const { container } = render(<Button>Primary</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('primary');
    });

    it('renders as secondary variant when specified', () => {
      const { container } = render(<Button variant="secondary">Secondary</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('secondary');
    });

    it('renders with medium size by default', () => {
      const { container } = render(<Button>Medium</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('medium');
    });

    it('renders with large size when specified', () => {
      const { container } = render(<Button size="large">Large</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('large');
    });
  });

  describe('Interactions', () => {
    it('calls onClick handler when clicked', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick} disabled>Click me</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('has disabled attribute when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('Button Types', () => {
    it('renders as submit type when specified', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('renders as button type by default', () => {
      render(<Button>Default</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('renders as reset type when specified', () => {
      render(<Button type="reset">Reset</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'reset');
    });
  });

  describe('Styling', () => {
    it('applies fullWidth class when fullWidth prop is true', () => {
      const { container } = render(<Button fullWidth>Full Width</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('fullWidth');
    });

    it('applies custom className', () => {
      const { container } = render(<Button className="custom-class">Custom</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('custom-class');
    });
  });

  describe('Icon Support', () => {
    it('renders icon when provided', () => {
      const icon = <span data-testid="test-icon">→</span>;
      render(<Button icon={icon}>With Icon</Button>);
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders without icon when not provided', () => {
      const { container } = render(<Button>No Icon</Button>);
      const iconSpan = container.querySelector('.icon');
      expect(iconSpan).toBeNull();
    });
  });

  describe('Pre-configured Button Variants', () => {
    it('PrimaryButton renders as primary variant', () => {
      const { container } = render(<PrimaryButton>Primary</PrimaryButton>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('primary');
    });

    it('SecondaryButton renders as secondary variant', () => {
      const { container } = render(<SecondaryButton>Secondary</SecondaryButton>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('secondary');
    });

    it('PrimaryButton accepts all button props except variant', () => {
      const handleClick = vi.fn();
      render(
        <PrimaryButton 
          onClick={handleClick} 
          size="large" 
          disabled={false}
        >
          Test
        </PrimaryButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Test');
      expect(button?.className).toContain('large');
      
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('SecondaryButton accepts all button props except variant', () => {
      const handleClick = vi.fn();
      render(
        <SecondaryButton 
          onClick={handleClick} 
          size="large"
        >
          Test
        </SecondaryButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Test');
      expect(button?.className).toContain('large');
      
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('maintains button role', () => {
      render(<Button>Accessible</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('is focusable when not disabled', () => {
      render(<Button>Focusable</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveAttribute('disabled');
    });

    it('is not focusable when disabled', () => {
      render(<Button disabled>Not Focusable</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });
});
