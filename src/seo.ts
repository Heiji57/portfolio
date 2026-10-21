import { about, contactLinks, faqs, profile, site, stack } from '@/data/profile';
import { projects } from '@/data/projects';

const personId = `${site.url}#person`;
const websiteId = `${site.url}#website`;

const profileUrls = contactLinks.map((link) => link.href).filter((href) => href.startsWith('https://'));
const email = contactLinks.find((link) => link.href.startsWith('mailto:'))?.href.slice('mailto:'.length);
const skills = stack.groups.flatMap((group) => group.items);

/** schema.org graph for the page: who the site is about, their work, and the FAQ shown in Contact. */
export function structuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: site.url,
        name: site.title,
        inLanguage: site.language,
        author: { '@id': personId },
      },
      {
        '@type': 'ProfilePage',
        url: site.url,
        name: site.title,
        description: site.description,
        inLanguage: site.language,
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: profile.name,
        alternateName: profile.nameKo,
        jobTitle: profile.title,
        description: about,
        url: site.url,
        email,
        sameAs: profileUrls,
        knowsAbout: skills,
      },
      {
        '@type': 'ItemList',
        name: 'Projects',
        itemListElement: projects.map((project, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'CreativeWork',
            name: project.title,
            genre: project.category,
            description: project.summary,
            dateCreated: project.year,
            keywords: project.stack,
            creator: { '@id': personId },
          },
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  };
}

/** Plain-markdown summary of the whole site for AI crawlers (https://llmstxt.org), including project case studies. */
export function llmsTxt() {
  const lines = [
    `# ${profile.nameKo} (${profile.name}) — ${profile.title}`,
    '',
    `> ${site.description}`,
    '',
    '## About',
    '',
    about,
    '',
    '## Stack',
    '',
    ...stack.groups.map(({ category, items }) => `- ${category}: ${items.join(', ')}`),
    '',
    '## Projects',
  ];

  for (const project of projects) {
    lines.push(
      '',
      `### ${project.title} (${project.category}, ${project.year})`,
      '',
      project.summary,
      '',
      `- Role: ${project.role}`,
      `- Period: ${project.period}`,
      `- Team: ${project.team}`,
      `- Stack: ${project.stack}`,
    );
    for (const section of project.sections) {
      lines.push('', `#### ${section.title}`, '');
      if (section.body) lines.push(section.body);
      if (section.body && section.items) lines.push('');
      if (section.items) lines.push(...section.items.map((item) => `- ${item}`));
    }
  }

  lines.push('', '## FAQ');
  for (const { question, answer } of faqs) lines.push('', `### ${question}`, '', answer);

  lines.push(
    '',
    '## Links',
    '',
    `- [Portfolio](${site.url})`,
    ...contactLinks
      .filter((link) => link.href.startsWith('https://'))
      .map((link) => `- [${link.label}](${link.href})`),
    ...(email ? [`- Email: ${email}`] : []),
    '',
  );
  return lines.join('\n');
}
