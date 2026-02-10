import type { SectionKey } from '../../sections/model/types';
import { useActiveSection } from '../../sections/model/useActiveSection';
import { useNavigation } from '../model/useNavigation';
import { NavigationView } from './NavigationView';
import { sectionIds } from '../../sections/config/sections.config';

const Navigation = () => {
  const { activeSection, setSection } = useActiveSection(sectionIds);
  const nav = useNavigation(activeSection);

  return (
    <NavigationView
      activeSection={activeSection}
      setActiveSection={setSection}
      {...nav}
    />
  );
};

export default Navigation;
