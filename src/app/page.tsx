import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import WorkflowSection from "./components/WorkflowSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <HeroSection />
      </div>
      <WorkflowSection />
    </div>
  );
}
