import { ROUTES } from '@/constants/routes'

export const CIVILIAN_DASHBOARD_NAV = [
  { label: 'Dashboard', to: ROUTES.DASHBOARD, end: true },
  { label: 'Events', to: ROUTES.DASHBOARD_EVENTS, end: false },
  { label: 'Issue Reporting', to: ROUTES.DASHBOARD_ISSUE_REPORTING, end: false },
  {
    label: 'Garbage collectors',
    to: ROUTES.DASHBOARD_GARBAGE_COLLECTORS,
    end: false,
  },
  { label: 'Recycling Centers', to: ROUTES.DASHBOARD_RECYCLING_CENTERS, end: false },
  { label: 'About', to: ROUTES.DASHBOARD_ABOUT, end: false },
]
