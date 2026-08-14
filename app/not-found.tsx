export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-grid" aria-hidden="true" />
      <div className="not-found-code">
        <span>404</span>
        <div>
          <p><b>01</b> <em>const</em> route = &#123;</p>
          <p><b>02</b> &nbsp;found: <strong>false</strong>,</p>
          <p><b>03</b> &nbsp;message: <i>&quot;This path does not exist.&quot;</i>,</p>
          <p><b>04</b> &nbsp;recovery: <i>&quot;Return to Nomo&apos;s portfolio&quot;</i></p>
          <p><b>05</b> &#125;;</p>
          <a className="button button-primary" href="./">back-to-home <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </main>
  );
}
