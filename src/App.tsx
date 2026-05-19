/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import {
  Lock,
  Grid,
  Shield,
  Image as ImageIcon,
  Heart,
  MessageCircle,
  Send,
} from "lucide-react";
import { Terms, Privacy, Manifesto, Source } from "./pages";
import { db, handleFirestoreError, OperationType } from "./lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function App() {
  const [heroEmail, setHeroEmail] = useState("");
  const [footerEmail, setFooterEmail] = useState("");
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [footerSubmitted, setFooterSubmitted] = useState(false);
  const [page, setPage] = useState<string>("home");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const footerRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const securityRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const submitToWaitlist = async (email: string) => {
    try {
      setIsSubmitting(true);
      await addDoc(collection(db, "waitlist"), {
        email: email,
        createdAt: serverTimestamp(),
      });
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, "waitlist");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (heroEmail && !isSubmitting) {
      const success = await submitToWaitlist(heroEmail);
      if (success) {
        setHeroSubmitted(true);
        setHeroEmail("");
      }
    }
  };

  const handleFooterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (footerEmail && !isSubmitting) {
      const success = await submitToWaitlist(footerEmail);
      if (success) {
        setFooterSubmitted(true);
        setFooterEmail("");
      }
    }
  };

  const handleLinkClick = (e: React.MouseEvent, pageName: string) => {
    e.preventDefault();
    setPage(pageName);
    window.scrollTo({ top: 0 });
  };

  const navigateToSection = (ref: React.RefObject<HTMLElement | null>) => {
    if (page !== "home") {
      setPage("home");
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      scrollToSection(ref);
    }
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface min-h-screen antialiased selection:bg-primary selection:text-on-primary">
      {/* TopNavBar */}
      <nav className="bg-surface dark:bg-primary-container text-primary dark:text-on-primary sticky top-0 w-full z-50 border-b border-outline-variant dark:border-outline transition-colors duration-200">
        <div className="flex justify-between items-center w-full max-w-[1440px] mx-auto px-6 md:px-12 py-gutter">
          <div
            className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg tracking-tighter text-primary dark:text-surface-container-lowest cursor-pointer"
            onClick={() => setPage("home")}
          >
            Frames
          </div>
          <div className="hidden md:flex gap-14 items-center">
            <button
              onClick={() => navigateToSection(featuresRef)}
              className="font-label-caps text-sm uppercase tracking-widest text-secondary dark:text-on-secondary-container hover:text-primary dark:hover:text-on-primary transition-colors duration-200"
            >
              Features
            </button>
            <button
              onClick={() => navigateToSection(securityRef)}
              className="font-label-caps text-sm uppercase tracking-widest text-secondary dark:text-on-secondary-container hover:text-primary dark:hover:text-on-primary transition-colors duration-200"
            >
              Security
            </button>
            <button
              onClick={() => navigateToSection(galleryRef)}
              className="font-label-caps text-sm uppercase tracking-widest text-secondary dark:text-on-secondary-container hover:text-primary dark:hover:text-on-primary transition-colors duration-200"
            >
              Gallery
            </button>
          </div>
          <button
            onClick={() => navigateToSection(footerRef)}
            className="bg-primary text-on-primary font-label-caps text-sm uppercase tracking-widest px-6 py-3 hover:bg-surface-tint transition-colors rounded-none scale-100 active:scale-95 transition-transform"
          >
            Join Waitlist
          </button>
        </div>
      </nav>

      {/* Page Content */}
      {page === "home" ? (
        <>
          {/* Hero Section */}
          <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop pt-32 pb-24 border-b border-surface-variant flex flex-col lg:flex-row items-center gap-16">
            <div className="max-w-xl flex-1 w-full text-center lg:text-left">
              <h1 className="font-display text-display text-primary mb-8 tracking-tighter mx-auto lg:mx-0">
                Your memories are not AI training data.
              </h1>
              <p className="font-body-lg text-body-lg text-secondary mb-12 max-w-xl mx-auto lg:mx-0">
                Welcome to Frames. A simple, chronological photo feed for you
                and your friends. Encrypted, private, and noise-free.
              </p>
              {heroSubmitted ? (
                <div className="bg-surface-container py-4 px-6 border-l-4 border-primary text-left">
                  <p className="font-body-lg text-primary font-medium">
                    Thanks for requesting an invite! We'll be in touch soon.
                  </p>
                </div>
              ) : (
                <form
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0"
                  onSubmit={handleHeroSubmit}
                >
                  <input
                    className="flex-1 bg-transparent border-0 border-b border-primary text-primary font-body-lg text-body-lg py-3 px-0 focus:ring-0 focus:border-b-2 focus:border-primary placeholder-outline transition-all rounded-none outline-none"
                    placeholder="Email address"
                    required
                    type="email"
                    value={heroEmail}
                    onChange={(e) => setHeroEmail(e.target.value)}
                  />
                  <button
                    className="bg-primary text-on-primary font-label-caps text-label-caps px-8 py-3 hover:bg-surface-tint transition-colors rounded-none sm:w-auto w-full"
                    type="submit"
                  >
                    Request Invite
                  </button>
                </form>
              )}
            </div>

            <div className="flex-1 w-full flex justify-center lg:justify-end">
              {/* Phone Mockup — Prototype Video */}
              <div className="relative w-[366px] h-[800px] rounded-[3rem] overflow-hidden shadow-2xl scale-90 sm:scale-100 transform origin-top lg:origin-center">
                <video
                  src="/frames-prototype-demo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-[1.292]"
                />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section
            ref={featuresRef}
            className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-32 border-b border-surface-variant"
          >
            <h2 className="font-headline-lg text-headline-lg text-primary mb-16 tracking-tighter">
              Features built for humans.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <h3 className="font-headline-md text-headline-md text-primary mb-4">
                  No Algorithms
                </h3>
                <p className="font-body-sm text-body-sm text-secondary">
                  Your feed is strictly chronological. No engagement bait, no
                  promoted posts, just updates from friends in the order they
                  happened.
                </p>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-primary mb-4">
                  High-Fidelity Media
                </h3>
                <p className="font-body-sm text-body-sm text-secondary">
                  Upload your photos without destructive compression. We store
                  your art exactly as you captured it.
                </p>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-primary mb-4">
                  Ad-Free Experience
                </h3>
                <p className="font-body-sm text-body-sm text-secondary">
                  We are supported directly by our users, not advertisers. This
                  means a clean, distraction-free interface forever.
                </p>
              </div>
            </div>
          </section>

          {/* Inside Frames Section */}
          <section
            ref={galleryRef}
            className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-32 border-b border-surface-variant"
          >
            <h2 className="font-headline-lg text-headline-lg text-primary mb-16 tracking-tighter">
              The calm feed you miss.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
              {/* Mock UI 1: Feed */}
              <div className="bg-surface-bright border border-surface-variant aspect-[9/19] max-w-sm mx-auto w-full relative flex flex-col overflow-hidden">
                {/* Header */}
                <div className="h-14 border-b border-surface-variant flex items-center px-4 justify-between bg-surface-container-lowest shrink-0">
                  <div className="font-headline-md text-headline-md tracking-tighter">
                    Frames
                  </div>
                  <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                  </div>
                </div>
                {/* Post */}
                <div className="flex-1 overflow-y-auto bg-surface pb-10">
                  <div className="mb-8">
                    <div className="px-4 py-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-fixed"></div>
                      <div>
                        <div className="font-label-caps text-label-caps text-primary">
                          ALEXA_H
                        </div>
                        <div className="font-metadata text-metadata text-secondary">
                          2 hours ago • Encrypted
                        </div>
                      </div>
                    </div>
                    <div className="aspect-square bg-surface-dim relative group">
                      <img
                        src="https://images.unsplash.com/photo-1549468926-d18ce9287a2d?q=80&w=1000&auto=format&fit=crop"
                        className="w-full h-full object-cover"
                        alt="Post"
                      />
                    </div>
                    <div className="px-4 py-3">
                      <div className="flex gap-4 mb-3">
                        <Heart
                          className="w-6 h-6 text-primary"
                          strokeWidth={1.5}
                        />
                        <MessageCircle
                          className="w-6 h-6 text-primary"
                          strokeWidth={1.5}
                        />
                        <Send
                          className="w-6 h-6 text-primary"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="font-body-sm text-body-sm text-primary mb-1">
                        <span className="font-bold mr-2">ALEXA_H</span>
                        Quiet morning routine.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mock UI 2: Encrypted DMs */}
              <div className="bg-surface-bright border border-surface-variant aspect-[9/19] max-w-sm mx-auto w-full relative flex flex-col overflow-hidden">
                {/* Header */}
                <div className="h-14 border-b border-surface-variant flex items-center px-4 gap-3 bg-surface-container-lowest shrink-0">
                  <div className="text-secondary">&lt;</div>
                  <div className="w-8 h-8 rounded-full bg-primary-fixed"></div>
                  <div>
                    <div className="font-label-caps text-label-caps text-primary leading-none">
                      ALEXA_H
                    </div>
                    <div className="font-metadata text-metadata text-tertiary-fixed-dim leading-none mt-1 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim"></div>{" "}
                      End-to-End Encrypted
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto bg-surface p-4 flex flex-col gap-4">
                  <div className="text-center font-metadata text-metadata text-secondary mb-2">
                    Today
                  </div>

                  <div className="flex gap-2 w-full">
                    <div className="w-6 h-6 rounded-full bg-primary-fixed shrink-0 mt-auto"></div>
                    <div className="bg-surface-container border border-surface-variant px-3 py-2 rounded-xl rounded-bl-sm font-body-sm text-body-sm text-primary max-w-[80%]">
                      Loved the light in your latest post.
                    </div>
                  </div>

                  <div className="flex gap-2 w-full justify-end">
                    <div className="bg-primary text-on-primary px-3 py-2 rounded-xl rounded-br-sm font-body-sm text-body-sm max-w-[80%]">
                      Thanks! Woke up early just to catch it.
                    </div>
                  </div>

                  <div className="flex gap-2 w-full">
                    <div className="w-6 h-6 rounded-full bg-primary-fixed shrink-0 mt-auto"></div>
                    <div className="bg-surface-container border border-surface-variant px-3 py-2 rounded-xl rounded-bl-sm font-body-sm text-body-sm text-primary max-w-[80%]">
                      We should go shooting sometime next week.
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="p-3 border-t border-surface-variant bg-surface-container-lowest shrink-0">
                  <div className="flex items-center gap-2 border border-surface-variant rounded-full px-3 py-2 bg-surface">
                    <ImageIcon
                      className="w-5 h-5 text-secondary"
                      strokeWidth={1.5}
                    />
                    <input
                      type="text"
                      placeholder="Message..."
                      className="flex-1 bg-transparent border-none outline-none font-body-sm text-body-sm"
                    />
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <div className="w-2 h-2 border-t border-r border-on-primary rotate-45 mr-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <section
            ref={securityRef}
            className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-32 border-b border-surface-variant bg-surface"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              <div>
                <Lock className="w-8 h-8 text-primary mb-6" strokeWidth={1.5} />
                <h3 className="font-headline-md text-headline-md text-primary mb-3">
                  Private by Design (E2EE)
                </h3>
                <p className="font-body-sm text-body-sm text-secondary">
                  Your content is encrypted end-to-end. We cannot see your
                  photos, read your messages, or sell your data.
                </p>
              </div>
              <div>
                <Grid className="w-8 h-8 text-primary mb-6" strokeWidth={1.5} />
                <h3 className="font-headline-md text-headline-md text-primary mb-3">
                  Chronological Feed
                </h3>
                <p className="font-body-sm text-body-sm text-secondary">
                  No algorithmic manipulation. See posts exactly as they happen,
                  from the people you choose to follow.
                </p>
              </div>
              <div>
                <Shield
                  className="w-8 h-8 text-primary mb-6"
                  strokeWidth={1.5}
                />
                <h3 className="font-headline-md text-headline-md text-primary mb-3">
                  0 Data Tracking
                </h3>
                <p className="font-body-sm text-body-sm text-secondary">
                  We do not track your location, behavior, or device
                  identifiers. A zero-knowledge architecture.
                </p>
              </div>
              <div>
                <ImageIcon
                  className="w-8 h-8 text-primary mb-6"
                  strokeWidth={1.5}
                />
                <h3 className="font-headline-md text-headline-md text-primary mb-3">
                  Uncompressed Media
                </h3>
                <p className="font-body-sm text-body-sm text-secondary">
                  Your art deserves respect. We store and serve your images
                  without degrading compression.
                </p>
              </div>
            </div>
          </section>
        </>
      ) : page === "Terms" ? (
        <Terms />
      ) : page === "Privacy" ? (
        <Privacy />
      ) : page === "Manifesto" ? (
        <Manifesto />
      ) : page === "Source" ? (
        <Source />
      ) : null}

      {/* Footer Waitlist & Footer */}
      <footer
        ref={footerRef}
        className="bg-surface dark:bg-primary-container text-primary dark:text-on-primary w-full border-t border-outline-variant dark:border-outline"
      >
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-32">
          <div className="max-w-xl mx-auto text-center mb-24">
            <h2 className="font-headline-lg text-headline-lg text-white mb-8 tracking-tighter">
              Ready to exit the noise?
            </h2>
            {footerSubmitted ? (
              <div className="bg-surface-container py-4 px-6 border-l-4 border-primary inline-block">
                <p className="font-body-lg text-primary font-medium">
                  Thanks for joining! We'll be in touch soon.
                </p>
              </div>
            ) : (
              <form
                className="flex flex-col sm:flex-row gap-4 justify-center"
                onSubmit={handleFooterSubmit}
              >
                <input
                  className="w-full sm:w-64 bg-transparent border-0 border-b border-primary text-primary font-body-lg text-body-lg py-3 px-0 focus:ring-0 focus:border-b-2 focus:border-primary placeholder-outline transition-all rounded-none text-center sm:text-left outline-none"
                  placeholder="Email address"
                  required
                  type="email"
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                />
                <button
                  className="bg-black text-on-primary font-label-caps text-label-caps px-8 py-3 hover:bg-surface-tint transition-colors rounded-none sm:w-auto w-full"
                  type="submit"
                >
                  Join Now
                </button>
              </form>
            )}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-gutter pt-8 border-t border-surface-variant">
            <div className="font-label-caps text-label-caps font-bold text-primary dark:text-on-primary opacity-100 hover:opacity-80 transition-opacity">
              Frames
            </div>
            <div className="text-sm font-medium text-[#fff3f3] border-white text-center md:text-left mt-4 md:mt-0">
              Privacy-safe analytics. Cookies Collected: 0. We track nothing.
              <br />© 2024 FRAMES. ENCRYPTED & ANONYMOUS.
            </div>
            <div className="flex gap-6 mt-6 md:mt-0">
              <a
                onClick={(e) => handleLinkClick(e, "Terms")}
                className="font-label-caps text-label-caps text-white hover:underline underline-offset-4 decoration-1 opacity-100 hover:opacity-80 transition-opacity cursor-pointer"
              >
                Terms
              </a>
              <a
                onClick={(e) => handleLinkClick(e, "Privacy")}
                className="font-label-caps text-label-caps text-white hover:underline underline-offset-4 decoration-1 opacity-100 hover:opacity-80 transition-opacity cursor-pointer"
              >
                Privacy
              </a>
              <a
                onClick={(e) => handleLinkClick(e, "Manifesto")}
                className="font-label-caps text-label-caps text-white hover:underline underline-offset-4 decoration-1 opacity-100 hover:opacity-80 transition-opacity cursor-pointer"
              >
                Manifesto
              </a>
              <a
                onClick={(e) => handleLinkClick(e, "Source")}
                className="font-label-caps text-label-caps text-white hover:underline underline-offset-4 decoration-1 opacity-100 hover:opacity-80 transition-opacity cursor-pointer"
              >
                Source
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
