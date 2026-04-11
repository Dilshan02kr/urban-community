import React, { useState } from "react";
import { Input } from "@/components/ui"; // Ensure this matches your UI component structure
import { Lock, Mail, Recycle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: null });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Min 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // Standard practice
    try {
      setIsSubmitting(true);
      if (!validate()) return;
      const result = await login(formData.email, formData.password);
      
      // Dynamic Routing: Send them to their specific dashboard
      const userRole = result.data?.user?.role;
      if (userRole === 'organization') {
        navigate("/organization/dashboard");
      } else {
        navigate("/dashboard"); // Civilian default
      }
    } catch (error) {
      setErrors({ main: "Login failed. Please check your connection." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "#e1e3eb",
      display: "grid",
      gridTemplateColumns: "1fr", // Mobile default
      gridTemplateRows: "auto 1fr", // Mobile default
      fontFamily: "'DM Sans', sans-serif",
      position: "relative",
      overflow: "hidden",
    },
    imageSide: {
      background: "url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "none", // Hidden on mobile
      position: "relative",
    },
    imageOverlay: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to top, rgba(15,17,23,1) 0%, rgba(15,17,23,0.5) 50%, rgba(15,17,23,0.8) 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "4rem",
    },
    formSide: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      zIndex: 1,
    },
    card: {
      width: "100%",
      maxWidth: "420px",
      background: "#1a1d27",
      border: "1px solid rgba(255,255,255,0.09)",
      borderRadius: "24px",
      padding: "2.5rem",
      position: "relative",
    },
    submitButton: {
      marginTop: "1rem",
      width: "100%",
      padding: "14px",
      background: isSubmitting ? "rgba(16,185,129,0.5)" : "#10b981",
      color: "#fff",
      border: "none",
      borderRadius: "12px",
      fontSize: "15px",
      fontWeight: 600,
      cursor: isSubmitting ? "not-allowed" : "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      transition: "all 0.15s",
      fontFamily: "inherit",
    }
  };

  return (
    <div style={styles.container} className="responsive-container">
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* 🖼️ Image Side */}
      <div style={styles.imageSide} className="responsive-image">
        <div style={styles.imageOverlay}>
          <div style={{ display: "flex", itemsCenter: "center", gap: "10px", color: "#10b981", marginBottom: "1rem"}}>
            <Recycle size={32} strokeWidth={2.5}/>
            <span style={{ fontSize: "28px", fontWeight: 700, color: "white"}}>Urban Community</span>
          </div>
          <h2 style={{ fontSize: "40px", fontWeight: 700, color: "white", letterSpacing: "-1px", lineHeight: 1.1, margin: 0 }}>
            Smart waste solutions<br/> for a cleaner city.
          </h2>
          <p style={{ color: "#9ca3af", marginTop: "1rem", fontSize: "16px", maxWidth: "480px" }}>
            Connect with local initiatives, report issues, and manage your sustainability footprint effortlessly.
          </p>
        </div>
      </div>

      {/* 📝 Form Side */}
      <div style={styles.formSide}>
        <div style={styles.card}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#f1f5f9", letterSpacing: "-1px", margin: 0 }}>
              Welcome back
            </h1>
            <p style={{ fontSize: "15px", color: "#6b7280", marginTop: "8px" }}>
              Log in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {errors.main && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", padding: "12px", borderRadius: "10px", fontSize: "13px", textAlign: "center" }}>
                {errors.main}
              </div>
            )}

            {/* Email Address */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, uppercase: "true", letterSpacing: "1px", color: "#6b7280" }}>
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                value={formData.email}
                placeholder="you@example.com"
                required
                icon={Mail}
                onChange={handleChange("email")}
                error={errors.email}
              />
            </div>

            {/* Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, uppercase: "true", letterSpacing: "1px", color: "#6b7280" }}>
                  Password
                </label>
                <a href="/forgot-password" style={{ fontSize: "12px", color: "#10b981", textDecoration: "none", fontWeight: 500 }}>
                  Forgot password?
                </a >
              </div>
              <Input
                type="password"
                id="password"
                value={formData.password}
                placeholder="••••••••"
                icon={Lock}
                required
                onChange={handleChange("password")}
                error={errors.password}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={styles.submitButton}
              onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.background = "#059669"; }}
              onMouseLeave={(e) => { if (!isSubmitting) e.currentTarget.style.background = "#10b981"; }}
            >
              {isSubmitting ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin 0.8s linear infinite" }}><path d="M21 12a9 9 0 11-6.219-8.56" /></svg>
                  Authenticating...
                </>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>

          {/* Footer */}
          <p style={{ textAlign: "center", fontSize: "14px", color: "#4b5563", marginTop: "2rem" }}>
            Don't have an account?{" "}
            <a href="/register" style={{ color: "#10b981", fontWeight: 600, textDecoration: "none" }}>
              Create one now
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        /* Media Query for responsiveness */
        @media (min-width: 992px) {
          .responsive-container {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: 1fr !important;
          }
          .responsive-image {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}