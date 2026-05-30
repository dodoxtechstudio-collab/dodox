import { createFileRoute } from "@tanstack/react-router";
import { Loader } from "@/components/site/Loader";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Projects } from "@/components/site/Projects";
import { WhyUs } from "@/components/site/WhyUs";
import { Process } from "@/components/site/Process";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { ParticleBackground } from "@/components/site/ParticleBackground";
import { CustomCursor } from "@/components/site/CustomCursor";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "DodoX Tech — Software & AI Automation Studio" },
      {
        name: "description",
        content:
          "DodoX Tech builds custom digital solutions, AI automation, ERPNext customization and admin dashboards. Build smarter. Grow faster.",
      },
      { property: "og:title", content: "DodoX Tech — Build Smarter. Grow Faster." },
      {
        property: "og:description",
        content:
          "Cinematic, premium software studio engineering AI automation, ERP systems and mobile apps for ambitious businesses.",
      },
    ],
  }),
});

function Index() {
  return (
    <>
      <CustomCursor />
      <ParticleBackground />
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <WhyUs />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
