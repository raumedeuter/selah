import { Search, Palette } from "lucide-react";

function AppShell({ children }) {
  return (
    <div className="min-h-screen w-full relative">
      {/* Background layer */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 -z-10" />

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-semibold tracking-widest text-slate-700">
          SELAH
        </h1>
        <div className="flex items-center gap-1">
          <button className="p-1 text-slate-500 hover:text-slate-700 transition-colors">
            <Search size={18} />
          </button>
          <button className="p-1 text-slate-500 hover:text-slate-700 transition-colors">
            <Palette size={18} />
          </button>
        </div>
      </header>

      {/* Page content */}
      <main className="w-full">{children}</main>
    </div>
  );
}

export default AppShell;
