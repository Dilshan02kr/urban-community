import React, { useState } from "react";
import { Button, Input } from "@/components/ui";
import { Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: null });
  };

  const validate = () => {
    let newErrors = {};
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
      // Simulate API call
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (error) {
      setErrors({ main: error });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-100 rounded-full opacity-50 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-sky-100 rounded-full opacity-50 blur-3xl" />
      </div>

      <div className="w-full max-w-[50%]">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500 shadow-lg shadow-blue-200 mb-4">
            <User className="text-white w-7 h-7" />
          </div>
          <h1
            className="text-3xl font-bold text-slate-800 tracking-tight"
            style={{ fontFamily: "'Lora', Georgia, serif" }}
          >
            Login
          </h1>
          <p className="text-slate-400 text-sm mt-1.5 font-medium">
            Sign in to your account to get started
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 px-8 py-8">
          <form className="flex flex-col gap-5">
            {/* main error */}
            {errors.main && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
                {errors.main}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Input
                type="email"
                id="email"
                label={"Email Address"}
                value={formData.email}
                placeholder="Enter Email"
                required
                icon={Mail}
                onChange={handleChange("email")}
                error={errors.email}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Input
                type="password"
                id="password"
                label={"Password"}
                value={formData.password}
                placeholder="Enter Password"
                icon={Lock}
                required
                onChange={handleChange("password")}
                error={errors.password}
              />
            </div>

            <Button type="submit" onClick={handleSubmit} loading={isSubmitting}>
              Sign In
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-6">
          Don't have an account?
          <a
            href="/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
