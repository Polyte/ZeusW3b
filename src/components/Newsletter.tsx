import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { NewsletterService } from "../utils/database/services";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const result = await NewsletterService.subscribe(email);
      
      if (result) {
        setStatus("success");
        setMessage("Successfully subscribed to our newsletter!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage("You're already subscribed!");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setStatus("error");
      setMessage("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-primary/5 border border-primary/10 rounded-lg p-6 mb-8">
      <div className="text-center mb-4">
        <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
        <h3 className="text-lg text-foreground mb-2">Stay in the Loop</h3>
        <p className="text-sm text-muted-foreground">
          Get the latest updates on our projects and industry insights.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-background border-border/50"
            required
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="sm:w-auto"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>

        {status !== "idle" && (
          <div className={`flex items-center gap-2 text-sm ${
            status === "success" ? "text-green-600" : "text-red-600"
          }`}>
            {status === "success" ? 
              <CheckCircle className="w-4 h-4" /> : 
              <AlertCircle className="w-4 h-4" />
            }
            <span>{message}</span>
          </div>
        )}
      </form>
    </div>
  );
}