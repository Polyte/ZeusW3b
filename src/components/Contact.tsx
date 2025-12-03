import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { ContactService } from "../utils/database/services";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Us",
      detail: "hello@zeuslabs.site",
      description: "Get in touch with our team"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Call Us",
      detail: "+27 726911 887",
      description: "Speak directly with our experts"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Visit Us",
      detail: "Sandton, Johannesburg, 2090",
      description: "Schedule an in-person meeting"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Save contact message to database
      await ContactService.create({
        name: formData.name,
        email: formData.email,
        subject: formData.service,
        message: formData.message
      });

      setSubmitStatus("success");
      setStatusMessage("Thank you! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", service: "", message: "" });
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitStatus("error");
      setStatusMessage("Sorry, there was an error submitting your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-foreground">
              Let's Build Something Amazing
            </h2>
            <p className="text-lg text-muted-foreground">
              Ready to start your next project? Get in touch with our team 
              and let's discuss how we can help bring your ideas to life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center border-border/50 hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className="text-primary mb-4 flex justify-center">
                    {info.icon}
                  </div>
                  <CardTitle className="text-lg mb-2 text-foreground">{info.title}</CardTitle>
                  <div className="text-primary mb-2">{info.detail}</div>
                  <CardDescription className="text-sm text-muted-foreground">
                    {info.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Send Us a Message</CardTitle>
              <CardDescription className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-foreground mb-2">Name</label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name" 
                      className="bg-input-background border-border/50"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground mb-2">Email</label>
                    <Input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com" 
                      className="bg-input-background border-border/50"
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-foreground mb-2">Service Interest</label>
                  <Input 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    placeholder="e.g., Web Development, Cybersecurity" 
                    className="bg-input-background border-border/50" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-foreground mb-2">Project Description</label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project, timeline, and requirements..."
                    rows={4}
                    className="bg-input-background border-border/50"
                    required
                  />
                </div>

                {submitStatus !== "idle" && (
                  <div className={`flex items-center gap-2 p-3 rounded-md ${
                    submitStatus === "success" ? "bg-green-50 text-green-700 border border-green-200" : 
                    "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                    {submitStatus === "success" ? 
                      <CheckCircle className="w-4 h-4" /> : 
                      <AlertCircle className="w-4 h-4" />
                    }
                    <span className="text-sm">{statusMessage}</span>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full md:w-auto" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}