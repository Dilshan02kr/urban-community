import { LayoutDashboard } from 'lucide-react'

export default function CivilianDashboardHomePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-200/80">
          <LayoutDashboard className="h-7 w-7 text-white" />
        </div>
        <div>
          <h1
            className="text-3xl font-bold tracking-tight text-slate-900"
            style={{ fontFamily: "'Lora', Georgia, serif" }}
          >
            Civilian Dashboard
          </h1>
          <p className="mt-1.5 text-sm font-medium text-slate-600">
            Welcome — your community hub starts here.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/90 bg-white/90 px-8 py-10 shadow-lg shadow-slate-200/40 backdrop-blur-md">
        <p className="text-center text-slate-600">
          You can add issue reports, updates, and shortcuts in this area as the
          feature set grows.
        </p>
      </div>
    </div>
  )
}
