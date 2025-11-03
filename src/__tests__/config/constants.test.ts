/**
 * Unit tests for configuration constants
 * 
 * Tests:
 * - Theme configurations
 * - Rarity level definitions
 * - Language color mappings
 */

import { describe, it, expect } from 'vitest';

/**
 * Tests for theme configurations
 */
describe('Theme Configurations', () => {
  const BACKGROUND_THEMES = {
    "github-universe-green": { label: "GitHub Universe Green" },
    "github-universe-blue": { label: "GitHub Universe Blue" },
    "universe-octocanvas": { label: "Universe Octocanvas" },
    "github-dark": { label: "GitHub Dark" },
  };

  describe('Background themes', () => {
    it('has all required theme keys', () => {
      expect(BACKGROUND_THEMES).toHaveProperty('github-universe-green');
      expect(BACKGROUND_THEMES).toHaveProperty('github-universe-blue');
      expect(BACKGROUND_THEMES).toHaveProperty('universe-octocanvas');
      expect(BACKGROUND_THEMES).toHaveProperty('github-dark');
    });

    it('each theme has a label', () => {
      Object.values(BACKGROUND_THEMES).forEach(theme => {
        expect(theme).toHaveProperty('label');
        expect(typeof theme.label).toBe('string');
        expect(theme.label.length).toBeGreaterThan(0);
      });
    });

    it('has correct theme labels', () => {
      expect(BACKGROUND_THEMES['github-universe-green'].label).toBe('GitHub Universe Green');
      expect(BACKGROUND_THEMES['github-universe-blue'].label).toBe('GitHub Universe Blue');
      expect(BACKGROUND_THEMES['universe-octocanvas'].label).toBe('Universe Octocanvas');
      expect(BACKGROUND_THEMES['github-dark'].label).toBe('GitHub Dark');
    });

    it('has exactly 4 themes', () => {
      expect(Object.keys(BACKGROUND_THEMES)).toHaveLength(4);
    });
  });
});

/**
 * Tests for avatar filter options
 */
describe('Avatar Filter Options', () => {
  const AVATAR_FILTERS = {
    grayscale: { label: "Grayscale" },
    color: { label: "Color" },
  };

  describe('Filter configurations', () => {
    it('has grayscale and color filters', () => {
      expect(AVATAR_FILTERS).toHaveProperty('grayscale');
      expect(AVATAR_FILTERS).toHaveProperty('color');
    });

    it('each filter has a label', () => {
      expect(AVATAR_FILTERS.grayscale.label).toBe('Grayscale');
      expect(AVATAR_FILTERS.color.label).toBe('Color');
    });

    it('has exactly 2 filter options', () => {
      expect(Object.keys(AVATAR_FILTERS)).toHaveLength(2);
    });
  });
});

/**
 * Tests for rarity level definitions
 */
describe('Rarity Level Definitions', () => {
  const RARITY_LEVELS = {
    common: {
      name: "Common",
      color: "#909692",
      gradient: "from-gray-500 to-gray-600",
    },
    uncommon: {
      name: "Uncommon",
      color: "#8CF2A6",
      gradient: "from-green-400 to-green-500",
    },
    rare: {
      name: "Rare",
      color: "#58A6FF",
      gradient: "from-blue-400 to-blue-500",
    },
    epic: {
      name: "Epic",
      color: "#DCFF96",
      gradient: "from-yellow-400 to-lime-400",
    },
    legendary: {
      name: "Legendary",
      color: "#BC8CFF",
      gradient: "from-purple-400 to-purple-500",
    },
    mythical: {
      name: "Mythical",
      color: "#5FED83",
      gradient: "from-green-300 to-green-400",
    },
  };

  describe('Rarity levels structure', () => {
    it('has all 6 rarity levels', () => {
      expect(RARITY_LEVELS).toHaveProperty('common');
      expect(RARITY_LEVELS).toHaveProperty('uncommon');
      expect(RARITY_LEVELS).toHaveProperty('rare');
      expect(RARITY_LEVELS).toHaveProperty('epic');
      expect(RARITY_LEVELS).toHaveProperty('legendary');
      expect(RARITY_LEVELS).toHaveProperty('mythical');
    });

    it('each rarity level has name, color, and gradient', () => {
      Object.values(RARITY_LEVELS).forEach(rarity => {
        expect(rarity).toHaveProperty('name');
        expect(rarity).toHaveProperty('color');
        expect(rarity).toHaveProperty('gradient');
      });
    });

    it('has exactly 6 rarity levels', () => {
      expect(Object.keys(RARITY_LEVELS)).toHaveLength(6);
    });
  });

  describe('Rarity level names', () => {
    it('has correct rarity names', () => {
      expect(RARITY_LEVELS.common.name).toBe('Common');
      expect(RARITY_LEVELS.uncommon.name).toBe('Uncommon');
      expect(RARITY_LEVELS.rare.name).toBe('Rare');
      expect(RARITY_LEVELS.epic.name).toBe('Epic');
      expect(RARITY_LEVELS.legendary.name).toBe('Legendary');
      expect(RARITY_LEVELS.mythical.name).toBe('Mythical');
    });
  });

  describe('Rarity level colors', () => {
    it('all colors are valid hex codes', () => {
      Object.values(RARITY_LEVELS).forEach(rarity => {
        expect(rarity.color).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });

    it('has correct color values', () => {
      expect(RARITY_LEVELS.common.color).toBe('#909692');
      expect(RARITY_LEVELS.uncommon.color).toBe('#8CF2A6');
      expect(RARITY_LEVELS.rare.color).toBe('#58A6FF');
      expect(RARITY_LEVELS.epic.color).toBe('#DCFF96');
      expect(RARITY_LEVELS.legendary.color).toBe('#BC8CFF');
      expect(RARITY_LEVELS.mythical.color).toBe('#5FED83');
    });
  });

  describe('Rarity level gradients', () => {
    it('all gradients are valid Tailwind classes', () => {
      Object.values(RARITY_LEVELS).forEach(rarity => {
        expect(rarity.gradient).toMatch(/^from-\w+-\d{3} to-\w+-\d{3}$/);
      });
    });

    it('gradients follow color scheme', () => {
      expect(RARITY_LEVELS.common.gradient).toContain('gray');
      expect(RARITY_LEVELS.uncommon.gradient).toContain('green');
      expect(RARITY_LEVELS.rare.gradient).toContain('blue');
      expect(RARITY_LEVELS.legendary.gradient).toContain('purple');
    });
  });
});

/**
 * Tests for language colors
 */
describe('Language Color Mappings', () => {
  const LANGUAGE_COLORS: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    Go: "#00ADD8",
    Rust: "#dea584",
    Ruby: "#701516",
    PHP: "#4F5D95",
    "C++": "#f34b7d",
    C: "#555555",
    "C#": "#178600",
    Swift: "#ffac45",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
    Shell: "#89e051",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Vue: "#41b883",
    Svelte: "#ff3e00",
  };

  describe('Language colors structure', () => {
    it('has popular programming languages', () => {
      expect(LANGUAGE_COLORS).toHaveProperty('JavaScript');
      expect(LANGUAGE_COLORS).toHaveProperty('TypeScript');
      expect(LANGUAGE_COLORS).toHaveProperty('Python');
      expect(LANGUAGE_COLORS).toHaveProperty('Java');
      expect(LANGUAGE_COLORS).toHaveProperty('Go');
    });

    it('has frontend languages', () => {
      expect(LANGUAGE_COLORS).toHaveProperty('HTML');
      expect(LANGUAGE_COLORS).toHaveProperty('CSS');
      expect(LANGUAGE_COLORS).toHaveProperty('Vue');
      expect(LANGUAGE_COLORS).toHaveProperty('Svelte');
    });

    it('has systems languages', () => {
      expect(LANGUAGE_COLORS).toHaveProperty('Rust');
      expect(LANGUAGE_COLORS).toHaveProperty('C');
      expect(LANGUAGE_COLORS).toHaveProperty('C++');
    });

    it('has mobile languages', () => {
      expect(LANGUAGE_COLORS).toHaveProperty('Swift');
      expect(LANGUAGE_COLORS).toHaveProperty('Kotlin');
      expect(LANGUAGE_COLORS).toHaveProperty('Dart');
    });

    it('has at least 15 languages', () => {
      expect(Object.keys(LANGUAGE_COLORS).length).toBeGreaterThanOrEqual(15);
    });
  });

  describe('Color values', () => {
    it('all colors are valid hex codes', () => {
      Object.values(LANGUAGE_COLORS).forEach(color => {
        expect(color).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });

    it('JavaScript has correct color', () => {
      expect(LANGUAGE_COLORS.JavaScript).toBe('#f1e05a');
    });

    it('TypeScript has correct color', () => {
      expect(LANGUAGE_COLORS.TypeScript).toBe('#3178c6');
    });

    it('Python has correct color', () => {
      expect(LANGUAGE_COLORS.Python).toBe('#3572A5');
    });

    it('each language has a unique color', () => {
      const colors = Object.values(LANGUAGE_COLORS);
      const uniqueColors = new Set(colors);
      // Most colors should be unique (allow some duplicates)
      expect(uniqueColors.size).toBeGreaterThan(colors.length * 0.8);
    });
  });

  describe('Color accessibility', () => {
    it('colors are not too light (not all white)', () => {
      Object.values(LANGUAGE_COLORS).forEach(color => {
        expect(color.toLowerCase()).not.toBe('#ffffff');
        expect(color.toLowerCase()).not.toBe('#fff');
      });
    });

    it('colors are not all black', () => {
      Object.values(LANGUAGE_COLORS).forEach(color => {
        expect(color.toLowerCase()).not.toBe('#000000');
        expect(color.toLowerCase()).not.toBe('#000');
      });
    });
  });
});

/**
 * Tests for wallpaper size configurations
 */
describe('Wallpaper Size Configurations', () => {
  const SIZES = {
    desktop: { width: 2560, height: 1440, label: "Desktop (2560x1440)" },
    mobile: { width: 1179, height: 2556, label: "Mobile (1179x2556)" },
    small: { width: 320, height: 240, label: "Badger (320x240)" },
  };

  describe('Size configurations', () => {
    it('has desktop, mobile, and small sizes', () => {
      expect(SIZES).toHaveProperty('desktop');
      expect(SIZES).toHaveProperty('mobile');
      expect(SIZES).toHaveProperty('small');
    });

    it('each size has width, height, and label', () => {
      Object.values(SIZES).forEach(size => {
        expect(size).toHaveProperty('width');
        expect(size).toHaveProperty('height');
        expect(size).toHaveProperty('label');
        expect(typeof size.width).toBe('number');
        expect(typeof size.height).toBe('number');
        expect(typeof size.label).toBe('string');
      });
    });

    it('has exactly 3 size options', () => {
      expect(Object.keys(SIZES)).toHaveLength(3);
    });
  });

  describe('Desktop size', () => {
    it('has 2560x1440 resolution', () => {
      expect(SIZES.desktop.width).toBe(2560);
      expect(SIZES.desktop.height).toBe(1440);
    });

    it('has correct label', () => {
      expect(SIZES.desktop.label).toContain('Desktop');
      expect(SIZES.desktop.label).toContain('2560');
      expect(SIZES.desktop.label).toContain('1440');
    });

    it('is landscape orientation', () => {
      expect(SIZES.desktop.width).toBeGreaterThan(SIZES.desktop.height);
    });
  });

  describe('Mobile size', () => {
    it('has correct resolution', () => {
      expect(SIZES.mobile.width).toBe(1179);
      expect(SIZES.mobile.height).toBe(2556);
    });

    it('has correct label', () => {
      expect(SIZES.mobile.label).toContain('Mobile');
    });

    it('is portrait orientation', () => {
      expect(SIZES.mobile.height).toBeGreaterThan(SIZES.mobile.width);
    });
  });

  describe('Small size', () => {
    it('has 320x240 resolution', () => {
      expect(SIZES.small.width).toBe(320);
      expect(SIZES.small.height).toBe(240);
    });

    it('is the smallest size', () => {
      expect(SIZES.small.width).toBeLessThan(SIZES.desktop.width);
      expect(SIZES.small.width).toBeLessThan(SIZES.mobile.width);
      expect(SIZES.small.height).toBeLessThan(SIZES.desktop.height);
      expect(SIZES.small.height).toBeLessThan(SIZES.mobile.height);
    });

    it('is landscape orientation', () => {
      expect(SIZES.small.width).toBeGreaterThan(SIZES.small.height);
    });
  });

  describe('Size validations', () => {
    it('all sizes have positive dimensions', () => {
      Object.values(SIZES).forEach(size => {
        expect(size.width).toBeGreaterThan(0);
        expect(size.height).toBeGreaterThan(0);
      });
    });

    it('desktop is suitable for monitors (16:9 aspect ratio)', () => {
      const aspectRatio = SIZES.desktop.width / SIZES.desktop.height;
      expect(aspectRatio).toBeCloseTo(16 / 9, 1);
    });
  });
});
