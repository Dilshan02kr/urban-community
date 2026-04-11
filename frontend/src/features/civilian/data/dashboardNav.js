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
  { label: 'About', to: ROUTES.DASHBOARD_ABOUT, end: false },
  { label: 'Garbage Pickup', to: ROUTES.DASHBOARD_GARBAGE_PICKUP, end: false },
]
