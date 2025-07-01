"use client";
import Navbar from "../components/layout/Navbar";
import Faq from "../components/ui/landing-page/Faq";
import Digital from "../components/ui/landing-page/new/Digital";
import Footer from "../components/ui/landing-page/new/Footer";
import Hero from "../components/ui/landing-page/new/Hero";
import Howitwork from "../components/ui/landing-page/new/Howitwork";
import Testimoni from "../components/ui/landing-page/new/Testimoni";
import Pricing from "../components/ui/landing-page/Pricing";
import TrustIndicator from "../components/ui/landing-page/TrustIndicator";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-800 font-sans">
      {/* Navigation */}
      <Navbar showMenu={true} />

      {/* Hero Secttion  */}
      <Hero />

      {/* Digital Life  */}
      <Digital />

      {/* How it Work */}
      <Howitwork />

      {/* Pricing */}
      <Pricing />

      {/* Testimonial */}
      <Testimoni />

      {/* FAQ */}
      <Faq />

      {/* Trust Indicator */}
      <TrustIndicator />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
