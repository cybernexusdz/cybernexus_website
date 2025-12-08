import { useState, useCallback, useMemo, ChangeEvent } from "react";
import { Mail, MapPin, Send, Terminal, Code2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CyberCard from "../ui/CyberCard";
import { useCyberScrollAnimation } from "@/hooks/useCyberScrollAnimation";

interface FormData {
  email: string;
  message: string;
}

type SubmitStatus = "success" | "error" | null;
type SystemStatusType = "warning" | "success";

const StatusIndicator: React.FC<{
  label: string;
  value: string;
  type: "success" | "warning" | "primary";
}> = ({ label, value, type }) => {
  const colorMap = {
    success: "bg-green-500/10 border-green-500/30 text-green-400",
    warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
    primary: "bg-primary/10 border-primary/30 text-primary",
  };

  return (
    <Badge
      variant="outline"
      className={`${colorMap[type]} font-mono uppercase tracking-wide`}
    >
      {label}: {value}
    </Badge>
  );
};

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus("success");
      setFormData({ email: "", message: "" });

      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData.email, formData.message]);

  const systemStatus = useMemo(
    () => (isSubmitting ? "BUSY" : "READY"),
    [isSubmitting],
  );

  const systemStatusType = useMemo<SystemStatusType>(
    () => (isSubmitting ? "warning" : "success"),
    [isSubmitting],
  );

  const isFormValid = formData.email && formData.message;

  // Animation refs with RGB CHROMATIC ABERRATION glitch effects
  const headerBadgeRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 0.8,
    delay: 0.1,
  });

  const headerTitleRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 1.2,
    delay: 0.3,
  });

  const headerDescRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 0.8,
    delay: 0.5,
  });

  const formCardRef = useCyberScrollAnimation({
    animation: "cyberGlitchLeft",
    duration: 1.4,
    delay: 0.2,
  });

  const mapCardRef = useCyberScrollAnimation({
    animation: "cyberGlitchRight",
    duration: 1.4,
    delay: 0.2,
  });

  return (
    <section className="min-h-screen py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-10 bg-gradient-to-b from-background via-background/50 to-background relative overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto w-full space-y-8 sm:space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          {/* Badge - CENTER GLITCH with RGB */}
          <div ref={headerBadgeRef} className="mb-3 sm:mb-4">
            <Badge
              variant="outline"
              className="border-primary/50 bg-background/80 backdrop-blur-sm px-4 py-2 font-mono"
            >
              <Terminal className="w-4 h-4 mr-2 inline" />
              &lt;COMMUNICATION_CHANNEL&gt;
            </Badge>
          </div>

          {/* Title - CENTER GLITCH with RGB */}
          <div ref={headerTitleRef}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight font-mono px-2">
              <span className="text-primary/60">&gt;</span> Get In{" "}
              <span className="relative inline-block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
          </div>

          {/* Description - CENTER GLITCH with RGB */}
          <div ref={headerDescRef}>
            <p className="text-sm sm:text-base md:text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed font-mono px-4">
              <span className="text-primary font-bold">&gt;</span> Interested in
              partnering with CYBERNEXUS? We welcome collaborations with
              companies and organizations looking to support tech innovation and
              student development.
            </p>

            <div className="flex items-center justify-center gap-2 text-primary/40 font-mono text-xs pt-2 sm:pt-4">
              <Code2 className="w-3 h-3 sm:w-4 sm:h-4" />
              <div className="flex gap-1">
                <span className="animate-pulse hidden sm:inline">
                  ────────────────────────────────────────
                </span>
                <span className="animate-pulse sm:hidden">──────────────</span>
              </div>
              <Code2 className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </div>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Form Card - LEFT GLITCH with RGB */}
          <div ref={formCardRef}>
            <CyberCard
              glowColor="primary"
              className="p-6 sm:p-8 flex flex-col h-full"
            >
              <div className="space-y-2 mb-6">
                <Badge
                  variant="outline"
                  className="border-primary/50 bg-background/80 backdrop-blur-sm font-mono"
                >
                  <Terminal className="w-3 h-3 mr-1 inline" />
                  MESSAGE_PROTOCOL
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight font-mono">
                  Send us a message
                </h3>
              </div>

              <div className="space-y-4 sm:space-y-6 flex-grow flex flex-col">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-foreground font-bold font-mono text-xs sm:text-sm uppercase tracking-wider"
                  >
                    <span className="text-secondary">&gt;</span> Your Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-primary/70 w-4 h-4 sm:w-5 sm:h-5 z-10" />
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="pl-10 sm:pl-12 bg-background/90 border-2 border-primary/20 focus:border-primary font-mono hover:border-primary/40 h-10 sm:h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2 flex-grow flex flex-col">
                  <Label
                    htmlFor="message"
                    className="text-foreground font-bold font-mono text-xs sm:text-sm uppercase tracking-wider"
                  >
                    <span className="text-secondary">&gt;</span> Your Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us what you're interested in..."
                    className="bg-background/90 border-2 border-primary/20 focus:border-primary font-mono hover:border-primary/40 resize-none flex-grow"
                  />
                </div>

                <div className="mt-auto space-y-4">
                  <Button
                    size="lg"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isFormValid}
                    className="w-full group bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-lg px-8 py-6"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        <span className="flex items-center gap-1 sm:gap-2">
                          SEND_MESSAGE
                          <span className="text-xs opacity-70 hidden sm:inline">
                            .exe
                          </span>
                        </span>
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse ml-2" />
                      </>
                    )}
                  </Button>

                  {submitStatus === "success" && (
                    <Alert className="bg-green-500/10 border-2 border-green-500/50 text-green-400">
                      <AlertDescription className="font-bold font-mono text-center">
                        ✓ MESSAGE_TRANSMITTED
                      </AlertDescription>
                    </Alert>
                  )}

                  {submitStatus === "error" && (
                    <Alert className="bg-red-500/10 border-2 border-red-500/50 text-red-400">
                      <AlertDescription className="font-bold font-mono text-center">
                        ✗ TRANSMISSION_FAILED
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <StatusIndicator
                      label="SYSTEM"
                      value={systemStatus}
                      type={systemStatusType}
                    />
                    <StatusIndicator
                      label="PROTOCOL"
                      value="SMTP"
                      type="primary"
                    />
                  </div>
                </div>
              </div>
            </CyberCard>
          </div>

          {/* Map Card - RIGHT GLITCH with RGB */}
          <div ref={mapCardRef}>
            <CyberCard
              glowColor="secondary"
              className="p-6 sm:p-8 flex flex-col h-full"
            >
              <div className="space-y-2 mb-6">
                <Badge
                  variant="outline"
                  className="border-secondary/50 bg-background/80 backdrop-blur-sm font-mono"
                >
                  <MapPin className="w-3 h-3 mr-1 inline" />
                  COORDINATES
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight font-mono">
                  Our Location
                </h3>
              </div>

              <div className="space-y-4 sm:space-y-6 flex-grow flex flex-col">
                <div className="flex items-start gap-2 sm:gap-3 text-foreground/80 bg-background/40 p-3 sm:p-4 rounded-lg border border-secondary/20">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-1 text-secondary flex-shrink-0" />
                  <div className="font-mono text-xs sm:text-sm">
                    <p className="font-bold text-foreground">
                      <span className="text-secondary">&gt;</span> Ibn Khaldoun
                      University
                    </p>
                    <p className="text-foreground/70">
                      Faculty of Mathematics and Computer Science
                    </p>
                    <p className="text-foreground/70">Tiaret, Algeria</p>
                  </div>
                </div>

                <div className="w-full flex-grow rounded-xl overflow-hidden border-2 border-secondary/30 relative shadow-2xl hover:border-secondary/50 transition-all duration-300 min-h-[300px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2736.4522640683!2d1.3209439433091803!3d35.350471531917535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1286d1b08df59eab%3A0xd7ba2589aab1d516!2z2YPZhNmK2Kkg2KfZhNix2YrYp9i22YrYp9iqINmIINin2YTYp9i52YTYp9mFINin2YTYotmE2Yo!5e0!3m2!1sen!2sdz!4v1762766791505!5m2!1sen!2sdz"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ibn Khaldoun University Tiaret Location"
                    className="absolute inset-0"
                  />
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  <StatusIndicator label="GPS" value="LOCKED" type="success" />
                  <StatusIndicator
                    label="SIGNAL"
                    value="STRONG"
                    type="success"
                  />
                  <StatusIndicator
                    label="PRECISION"
                    value="HIGH"
                    type="primary"
                  />
                </div>
              </div>
            </CyberCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
