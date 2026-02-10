import { Sections } from "../features/sections/ui/Section";

const PublicPage: React.FC = () => {
  return (
    <main className="w-full min-h-screen bg-gray-50">
      {/* Sections container */}
      <Sections />
    </main>
  );
};

export default PublicPage;
