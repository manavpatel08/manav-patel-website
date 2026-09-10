import { describe, it, expect } from 'vitest';
import {
  profile,
  education,
  servicesData,
  scopeData,
  experienceData,
  projects,
  skills,
  navLinks,
} from '../data/resumeData';

describe('Data Integrity & Architecture Contracts', () => {
  it('profile has valid contact and social links', () => {
    expect(profile.name).toBe('Manav Patel');
    expect(profile.email).toBe('patelmanav0805@gmail.com');
    expect(profile.linkedin).toContain('linkedin.com');
    expect(profile.resumeUrl).toMatch(/^https:\/\/drive\.google\.com/);
    expect(profile.github).toContain('github.com');
    expect(profile.codeforces).toContain('codeforces.com');
    expect(profile.leetcode).toContain('leetcode.com');
  });

  it('education details are accurate with PDEU CPI 9.37', () => {
    expect(education.institution).toContain('Pandit Deendayal Energy University');
    expect(education.cpi).toBe('9.37 CPI');
    expect(education.degree).toContain('Computer Science');
  });

  it('experienceData contains exclusively professional experience (AdaniConneX)', () => {
    expect(experienceData.length).toBeGreaterThan(0);
    const adani = experienceData.find((e) => e.role.includes('AdaniConneX'));
    expect(adani).toBeDefined();
    expect(adani?.role).toBe('AdaniConneX — Cloud Intern');
    // Ensure PDEU is NOT in experience
    const pdeuInExp = experienceData.find((e) => e.role.includes('PDEU'));
    expect(pdeuInExp).toBeUndefined();
  });

  it('servicesData defines 5 core engineering services', () => {
    expect(servicesData).toHaveLength(5);
    const serviceTitles = servicesData.map((s) => s.title);
    expect(serviceTitles).toContain('Backend Systems');
    expect(serviceTitles).toContain('Full-Stack Applications');
    expect(serviceTitles).toContain('Real-Time Systems');
    expect(serviceTitles).toContain('AI / Intelligent Applications');
    expect(serviceTitles).toContain('Infrastructure Automation');

    servicesData.forEach((s) => {
      expect(s.number).toMatch(/^0[1-5]$/);
      expect(s.scope.length).toBeGreaterThanOrEqual(3);
      expect(s.accent).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });

  it('projects list contains 4 production systems', () => {
    expect(projects).toHaveLength(4);
    const names = projects.map((p) => p.name);
    expect(names).toEqual(['CodeSync', 'JobKart.ai', 'YT Summarizer', 'ProfileIQ']);

    projects.forEach((p) => {
      expect(p.techStack.length).toBeGreaterThan(0);
      expect(p.description.length).toBeGreaterThan(20);
      expect(p.image).toMatch(/^\/mockups\//);
      expect(p.github).toMatch(/^https:\/\/github\.com/);
    });
  });

  it('skills object has all required categorized matrices', () => {
    expect(skills.languages.length).toBeGreaterThan(0);
    expect(skills.frontend.length).toBeGreaterThan(0);
    expect(skills.backend.length).toBeGreaterThan(0);
    expect(skills.databases.length).toBeGreaterThan(0);
    expect(skills.aiml.length).toBeGreaterThan(0);
    expect(skills.cloud.length).toBeGreaterThan(0);
    expect(skills.tools.length).toBeGreaterThan(0);
  });

  it('scopeData defines 3 models and 4 SLA standards', () => {
    expect(scopeData.models).toHaveLength(3);
    expect(scopeData.standards).toHaveLength(4);
    scopeData.models.forEach((m) => {
      expect(m.title).toBeDefined();
      expect(m.deliverables.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('navLinks strictly conforms to the 7-section order', () => {
    expect(navLinks).toEqual([
      'About',
      'Experience',
      'Projects',
      'Skills',
      'Services',
      'Scope',
      'Contact',
    ]);
  });
});
