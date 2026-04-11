import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import { issueService } from "@/services/issue.service";
import { ROUTES } from "@/constants/routes";
import {
  AlertTriangle,
  MapPin,
  FileText,
  ImagePlus,
  Send,
  Loader2,
  Clock,
  CheckCircle2,
  XCircle,
  Loader,
  Lightbulb,
  ListChecks,
  ChevronRight,
} from "lucide-react";

/** Must match server/modules/issues/issue.validation.js (lowercase) */
const ISSUE_CATEGORIES = [
  { value: "infrastructure", label: "Infrastructure" },
  { value: "waste", label: "Waste" },
  { value: "water", label: "Water" },
  { value: "electricity", label: "Electricity" },
  { value: "environment", label: "Environment" },
  { value: "safety", label: "Safety" },
  { value: "other", label: "Other" },
];

const STATUS_CONFIG = {
  Pending: {
    icon: Clock,
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.1)",
    border: "rgba(245, 158, 11, 0.25)",
    label: "Pending",
  },
  InProgress: {
    icon: Loader,
    color: "#3b82f6",
    bg: "rgba(59, 130, 246, 0.1)",
    border: "rgba(59, 130, 246, 0.25)",
    label: "In progress",
  },
  Resolved: {
    icon: CheckCircle2,
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.1)",
    border: "rgba(16, 185, 129, 0.25)",
    label: "Resolved",
  },
  Rejected: {
    icon: XCircle,
    color: "#ef4444",
    bg: "rgba(239, 68, 68, 0.1)",
    border: "rgba(239, 68, 68, 0.25)",
    label: "Rejected",
  },
};

const initialFormState = {
  title: "",
  description: "",
  category: "",
  location: "",
};

export default function IssueReportingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialFormState);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [issues, setIssues] = useState([]);
  const [loadingIssues, setLoadingIssues] = useState(true);
  const [activeTab, setActiveTab] = useState("report");

  useEffect(() => {
    if (location.state?.issueTab === "my-reports") {
      setActiveTab("my-reports");
      navigate(".", { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const fetchMyIssues = async () => {
    setLoadingIssues(true);
    try {
      const res = await issueService.getMyIssues();
      setIssues(res.data?.data || []);
    } catch (err) {
      console.error("Failed to load issues:", err);
    } finally {
      setLoadingIssues(false);
    }
  };

  useEffect(() => {
    fetchMyIssues();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    if (!/^image\/(jpeg|png|webp)$/i.test(file.type)) {
      message.warning("Please choose a JPG, PNG, or WebP image.");
      e.target.value = "";
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category) {
      message.warning("Please select a category");
      return;
    }
    if (form.title.trim().length < 3) {
      message.warning("Title must be at least 3 characters");
      return;
    }
    if (form.description.trim().length < 10) {
      message.warning("Description must be at least 10 characters");
      return;
    }
    if (form.location.trim().length < 3) {
      message.warning("Location must be at least 3 characters");
      return;
    }

    const fd = new FormData();
    fd.append("title", form.title.trim());
    fd.append("description", form.description.trim());
    fd.append("category", form.category);
    fd.append("location", form.location.trim());
    if (imageFile) {
      fd.append("image", imageFile);
    }

    setSubmitting(true);
    try {
      await issueService.createIssue(fd);
      message.success("Issue reported successfully.");
      setForm(initialFormState);
      clearImage();
      setActiveTab("my-reports");
      fetchMyIssues();
    } catch (err) {
      const errMsg =
        err.response?.data?.message || "Could not submit your report.";
      message.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const accent = "#f97316";
  const accentDark = "#ea580c";

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <header style={{ marginBottom: 28 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 6,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              background: `linear-gradient(135deg, ${accent} 0%, ${accentDark} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(249, 115, 22, 0.35)",
            }}
          >
            <AlertTriangle size={26} color="#fff" />
          </div>
          <div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#0f172a",
                fontFamily: "'Lora', Georgia, serif",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              Issue reporting
            </h1>
            <p
              style={{
                fontSize: 14,
                color: "#64748b",
                margin: "4px 0 0",
                fontWeight: 500,
              }}
            >
              Report civic problems in your area and track how they are handled
            </p>
          </div>
        </div>
      </header>

      {/* Quick guide */}
      <section
        style={{
          marginBottom: 24,
          borderRadius: 16,
          border: "1px solid rgba(251, 191, 36, 0.35)",
          background:
            "linear-gradient(135deg, rgba(255, 251, 235, 0.95) 0%, rgba(254, 243, 199, 0.5) 100%)",
          padding: "18px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
          }}
        >
          <Lightbulb size={20} color="#d97706" />
          <h2
            style={{
              margin: 0,
              fontSize: 15,
              fontWeight: 700,
              color: "#92400e",
            }}
          >
            Quick guide
          </h2>
        </div>
        <ul
          style={{
            margin: 0,
            paddingLeft: 22,
            color: "#78350f",
            fontSize: 14,
            lineHeight: 1.65,
          }}
        >
          <li>
            Use a <strong>clear title</strong> so staff can understand the
            problem at a glance.
          </li>
          <li>
            In the description, add <strong>what you saw</strong>, when, and
            anything that might help (e.g. nearest landmark).
          </li>
          <li>
            <strong>Location</strong> should be specific enough for teams to find
            the spot (street, area, or landmark).
          </li>
          <li>
            A <strong>photo</strong> helps verify dumping, damage, or safety
            issues—optional but recommended.
          </li>
          <li>
            Reports are reviewed in order; you will see status updates under{" "}
            <em>My reports</em>.
          </li>
        </ul>
      </section>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 4,
          padding: 4,
          borderRadius: 14,
          background: "#f1f5f9",
          marginBottom: 24,
        }}
      >
        {[
          { key: "report", label: "Report issue", icon: Send },
          { key: "my-reports", label: "My reports", icon: ListChecks },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "10px 16px",
              borderRadius: 11,
              border: "none",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              background: activeTab === key ? "#fff" : "transparent",
              color: activeTab === key ? accent : "#64748b",
              boxShadow:
                activeTab === key ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
            }}
          >
            <Icon size={16} />
            {label}
            {key === "my-reports" && issues.length > 0 && (
              <span
                style={{
                  background: activeTab === key ? accent : "#94a3b8",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "1px 7px",
                  borderRadius: 20,
                  minWidth: 20,
                  textAlign: "center",
                }}
              >
                {issues.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {activeTab === "report" && (
        <form onSubmit={handleSubmit}>
          <div
            style={{
              borderRadius: 20,
              border: "1px solid rgba(226, 232, 240, 0.9)",
              background: "rgba(255,255,255,0.92)",
              boxShadow: "0 8px 32px rgba(148, 163, 184, 0.12)",
              backdropFilter: "blur(12px)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "28px 28px 0" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                <AlertTriangle size={14} color={accent} />
                Title
              </label>
              <input
                id="issue-title"
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Broken streetlight on Oak Lane"
                maxLength={100}
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "1.5px solid #e2e8f0",
                  fontSize: 14,
                  color: "#1e293b",
                  background: "#f8fafc",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = accent)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 12,
                  color: "#94a3b8",
                }}
              >
                3–100 characters
              </p>
            </div>

            <div style={{ padding: "24px 28px 0" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                <FileText size={14} color={accent} />
                Description
              </label>
              <textarea
                id="issue-description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the issue in detail: what is wrong, approximate time, and any context that helps responders."
                rows={5}
                maxLength={1000}
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "1.5px solid #e2e8f0",
                  fontSize: 14,
                  color: "#1e293b",
                  background: "#f8fafc",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = accent)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 12,
                  color: "#94a3b8",
                }}
              >
                10–1000 characters
              </p>
            </div>

            <div style={{ padding: "24px 28px 0" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                <ListChecks size={14} color={accent} />
                Category
              </label>
              <select
                id="issue-category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "1.5px solid #e2e8f0",
                  fontSize: 14,
                  color: "#1e293b",
                  background: "#f8fafc",
                  outline: "none",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = accent)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              >
                <option value="">Select a category</option>
                {ISSUE_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ padding: "24px 28px 0" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                <MapPin size={14} color={accent} />
                Location
              </label>
              <input
                id="issue-location"
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Near City Park east gate, Ward 4"
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "1.5px solid #e2e8f0",
                  fontSize: 14,
                  color: "#1e293b",
                  background: "#f8fafc",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = accent)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>

            <div style={{ padding: "24px 28px 0" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                <ImagePlus size={14} color={accent} />
                Photo{" "}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    color: "#94a3b8",
                    textTransform: "none",
                    letterSpacing: 0,
                  }}
                >
                  (optional — JPG, PNG, WebP)
                </span>
              </label>
              <input
                id="issue-image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                style={{
                  width: "100%",
                  fontSize: 13,
                  color: "#64748b",
                }}
              />
              {imagePreview && (
                <div
                  style={{
                    marginTop: 12,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="Selected"
                    style={{
                      maxWidth: "100%",
                      maxHeight: 180,
                      borderRadius: 12,
                      border: "1px solid #e2e8f0",
                      objectFit: "cover",
                    }}
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    style={{
                      padding: "6px 12px",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#64748b",
                      background: "#f1f5f9",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div style={{ padding: "28px" }}>
              <button
                id="issue-submit-btn"
                type="submit"
                disabled={submitting}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  padding: "14px 24px",
                  borderRadius: 14,
                  border: "none",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#fff",
                  background: submitting
                    ? "#94a3b8"
                    : `linear-gradient(135deg, ${accent} 0%, ${accentDark} 100%)`,
                  cursor: submitting ? "not-allowed" : "pointer",
                  boxShadow: submitting
                    ? "none"
                    : "0 6px 20px rgba(249, 115, 22, 0.35)",
                  letterSpacing: "0.02em",
                }}
              >
                {submitting ? (
                  <>
                    <Loader2
                      size={18}
                      style={{ animation: "spin 1s linear infinite" }}
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit report
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {activeTab === "my-reports" && (
        <div>
          {loadingIssues ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                borderRadius: 20,
                background: "rgba(255,255,255,0.92)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                boxShadow: "0 8px 32px rgba(148, 163, 184, 0.12)",
              }}
            >
              <Loader2
                size={32}
                color={accent}
                style={{ animation: "spin 1s linear infinite" }}
              />
              <p
                style={{
                  marginTop: 12,
                  color: "#64748b",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Loading your reports...
              </p>
            </div>
          ) : issues.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                borderRadius: 20,
                background: "rgba(255,255,255,0.92)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                boxShadow: "0 8px 32px rgba(148, 163, 184, 0.12)",
              }}
            >
              <AlertTriangle size={40} color="#cbd5e1" />
              <p
                style={{
                  marginTop: 12,
                  color: "#64748b",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                No reports yet
              </p>
              <p style={{ marginTop: 4, color: "#94a3b8", fontSize: 13 }}>
                Use the Report issue tab to submit your first civic issue.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {issues.map((issue) => {
                const catLabel =
                  ISSUE_CATEGORIES.find((c) => c.value === issue.category)
                    ?.label || issue.category;
                const statusInfo =
                  STATUS_CONFIG[issue.status] || STATUS_CONFIG.Pending;
                const StatusIcon = statusInfo.icon;

                return (
                  <Link
                    key={issue._id}
                    to={ROUTES.civilianIssueDetail(issue._id)}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "block",
                    }}
                  >
                  <article
                    style={{
                      borderRadius: 16,
                      border: "1px solid rgba(226, 232, 240, 0.9)",
                      background: "rgba(255,255,255,0.92)",
                      boxShadow: "0 4px 16px rgba(148, 163, 184, 0.1)",
                      padding: "20px 24px",
                      cursor: "pointer",
                      transition: "box-shadow 0.2s ease, border-color 0.2s ease",
                    }}
                    className="issue-report-card"
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 12,
                        marginBottom: 10,
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            margin: 0,
                            fontSize: 16,
                            fontWeight: 700,
                            color: "#1e293b",
                          }}
                        >
                          {issue.title}
                        </h3>
                        <p
                          style={{
                            margin: "6px 0 0",
                            fontSize: 12,
                            color: "#94a3b8",
                          }}
                        >
                          {catLabel} ·{" "}
                          {issue.createdAt
                            ? new Date(issue.createdAt).toLocaleString()
                            : ""}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "5px 12px",
                          borderRadius: 20,
                          background: statusInfo.bg,
                          border: `1px solid ${statusInfo.border}`,
                          flexShrink: 0,
                        }}
                      >
                        <StatusIcon size={13} color={statusInfo.color} />
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: statusInfo.color,
                          }}
                        >
                          {statusInfo.label}
                        </span>
                      </div>
                    </div>
                    <p
                      style={{
                        margin: "0 0 10px",
                        fontSize: 14,
                        color: "#475569",
                        lineHeight: 1.55,
                      }}
                    >
                      {issue.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        color: "#64748b",
                        fontSize: 13,
                        marginBottom: issue.image ? 12 : 0,
                      }}
                    >
                      <MapPin size={13} />
                      <span>{issue.location}</span>
                    </div>
                    {issue.image && (
                      <img
                        src={issue.image}
                        alt=""
                        style={{
                          width: "100%",
                          maxHeight: 200,
                          objectFit: "cover",
                          borderRadius: 12,
                          border: "1px solid #f1f5f9",
                        }}
                      />
                    )}
                    {issue.adminResponse && (
                      <div
                        style={{
                          marginTop: 12,
                          paddingTop: 12,
                          borderTop: "1px solid #f1f5f9",
                          fontSize: 13,
                          color: "#334155",
                        }}
                      >
                        <strong style={{ color: "#0f172a" }}>
                          Admin response:
                        </strong>{" "}
                        {issue.adminResponse}
                      </div>
                    )}
                    <div
                      style={{
                        marginTop: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 4,
                        fontSize: 13,
                        fontWeight: 600,
                        color: accent,
                      }}
                    >
                      View full details
                      <ChevronRight size={16} />
                    </div>
                  </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .issue-report-card:hover {
          box-shadow: 0 8px 24px rgba(148, 163, 184, 0.2);
          border-color: rgba(249, 115, 22, 0.35);
        }
      `}</style>
    </div>
  );
}
