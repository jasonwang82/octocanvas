/**
 * Unit tests for Icon component
 * 
 * Tests:
 * - Icon rendering
 * - Different icon types
 * - Size variations
 * - Color customization
 * - Accessibility
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { Icon } from '../../components/ui/Icon';

describe('Icon Component', () => {
  describe('Rendering', () => {
    it('renders an SVG element', () => {
      const { container } = render(<Icon name="x" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders x icon correctly', () => {
      const { container } = render(<Icon name="x" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 16 16');
    });

    it('renders download icon correctly', () => {
      const { container } = render(<Icon name="download" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 16 16');
    });

    it('renders arrow-right icon correctly', () => {
      const { container } = render(<Icon name="arrow-right" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 16 16');
    });
  });

  describe('Sizes', () => {
    it('renders functional size (16px) by default', () => {
      const { container } = render(<Icon name="x" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveStyle({ width: '16px', height: '16px' });
    });

    it('renders branded size (30px) when specified', () => {
      const { container } = render(<Icon name="x" size="branded" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveStyle({ width: '30px', height: '30px' });
    });

    it('renders custom numeric size when provided', () => {
      const { container } = render(<Icon name="x" size={24} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveStyle({ width: '24px', height: '24px' });
    });

    it('renders with size 12 when specified', () => {
      const { container } = render(<Icon name="download" size={12} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveStyle({ width: '12px', height: '12px' });
    });

    it('renders with size 48 when specified', () => {
      const { container } = render(<Icon name="download" size={48} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveStyle({ width: '48px', height: '48px' });
    });
  });

  describe('Colors', () => {
    it('uses currentColor by default', () => {
      const { container } = render(<Icon name="x" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('fill', 'currentColor');
    });

    it('applies custom color when provided', () => {
      const { container } = render(<Icon name="x" color="#ff0000" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('fill', '#ff0000');
    });

    it('applies hex color correctly', () => {
      const { container } = render(<Icon name="download" color="#00ff00" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('fill', '#00ff00');
    });

    it('applies named color correctly', () => {
      const { container } = render(<Icon name="download" color="blue" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('fill', 'blue');
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      const { container } = render(<Icon name="x" className="custom-icon" />);
      const svg = container.querySelector('svg');
      expect(svg?.className).toContain('custom-icon');
    });

    it('includes default inline-block class', () => {
      const { container } = render(<Icon name="x" />);
      const svg = container.querySelector('svg');
      expect(svg?.className).toContain('inline-block');
    });

    it('includes flex-shrink-0 class', () => {
      const { container } = render(<Icon name="x" />);
      const svg = container.querySelector('svg');
      expect(svg?.className).toContain('flex-shrink-0');
    });

    it('combines custom className with default classes', () => {
      const { container } = render(<Icon name="x" className="my-class another-class" />);
      const svg = container.querySelector('svg');
      expect(svg?.className).toContain('inline-block');
      expect(svg?.className).toContain('flex-shrink-0');
      expect(svg?.className).toContain('my-class');
      expect(svg?.className).toContain('another-class');
    });
  });

  describe('Accessibility', () => {
    it('sets aria-label when label prop is provided', () => {
      const { container } = render(<Icon name="x" label="Close" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-label', 'Close');
    });

    it('sets role to img when label is provided', () => {
      const { container } = render(<Icon name="download" label="Download file" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('role', 'img');
    });

    it('does not set role when label is not provided', () => {
      const { container } = render(<Icon name="x" />);
      const svg = container.querySelector('svg');
      expect(svg).not.toHaveAttribute('role');
    });

    it('provides meaningful label for download icon', () => {
      const { container } = render(<Icon name="download" label="Download" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-label', 'Download');
    });

    it('provides meaningful label for close icon', () => {
      const { container } = render(<Icon name="x" label="Close modal" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-label', 'Close modal');
    });
  });

  describe('SVG Attributes', () => {
    it('sets correct xmlns attribute', () => {
      const { container } = render(<Icon name="x" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    });

    it('maintains viewBox for proper scaling', () => {
      const { container } = render(<Icon name="download" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox');
    });
  });

  describe('Icon Variations', () => {
    it('renders different icons with different SVG paths', () => {
      const { container: xContainer } = render(<Icon name="x" />);
      const { container: downloadContainer } = render(<Icon name="download" />);
      
      const xSvg = xContainer.querySelector('svg');
      const downloadSvg = downloadContainer.querySelector('svg');
      
      expect(xSvg?.innerHTML).not.toBe(downloadSvg?.innerHTML);
    });

    it('x icon has correct path element', () => {
      const { container } = render(<Icon name="x" />);
      const path = container.querySelector('path');
      expect(path).toBeInTheDocument();
    });

    it('download icon has correct path elements', () => {
      const { container } = render(<Icon name="download" />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });
  });

  describe('Multiple Icons', () => {
    it('renders multiple icons independently', () => {
      const { container } = render(
        <div>
          <Icon name="x" />
          <Icon name="download" />
          <Icon name="arrow-right" />
        </div>
      );
      
      const svgs = container.querySelectorAll('svg');
      expect(svgs).toHaveLength(3);
    });

    it('applies different sizes to multiple icons', () => {
      const { container } = render(
        <div>
          <Icon name="x" size={16} />
          <Icon name="download" size={24} />
          <Icon name="arrow-right" size={32} />
        </div>
      );
      
      const svgs = container.querySelectorAll('svg');
      expect(svgs[0]).toHaveStyle({ width: '16px' });
      expect(svgs[1]).toHaveStyle({ width: '24px' });
      expect(svgs[2]).toHaveStyle({ width: '32px' });
    });

    it('applies different colors to multiple icons', () => {
      const { container } = render(
        <div>
          <Icon name="x" color="red" />
          <Icon name="download" color="blue" />
          <Icon name="arrow-right" color="green" />
        </div>
      );
      
      const svgs = container.querySelectorAll('svg');
      expect(svgs[0]).toHaveAttribute('fill', 'red');
      expect(svgs[1]).toHaveAttribute('fill', 'blue');
      expect(svgs[2]).toHaveAttribute('fill', 'green');
    });
  });
});
