export const metadata = {
  title: "Privacy Policy",
  description: "How DeepVoid handles data, cookies, analytics, and advertising."
};

export default function PrivacyPage() {
  return (
    <div className="prose-void mx-auto max-w-2xl py-12 text-sm">
      <h1 className="font-display text-3xl tracking-tight text-starlight">Privacy Policy</h1>
      <p>Last updated: June 2026</p>

      <h2>What we collect</h2>
      <p>
        DeepVoid does not require accounts and does not collect personal information to browse the
        site. If you subscribe to the newsletter, your email address is stored by our newsletter
        provider solely to send you the newsletter; you can unsubscribe at any time using the link
        in every email.
      </p>

      <h2>Cookies and advertising</h2>
      <p>
        DeepVoid may display advertising served by third-party vendors, including Google AdSense.
        Third-party vendors use cookies to serve ads based on your prior visits to this and other
        websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads
        based on your visits to this site and/or other sites on the Internet. You may opt out of
        personalized advertising by visiting Google&apos;s <a href="https://www.google.com/settings/ads">Ads Settings</a> or
        <a href="https://www.aboutads.info"> www.aboutads.info</a>.
      </p>

      <h2>Analytics</h2>
      <p>
        We may use privacy-respecting analytics to understand which pages are read. Analytics data
        is aggregated and is not used to identify individual visitors.
      </p>

      <h2>Third-party data sources</h2>
      <p>
        Live data displayed on this site is fetched from public APIs (NASA, The Space Devs,
        Where The ISS At, NASA Exoplanet Archive). Your browser may connect directly to some of
        these services to display live information; their respective privacy policies apply to
        those requests.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy questions or data requests, contact the site operator via the newsletter
        reply-to address.
      </p>
    </div>
  );
}
