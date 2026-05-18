import React from "react";

const PageLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="max-w-[800px] mx-auto px-6 md:px-16 py-32 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h1 className="font-display text-4xl md:text-5xl text-primary mb-12 tracking-tighter">
      {title}
    </h1>
    <div className="space-y-6 font-body-lg text-lg text-secondary leading-relaxed">
      {children}
    </div>
  </div>
);

export function Terms() {
  return (
    <PageLayout title="Terms of Service">
      <p className="font-metadata text-sm text-on-surface-variant uppercase tracking-widest mb-12">
        Last updated: May 2026
      </p>

      <h2 className="font-headline-md text-xl text-primary mt-12 mb-4">
        1. Acceptance of Terms
      </h2>
      <p>
        By accessing or using Frames, you agree to be bound by these terms. If
        you do not agree to every single provision, you must not use the
        service. We believe in simplicity, both in our design and our legal
        agreements.
      </p>

      <h2 className="font-headline-md text-xl text-primary mt-12 mb-4">
        2. Philosophy & Usage
      </h2>
      <p>
        Frames is an anti-attention, chronologically-ordered photo feed. We do
        not use algorithms to sort or curate your content, and you agree not to
        attempt to artificially manipulate our service through automated means.
      </p>

      <h2 className="font-headline-md text-xl text-primary mt-12 mb-4">
        3. Content Ownership
      </h2>
      <p>
        Your art remains yours. We claim absolutely no ownership rights over the
        photographs you share. You grant us only the minimal license necessary
        to store, encrypt, and display the content to the users you specifically
        authorize.
      </p>

      <h2 className="font-headline-md text-xl text-primary mt-12 mb-4">
        4. End-to-End Encryption
      </h2>
      <p>
        Because your content is encrypted end-to-end, we are structurally
        incapable of recovering data if you lose your cryptographic keys. You
        accept sole responsibility for maintaining access to your account
        recovery phrases.
      </p>
    </PageLayout>
  );
}

export function Privacy() {
  return (
    <PageLayout title="Privacy Policy">
      <p className="font-metadata text-sm text-on-surface-variant uppercase tracking-widest mb-12">
        Last updated: May 2026
      </p>

      <h2 className="font-headline-md text-xl text-primary mt-12 mb-4">
        1. Zero-Knowledge Architecture
      </h2>
      <p>
        Our privacy policy is incredibly simple because we don't hold your data
        in the clear. Your photos, captions, and direct messages are encrypted
        on your device before they ever reach our servers. We literally cannot
        see them.
      </p>

      <h2 className="font-headline-md text-xl text-primary mt-12 mb-4">
        2. Data We Collect
      </h2>
      <p>
        We collect only the bare minimum infrastructure metadata required to
        route encrypted packets between clients.
      </p>
      <ul className="list-disc pl-6 space-y-2 mt-4 text-on-surface-variant">
        <li>Your email address (for authentication only).</li>
        <li>Encrypted blobs of data.</li>
        <li>Rough timestamp metadata to maintain the chronological feed.</li>
      </ul>

      <h2 className="font-headline-md text-xl text-primary mt-12 mb-4">
        3. Data We Explicitly Refuse to Collect
      </h2>
      <ul className="list-disc pl-6 space-y-2 mt-4 text-on-surface-variant">
        <li>Location data (GPS, IP tracking).</li>
        <li>Device identifiers (IMEI, advertising IDs).</li>
        <li>Behavioral analytics (time spent looking at a photo).</li>
      </ul>

      <h2 className="font-headline-md text-xl text-primary mt-12 mb-4">
        4. Third Parties
      </h2>
      <p>
        We do not sell, rent, or trade your information. There are no
        advertising trackers, analytics scripts, or third-party SDKs buried in
        our app.
      </p>
    </PageLayout>
  );
}

export function Manifesto() {
  return (
    <PageLayout title="The Frames Manifesto">
      <p className="font-metadata text-sm text-on-surface-variant uppercase tracking-widest mb-12">
        Who we are
      </p>

      <p className="text-xl text-primary font-medium">
        Modern social media is an extraction machine. It strips context,
        compresses beauty, and fundamentally rewires how we perceive the world
        in exchange for ad revenue.
      </p>

      <p className="mt-8">
        We built Frames because we missed the quiet calm of sharing a photograph
        with a friend. No algorithms telling us what to look at. No metrics
        determining our worth. No compressed artifacts destroying the details we
        woke up at 5 AM to capture.
      </p>

      <p className="mt-8">
        We believe a photograph is a piece of art, and it deserves to be treated
        like one. It deserves high-fidelity storage, chronological placement,
        and an environment stripped of the chaotic noise of the modern internet.
      </p>

      <p className="mt-8">
        Above all, we believe your memories are yours. They are entirely
        private, they are sacred, and they are absolutely not training data for
        artificial intelligence. By utilizing rigorous end-to-end encryption, we
        have intentionally blinded ourselves to your life.
      </p>

      <p className="mt-8 text-primary font-medium">
        Welcome back to the simple feed.
      </p>
    </PageLayout>
  );
}

export function Source() {
  return (
    <PageLayout title="Source Code">
      <p className="font-metadata text-sm text-on-surface-variant uppercase tracking-widest mb-12">
        Open by default
      </p>

      <p>
        An encryption platform that you cannot audit is just a promise, and
        promises are not security.
      </p>

      <div className="mt-8 p-6 bg-surface-container border border-surface-variant">
        <div className="font-label-caps text-sm text-primary mb-2">
          Repository Pipeline
        </div>
        <p className="text-sm font-mono text-secondary">
          Our client applications and encryption protocols will be fully
          open-sourced prior to our 1.0 public launch. Security researchers will
          be invited to audit the zero-knowledge architecture.
        </p>
      </div>

      <p className="mt-8">
        Currently, Frames is in closed beta. If you are a security researcher
        interested in reviewing our implementations ahead of the release, please
        request an invite through our main page and note your interest.
      </p>
    </PageLayout>
  );
}
