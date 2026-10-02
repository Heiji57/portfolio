import { useCallback, useState } from 'react';
import { About } from '@/sections/About/About';
import { Contact } from '@/sections/Contact';
import { Hero } from '@/sections/Hero/Hero';
import { ProjectDetail } from '@/sections/Projects/ProjectDetail';
import { Projects } from '@/sections/Projects/Projects';
import { Stack } from '@/sections/Stack';

export function App() {
  const [openProject, setOpenProject] = useState<number | null>(null);
  const close = useCallback(() => setOpenProject(null), []);

  return (
    <main>
      <Hero />
      <Stack />
      <About />
      <Projects onOpen={setOpenProject} />
      <Contact />
      {openProject !== null && <ProjectDetail index={openProject} onOpen={setOpenProject} onClose={close} />}
    </main>
  );
}
