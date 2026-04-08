const QUICK_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'About Us', href: '#features' },
  { label: 'Events', href: '#how-it-works' },
  { label: 'Contact', href: '#footer' },
]

const SERVICE_LINKS = [
  { label: 'Issue Reporting', href: '#features' },
  { label: 'Civic Complaints', href: '#features' },
  { label: 'Recycling', href: '#features' },
  { label: 'Waste Management', href: '#features' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="footer"
      className="border-t border-white/10 bg-slate-950"
      role="contentinfo"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 text-lg">
              🌍
            </div>
            <div>
              <p className="font-bold text-white">Urban Community</p>
              <p className="text-sm text-slate-400">Building better cities together.</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            A digital platform for civic engagement, complaint reporting, eco
            events, and sustainable community action.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-emerald-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Services
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            {SERVICE_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-emerald-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li>Email: hello@urbancommunity.org</li>
            <li>Phone: +94 77 123 4567</li>
            <li>Address: Colombo, Sri Lanka</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-sm text-slate-500">
        © {year} Urban Community. All rights reserved.
      </div>
    </footer>
  )
}
