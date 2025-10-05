import Link from "next/link";

export function Navigation() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-8 py-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-medium tracking-tight transition-colors hover:text-zinc-600">
            Medica Studio
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-8 md:gap-12">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 md:text-base"
            >
              Projets
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 md:text-base"
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 md:text-base"
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
