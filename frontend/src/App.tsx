import { useEffect, useState } from "react";
import "./App.css";

type PingStatus = "checking" | "ok" | "error";

function App() {
  const [pingStatus, setPingStatus] = useState<PingStatus>("checking");
  const [pingData, setPingData] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/ping")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setPingData(JSON.stringify(data));
        setPingStatus("ok");
      })
      .catch(() => {
        setPingStatus("error");
      });
  }, []);

  return (
    <div className="page">
      {/* Top bar */}
      <header className="topbar">
        <div className="logo">
          <div className="logo-dot" />
          <div>
            <div className="logo-text">Ops Portal</div>
            <div className="logo-sub">Deployment status</div>
          </div>
        </div>
        <span
          className={`global-badge ${pingStatus === "error" ? "badge-error" : "badge-ok"}`}
        >
          {pingStatus === "error" ? "Degraded" : "All systems operational"}
        </span>
      </header>

      {/* Services */}
      <section>
        <p className="section-label">SERVICES</p>
        <div className="cards">
          <ServiceCard
            icon="⬡"
            name="Frontend"
            detail="React + Vite · port 80"
            tag="nginx → :80"
            status="ok"
          />
          <ServiceCard
            icon="◈"
            name="Backend"
            detail=".NET API · /api/*"
            tag="nginx → /api/"
            status={pingStatus === "checking" ? "checking" : pingStatus}
          />
          <ServiceCard
            icon="⇄"
            name="Nginx"
            detail="Reverse proxy · :80"
            tag="host port 80"
            status="ok"
          />
        </div>
      </section>

      {/* Connectivity */}
      <section>
        <p className="section-label">CONNECTIVITY</p>
        <div className="ping-card">
          <span className="ping-method">GET</span>
          <span className="ping-route">/api/ping</span>
          <span className={`ping-result ping-result--${pingStatus}`}>
            {pingStatus === "checking" && "checking…"}
            {pingStatus === "ok" && `200 OK — ${pingData}`}
            {pingStatus === "error" && "unreachable"}
          </span>
        </div>
      </section>

      <footer className="footer">
        Deployed via GitHub Actions · QA environment
      </footer>
    </div>
  );
}

type ServiceCardProps = {
  icon: string;
  name: string;
  detail: string;
  tag: string;
  status: PingStatus;
};

function ServiceCard({ name, detail, tag, status }: ServiceCardProps) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-icon">
          {name === "Frontend" && "☰"}
          {name === "Backend" && "▣"}
          {name === "Nginx" && "⇄"}
        </span>
        <span className={`status-dot status-dot--${status}`} />
      </div>
      <div className="card-name">{name}</div>
      <div className="card-detail">{detail}</div>
      <div className="card-meta">
        <span className="tag">{tag}</span>
        <span className={`uptime uptime--${status}`}>
          {status === "checking"
            ? "checking…"
            : status === "ok"
              ? "Live"
              : "Down"}
        </span>
      </div>
    </div>
  );
}

export default App;
