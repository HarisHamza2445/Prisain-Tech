import { Footer } from "@/components/Footer";
import { HiringPopup } from "@/components/HiringPopup";
import { Intro } from "@/components/Intro";
import { Nav } from "@/components/Nav";
import { ScrollFX } from "@/components/ScrollFX";
import { Stage3D } from "@/components/Stage3D";
import { SvgDefs } from "@/components/SvgDefs";
import { ToastProvider } from "@/components/Toast";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Cta } from "@/components/sections/Cta";
import { Hero } from "@/components/sections/Hero";
import { Mission } from "@/components/sections/Mission";
import { Packages } from "@/components/sections/Packages";
import { Process } from "@/components/sections/Process";
import { Protocol } from "@/components/sections/Protocol";
import { Services } from "@/components/sections/Services";
import { Statement } from "@/components/sections/Statement";
import { Work } from "@/components/sections/Work";

export default function Page() {
  return (
    <ToastProvider>
      <SvgDefs />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Intro />
      <div className="aura" aria-hidden="true" />
      <Stage3D />
      <Nav />
      <WhatsAppFab />
      <HiringPopup />
      <main id="main">
        <Hero />
        <Statement />
        <Services />
        <Packages />
        <Process />
        <Protocol />
        <Work />
        <About />
        <Mission />
        <Cta />
        <Contact />
      </main>
      <Footer />
      <ScrollFX />
    </ToastProvider>
  );
}
