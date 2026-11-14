// Tests for the shared project list. Home, About, Projects, the Guinea Pig page and
// the nav menu all render from app/lib/projects.ts, so a broken entry here breaks
// every one of them at once.
import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  guineaPigProjects,
  projects,
  projectsList,
  showcaseProjects,
  topLevelProjects,
} from './projects';

// app/ directory, resolved from this file (app/lib/projects.test.ts).
const appDir = path.resolve(__dirname, '..');

describe('project list', () => {
  it('gives every project a unique id', () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives every project a unique name', () => {
    const names = projects.map((p) => p.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('links every project to an internal route that exists on disk', () => {
    for (const project of projects) {
      expect(project.href, project.id).toMatch(/^\/[A-Za-z0-9/_-]*$/);
      const pageFile = path.join(appDir, project.href, 'page.tsx');
      expect(existsSync(pageFile), `${project.id} -> ${pageFile}`).toBe(true);
    }
  });

  it('gives every project outside a group a status', () => {
    const missing = projects.filter((p) => !p.group && p.status === undefined);
    expect(missing.map((p) => p.id)).toEqual([]);
  });

  it('splits the list into top-level and Guinea Pig projects with no overlap or gap', () => {
    const topIds = topLevelProjects.map((p) => p.id);
    const guineaPigIds = guineaPigProjects.map((p) => p.id);
    expect(topIds.filter((id) => guineaPigIds.includes(id))).toEqual([]);
    expect([...topIds, ...guineaPigIds].sort()).toEqual(projects.map((p) => p.id).sort());
  });

  it('leaves the Guinea Pig container and status-less entries out of the showcase', () => {
    const showcaseIds = showcaseProjects.map((p) => p.id);
    expect(showcaseIds).not.toContain('guineaPigProjects');
    expect(showcaseProjects.every((p) => p.status !== undefined)).toBe(true);
    for (const unstatused of projects.filter((p) => p.status === undefined)) {
      expect(showcaseIds).not.toContain(unstatused.id);
    }
  });

  it('does not list retired projects', () => {
    const retired = [
      'Pawn Evolution',
      'AI Slop Game',
      'Culinary Connection',
      'Kafka Visualizer',
      'Course AI Project Framework',
    ];
    const names = projects.map((p) => p.name);
    for (const name of retired) {
      expect(names).not.toContain(name);
    }
    const hrefs = projects.map((p) => p.href);
    expect(hrefs).not.toContain('/projects/guineaPigProjects/kafkaFrontEnd');
    expect(hrefs).not.toContain('/projects/courseAiFramework');
    expect(hrefs.filter((href) => href.includes('pawnevolution.com'))).toEqual([]);
  });
});

describe('nav projects menu', () => {
  it('starts with Projects Home and then mirrors the top-level projects in order', () => {
    expect(projectsList[0]).toEqual({ title: 'Projects Home', href: '/projects', status: 'Live' });
    expect(projectsList.slice(1)).toEqual(
      topLevelProjects.map((p) => ({ title: p.name, href: p.href, status: p.status })),
    );
  });
});
