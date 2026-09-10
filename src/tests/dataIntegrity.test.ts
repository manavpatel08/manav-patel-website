import { describe, it, expect } from 'vitest';
import {
  profile,
  education,
  servicesData,
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

  it('education details are accurate with PDEU CPI 9.37 / 10', () => {
    expect(education.institution).toContain('Pandit Deendayal Energy University');
    expect(education.cpi).toBe('CPI: 9.37 / 10');
    expect(education.degree).toContain('B.Tech in Computer Science and Engineering');
    expect(education.duration).toBe('June 2023 – May 2027');
    expect(education.location).toBe('Gandhinagar, Gujarat');
  });

  it('experienceData contains exclusively completed Software Engineering Intern role at AdaniConneX', () => {
    expect(experienceData.length).toBe(1);
    const adani = experienceData[0];
    expect(adani.company).toBe('AdaniConneX');
    expect(adani.role).toBe('Software Engineering Intern');
    expect(adani.date).toBe('June 2026 – July 2026');
    expect(adani.location).toBe('Mumbai, Maharashtra');
    expect(adani.bullets).toHaveLength(4);
    
    // Ensure no "Present", "Currently working", "Current intern", or "Cloud Intern"
    expect(adani.date).not.toContain('Present');
    expect(adani.role).not.toContain('Cloud Intern');
    expect(adani.role).not.toContain('Current');
  });

  it('servicesData defines 4 concise engineering services', () => {
    expect(servicesData).toHaveLength(4);
    const serviceTitles = servicesData.map((s) => s.title);
    expect(serviceTitles).toContain('Backend Systems');
    expect(serviceTitles).toContain('Real-Time Systems');
    expect(serviceTitles).toContain('AI-Powered Applications');
    expect(serviceTitles).toContain('Full-Stack Products');

    servicesData.forEach((s) => {
      expect(s.number).toMatch(/^0[1-4]$/);
      expect(s.scope.length).toBeGreaterThanOrEqual(3);
      expect(s.accent).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });

  it('projects list contains 4 production systems with no movies recommender', () => {
    expect(projects).toHaveLength(4);
    const names = projects.map((p) => p.name);
    expect(names).toEqual(['CodeSync', 'JobKart.ai', 'YT Summarizer', 'ProfileIQ']);
    expect(names).not.toContain('Movies Recommender');

    projects.forEach((p) => {
      expect(p.techStack.length).toBeGreaterThan(0);
      expect(p.description.length).toBeGreaterThan(20);
      expect(p.image).toMatch(/^\/mockups\//);
      expect(p.github).toMatch(/^https:\/\/github\.com/);
    });
  });

  it('skills object has all 6 required categorized matrices', () => {
    expect(skills.languages).toEqual(['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'SQL']);
    expect(skills.frontend).toEqual(['React.js', 'Next.js', 'HTML5', 'CSS3']);
    expect(skills.backend).toEqual(['Node.js', 'FastAPI', 'REST APIs', 'LLD', 'API Design']);
    expect(skills.databases).toEqual(['PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'Prisma ORM']);
    expect(skills.aiml).toEqual(['TensorFlow', 'Keras', 'Scikit-learn', 'NLP', 'Transformers', 'LSTM', 'RAG']);
    expect(skills.cloud).toEqual(['Git', 'GitHub', 'Linux', 'AWS', 'Docker', 'CI/CD', 'Ansible']);
  });

  it('navLinks strictly conforms to the 6-section order', () => {
    expect(navLinks).toEqual([
      'About',
      'Experience',
      'Projects',
      'Skills',
      'Services',
      'Contact',
    ]);
  });
});
