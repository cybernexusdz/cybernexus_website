import React, { useState, useEffect } from "react";
import CyberCard from "@/components/ui/CyberCard";
import MaterialsModal from "./MaterialsModal";
import { supabase } from "@/lib/supabase";
import {
  X,
  UserPlus,
  Mail,
  User,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Download,
} from "lucide-react";
import { sendEnrollmentConfirmation } from "@/lib/emailjs";

interface EnrollModalProps {
  workshopId: number;
  workshopTitle: string;
  glowColor: "primary" | "secondary" | "cyan" | "purple" | "pink";
  categoryColor: string;
  categoryBorderColor: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const EnrollModal: React.FC<EnrollModalProps> = ({
  workshopId,
  workshopTitle,
  glowColor,
  categoryColor,
  categoryBorderColor,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMaterials, setShowMaterials] = useState(false);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!name.trim() || !email.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // Check if already enrolled
      const { data: existing } = await supabase
        .from("workshop_enrollments")
        .select("id")
        .eq("email", email.trim().toLowerCase())
        .eq("workshop_id", workshopId)
        .maybeSingle();

      if (existing) {
        setAlreadyEnrolled(true);
        setLoading(false);
        return;
      }

      // Insert enrollment
      const { error: insertError } = await supabase
        .from("workshop_enrollments")
        .insert({
          workshop_id: workshopId,
          workshop_title: workshopTitle,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          enrolled_at: new Date().toISOString(),
        });

      if (insertError) {
        throw insertError;
      }

      // Send confirmation email
      try {
        await sendEnrollmentConfirmation(
          name.trim(),
          email.trim().toLowerCase(),
          workshopTitle
        );
      } catch (emailErr) {
        // We don't want to fail the whole enrollment if email fails, 
        // but we should log it
        console.error("Email confirmation failed:", emailErr);
      }

      setSuccess(true);
      onSuccess?.();
    } catch (err: any) {
      console.error("Enrollment error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/85 backdrop-blur-lg animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="cyber-scanlines absolute inset-0" />
      </div>

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-in fade-in zoom-in-95 duration-300">
        <CyberCard
          variant="bordered"
          glowColor={glowColor}
          className={`${categoryBorderColor} overflow-hidden`}
        >
          <div className="relative z-10">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-foreground/10 transition-all duration-300"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="p-6 pb-4 border-b border-foreground/10">
              <div className="flex items-center gap-3 pr-10">
                <div
                  className={`w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center`}
                >
                  <UserPlus className={`w-5 h-5 ${categoryColor}`} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-foreground font-mono">
                    Enroll Now
                  </h2>
                  <p className="text-xs text-foreground/50 font-mono truncate max-w-[250px]">
                    {workshopTitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {alreadyEnrolled ? (
                <div className="text-center space-y-4 py-4 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    <UserPlus className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground font-mono">
                      You're Already Enrolled!
                    </h3>
                    <p className="text-sm text-foreground/60 font-mono">
                      <span className="text-primary">&gt;_</span> You have previously secured your spot in{" "}
                      <span className={categoryColor}>{workshopTitle}</span>.
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-3 mt-6">
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-lg border border-primary/30 text-primary font-mono font-bold text-sm hover:bg-primary/10 transition-all duration-300"
                    >
                      Close
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowMaterials(true);
                      }}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-mono font-bold text-sm hover:scale-105 shadow-lg shadow-primary/20 transition-all duration-300"
                    >
                      <Download className="w-4 h-4" />
                      Materials
                    </button>
                  </div>
                </div>
              ) : success ? (
                /* Success State */
                <div className="text-center space-y-4 py-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground font-mono">
                      You're In!
                    </h3>
                    <p className="text-sm text-foreground/60 font-mono">
                      <span className="text-primary">&gt;_</span> Successfully
                      enrolled in{" "}
                      <span className={categoryColor}>{workshopTitle}</span>. 
                      We'll send details to your email.
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-3 mt-6">
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-lg border border-primary/30 text-primary font-mono font-bold text-sm hover:bg-primary/10 transition-all duration-300"
                    >
                      Close
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowMaterials(true);
                      }}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-mono font-bold text-sm hover:scale-105 shadow-lg shadow-primary/20 transition-all duration-300"
                    >
                      <Download className="w-4 h-4" />
                      Materials
                    </button>
                  </div>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-foreground/60 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-foreground/10 text-foreground font-mono text-sm placeholder:text-foreground/25 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-foreground/60 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-foreground/10 text-foreground font-mono text-sm placeholder:text-foreground/25 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-mono font-bold text-sm hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enrolling...
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Enroll in Workshop
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-foreground/30 font-mono text-center">
                    By enrolling, you'll receive workshop details via email.
                  </p>
                </form>
              )}
            </div>
          </div>
        </CyberCard>
      </div>
{showMaterials && (
        <MaterialsModal 
          workshopTitle={workshopTitle} 
          onClose={() => setShowMaterials(false)} 
        />
      )}
    </div>
  );
};

export default EnrollModal;
