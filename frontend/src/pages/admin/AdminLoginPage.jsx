import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "@/components/ui";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { adminService } from "@/services/admin.service";
import { setSession } from "@/utils/session";
import { message } from "antd";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: null });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    try {
      setIsSubmitting(true);
      if (!validate()) return;

      const res = await adminService.login(formData.email, formData.password);
      const body = res.data || res;

      if (body.success && body.data?.token) {
        await setSession("accessToken", body.data.token);
        await setSession("adminUser", JSON.stringify(body.data));
        message.success("Admin login successful");
        navigate("/admin");
      } else {
        setErrors({ main: body.message || "Login failed" });
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "Invalid credentials or server error";
      setErrors({ main: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex items-center justify-center px-4 py-12">
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-800 rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-900 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/30 mb-4">
            <ShieldCheck className="text-white w-7 h-7" />
          </div>
          <h1
            className="text-3xl font-bold text-white tracking-tight"
            style={{ fontFamily: "'Lora', Georgia, serif" }}
          >
            Admin Portal
          </h1>
          <p className="text-indigo-300/70 text-sm mt-1.5 font-medium">
            Sign in to manage Urban Community
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 px-8 py-8">
          <form className="flex flex-col gap-5">
            {errors.main && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-2.5 rounded-xl text-sm font-medium">
                {errors.main}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Input
                type="email"
                id="admin-email"
                label="Email Address"
                value={formData.email}
                placeholder="admin@urbancare.com"
                required
                icon={Mail}
                onChange={handleChange("email")}
                error={errors.email}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Input
                type="password"
                id="admin-password"
                label="Password"
                value={formData.password}
                placeholder="Enter password"
                icon={Lock}
                required
                onChange={handleChange("password")}
                error={errors.password}
              />
            </div>

            <Button
              type="submit"
              onClick={handleSubmit}
              loading={isSubmitting}
              fullWidth
            >
              Sign In as Admin
            </Button>
          </form>
        </div>

        <p className="text-center text-indigo-400/50 text-sm mt-6">
          <a
            href="/login"
            className="text-indigo-300/80 font-semibold hover:underline"
          >
            ← Back to Civilian Login
          </a>
        </p>
      </div>
    </div>
  );
}
