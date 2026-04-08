export function HomePage() {
  return (
    <section className="page">
      <h1>Urban Community</h1>
      <p className="page__lead">
        React frontend scaffold. API calls can use{' '}
        <code>apiRequest(&apos;/api/...&apos;)</code> with{' '}
        <code>VITE_API_BASE_URL</code> empty in dev (Vite proxies{' '}
        <code>/api</code> to your Express server).
      </p>
    </section>
  )
}
