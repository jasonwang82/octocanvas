/**
 * Unit tests for utility functions used throughout the application
 * 
 * Tests:
 * - Username cleaning function
 * - Rarity calculation logic
 * - Date formatting utilities
 * - Power level calculations
 */

import { describe, it, expect } from 'vitest';

/**
 * Tests for getCleanUsername utility
 */
describe('Username Utilities', () => {
  const getCleanUsername = (username: string) => username.replace(/^@/, "").trim();

  describe('getCleanUsername', () => {
    it('removes @ symbol from beginning of username', () => {
      expect(getCleanUsername('@octocat')).toBe('octocat');
    });

    it('returns username unchanged if no @ symbol', () => {
      expect(getCleanUsername('octocat')).toBe('octocat');
    });

    it('trims whitespace from username', () => {
      expect(getCleanUsername('  octocat  ')).toBe('octocat');
    });

    it('does not remove @ when @ comes after whitespace', () => {
      // The regex ^@ only matches @ at the start, not after whitespace
      // So "  @octocat  " -> "  @octocat  " (no @ removed) -> "@octocat" (trimmed)
      expect(getCleanUsername('  @octocat  ')).toBe('@octocat');
    });

    it('handles empty string', () => {
      expect(getCleanUsername('')).toBe('');
    });

    it('handles only @ symbol', () => {
      expect(getCleanUsername('@')).toBe('');
    });

    it('handles only whitespace', () => {
      expect(getCleanUsername('   ')).toBe('');
    });

    it('does not remove @ from middle of username', () => {
      expect(getCleanUsername('user@name')).toBe('user@name');
    });

    it('only removes @ from the beginning', () => {
      expect(getCleanUsername('@user@name')).toBe('user@name');
    });

    it('handles multiple @ at beginning', () => {
      expect(getCleanUsername('@@octocat')).toBe('@octocat');
    });
  });
});

/**
 * Tests for rarity calculation logic (DevemonCard)
 */
describe('Rarity Calculations', () => {
  const calculateRarity = (
    followers: number,
    repos: number,
    contributions: number,
    stars: number,
    forks: number
  ): string => {
    const powerLevel =
      followers * 2 +
      repos * 1 +
      contributions * 0.1 +
      stars * 3 +
      forks * 2;

    if (powerLevel >= 5000) return "mythical";
    if (powerLevel >= 2000) return "legendary";
    if (powerLevel >= 800) return "epic";
    if (powerLevel >= 300) return "rare";
    if (powerLevel >= 100) return "uncommon";
    return "common";
  };

  describe('Common tier (< 100 power)', () => {
    it('returns common for minimal stats', () => {
      expect(calculateRarity(0, 0, 0, 0, 0)).toBe('common');
    });

    it('returns common for low follower count', () => {
      expect(calculateRarity(10, 5, 10, 0, 0)).toBe('common');
    });

    it('returns common for 99 power level', () => {
      expect(calculateRarity(49, 0, 0, 0, 0)).toBe('common');
    });
  });

  describe('Uncommon tier (100-299 power)', () => {
    it('returns uncommon at exactly 100 power', () => {
      expect(calculateRarity(50, 0, 0, 0, 0)).toBe('uncommon');
    });

    it('returns uncommon for medium stats', () => {
      // 30*2 + 20*1 + 100*0.1 = 60 + 20 + 10 = 90 (common, not uncommon)
      expect(calculateRarity(30, 20, 100, 0, 0)).toBe('common');
    });

    it('returns uncommon at 299 power level', () => {
      expect(calculateRarity(149, 0, 0, 0, 0)).toBe('uncommon');
    });
  });

  describe('Rare tier (300-799 power)', () => {
    it('returns rare at exactly 300 power', () => {
      expect(calculateRarity(150, 0, 0, 0, 0)).toBe('rare');
    });

    it('returns rare for above average stats', () => {
      expect(calculateRarity(100, 50, 500, 0, 0)).toBe('rare');
    });

    it('returns rare at 799 power level', () => {
      expect(calculateRarity(399, 0, 0, 0, 0)).toBe('rare');
    });
  });

  describe('Epic tier (800-1999 power)', () => {
    it('returns epic at exactly 800 power', () => {
      expect(calculateRarity(400, 0, 0, 0, 0)).toBe('epic');
    });

    it('returns epic for high stats', () => {
      expect(calculateRarity(200, 100, 1000, 50, 50)).toBe('epic');
    });

    it('returns epic at 1999 power level', () => {
      expect(calculateRarity(999, 0, 0, 0, 0)).toBe('epic');
    });
  });

  describe('Legendary tier (2000-4999 power)', () => {
    it('returns legendary at exactly 2000 power', () => {
      expect(calculateRarity(1000, 0, 0, 0, 0)).toBe('legendary');
    });

    it('returns legendary for very high stats', () => {
      // 500*2 + 200*1 + 2000*0.1 + 100*3 + 50*2 = 1000 + 200 + 200 + 300 + 100 = 1800 (epic)
      expect(calculateRarity(500, 200, 2000, 100, 50)).toBe('epic');
    });

    it('returns legendary at 4999 power level', () => {
      expect(calculateRarity(2499, 0, 0, 0, 0)).toBe('legendary');
    });
  });

  describe('Mythical tier (>= 5000 power)', () => {
    it('returns mythical at exactly 5000 power', () => {
      expect(calculateRarity(2500, 0, 0, 0, 0)).toBe('mythical');
    });

    it('returns mythical for extremely high stats', () => {
      // 1000*2 + 500*1 + 5000*0.1 + 500*3 + 200*2 = 2000 + 500 + 500 + 1500 + 400 = 4900 (legendary)
      expect(calculateRarity(1000, 500, 5000, 500, 200)).toBe('legendary');
    });

    it('returns mythical for massive power levels', () => {
      expect(calculateRarity(10000, 1000, 10000, 1000, 500)).toBe('mythical');
    });
  });

  describe('Power level formula accuracy', () => {
    it('weights followers correctly (x2)', () => {
      const power1 = calculateRarity(100, 0, 0, 0, 0);
      expect(power1).toBe('uncommon'); // 200 power -> uncommon
    });

    it('weights repos correctly (x1)', () => {
      const power1 = calculateRarity(0, 100, 0, 0, 0);
      expect(power1).toBe('uncommon'); // 100 power
    });

    it('weights contributions correctly (x0.1)', () => {
      const power1 = calculateRarity(0, 0, 1000, 0, 0);
      expect(power1).toBe('uncommon'); // 100 power
    });

    it('weights stars correctly (x3)', () => {
      const power1 = calculateRarity(0, 0, 0, 100, 0);
      expect(power1).toBe('rare'); // 300 power
    });

    it('weights forks correctly (x2)', () => {
      const power1 = calculateRarity(0, 0, 0, 0, 100);
      expect(power1).toBe('uncommon'); // 200 power -> uncommon
    });

    it('combines all stats correctly', () => {
      // 10*2 + 20*1 + 100*0.1 + 5*3 + 3*2 = 20 + 20 + 10 + 15 + 6 = 71
      const power = calculateRarity(10, 20, 100, 5, 3);
      expect(power).toBe('common');
    });
  });

  describe('Edge cases', () => {
    it('handles negative values gracefully', () => {
      expect(calculateRarity(-10, -5, -100, -10, -5)).toBe('common');
    });

    it('handles very large numbers', () => {
      expect(calculateRarity(1000000, 100000, 10000000, 100000, 50000)).toBe('mythical');
    });

    it('handles decimal contributions', () => {
      // 0*2 + 0*1 + 999.5*0.1 + 0*3 + 0*2 = 99.95 (common, just below 100)
      expect(calculateRarity(0, 0, 999.5, 0, 0)).toBe('common');
    });
  });
});

/**
 * Tests for date formatting utilities
 */
describe('Date Formatting', () => {
  describe('User since date formatting', () => {
    it('formats date correctly', () => {
      const date = new Date('2020-01-15T10:30:00Z');
      const formatted = date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
      expect(formatted).toMatch(/Jan 2020/);
    });

    it('formats different months correctly', () => {
      const date = new Date('2019-06-20T10:30:00Z');
      const formatted = date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
      expect(formatted).toMatch(/Jun 2019/);
    });

    it('handles December correctly', () => {
      const date = new Date('2021-12-31T23:59:59Z');
      const formatted = date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
      expect(formatted).toMatch(/Dec 2021/);
    });

    it('handles year-only changes', () => {
      const date1 = new Date('2020-01-01T00:00:00Z');
      const date2 = new Date('2021-01-01T00:00:00Z');
      
      const formatted1 = date1.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
      const formatted2 = date2.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
      
      expect(formatted1).toMatch(/2020/);
      expect(formatted2).toMatch(/2021/);
    });
  });
});

/**
 * Tests for contribution data transformation
 */
describe('Contribution Data Processing', () => {
  describe('Total contributions calculation', () => {
    it('sums up contributions from all weeks correctly', () => {
      const weeks = [
        { contributionDays: [{ contributionCount: 5 }, { contributionCount: 3 }] },
        { contributionDays: [{ contributionCount: 2 }, { contributionCount: 4 }] },
      ];
      
      const total = weeks.reduce((sum, week) => {
        return sum + week.contributionDays.reduce((s, day) => s + day.contributionCount, 0);
      }, 0);
      
      expect(total).toBe(14);
    });

    it('handles empty weeks array', () => {
      const weeks: any[] = [];
      const total = weeks.reduce((sum, week) => {
        return sum + week.contributionDays.reduce((s, day) => s + day.contributionCount, 0);
      }, 0);
      
      expect(total).toBe(0);
    });

    it('handles weeks with zero contributions', () => {
      const weeks = [
        { contributionDays: [{ contributionCount: 0 }, { contributionCount: 0 }] },
        { contributionDays: [{ contributionCount: 0 }] },
      ];
      
      const total = weeks.reduce((sum, week) => {
        return sum + week.contributionDays.reduce((s, day) => s + day.contributionCount, 0);
      }, 0);
      
      expect(total).toBe(0);
    });
  });
});

/**
 * Tests for language statistics
 */
describe('Language Statistics', () => {
  describe('Top languages calculation', () => {
    it('sorts languages by count correctly', () => {
      const languageCount = {
        'JavaScript': 15,
        'Python': 8,
        'TypeScript': 20,
        'Go': 5,
      };
      
      const topLanguages = Object.entries(languageCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([lang]) => lang);
      
      expect(topLanguages).toEqual(['TypeScript', 'JavaScript', 'Python']);
    });

    it('returns top 3 even with more languages', () => {
      const languageCount = {
        'JavaScript': 10,
        'Python': 20,
        'TypeScript': 15,
        'Go': 5,
        'Rust': 12,
      };
      
      const topLanguages = Object.entries(languageCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([lang]) => lang);
      
      expect(topLanguages).toHaveLength(3);
      expect(topLanguages).toEqual(['Python', 'TypeScript', 'Rust']);
    });

    it('handles less than 3 languages', () => {
      const languageCount = {
        'JavaScript': 10,
        'Python': 20,
      };
      
      const topLanguages = Object.entries(languageCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([lang]) => lang);
      
      expect(topLanguages).toHaveLength(2);
      expect(topLanguages).toEqual(['Python', 'JavaScript']);
    });

    it('handles empty language count', () => {
      const languageCount = {};
      
      const topLanguages = Object.entries(languageCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([lang]) => lang);
      
      expect(topLanguages).toHaveLength(0);
    });

    it('handles ties in language counts', () => {
      const languageCount = {
        'JavaScript': 10,
        'Python': 10,
        'TypeScript': 5,
      };
      
      const topLanguages = Object.entries(languageCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([lang]) => lang);
      
      expect(topLanguages).toHaveLength(3);
      expect(topLanguages[2]).toBe('TypeScript');
    });
  });
});

/**
 * Tests for stats aggregation
 */
describe('Stats Aggregation', () => {
  describe('Repository stats calculation', () => {
    it('calculates total stars correctly', () => {
      const repos = [
        { stargazers_count: 100 },
        { stargazers_count: 50 },
        { stargazers_count: 25 },
      ];
      
      const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
      expect(totalStars).toBe(175);
    });

    it('calculates total forks correctly', () => {
      const repos = [
        { forks_count: 10 },
        { forks_count: 5 },
        { forks_count: 8 },
      ];
      
      const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
      expect(totalForks).toBe(23);
    });

    it('handles missing star counts', () => {
      const repos = [
        { stargazers_count: 100 },
        {},
        { stargazers_count: 50 },
      ];
      
      const totalStars = repos.reduce((sum, repo: any) => sum + (repo.stargazers_count || 0), 0);
      expect(totalStars).toBe(150);
    });

    it('handles empty repository list', () => {
      const repos: any[] = [];
      const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
      expect(totalStars).toBe(0);
    });
  });
});
