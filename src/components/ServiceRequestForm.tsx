import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Send, CheckCircle, AlertCircle, Zap } from "lucide-react";
import { ServiceRequestService } from "../utils/database/services";

interface ServiceRequestFormProps {
  serviceName: string;
  className?: string;
}

export default function ServiceRequestForm({ serviceName, className = "" }: ServiceRequestFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: serviceName,
    projectType: "",
    budget: "",
    timeline: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Budget ranges in South African Rands (ZAR)
  const budgetRanges = [
    "R90,000 - R280,000",
    "R280,000 - R900,000", 
    "R900,000 - R1,800,000",
    "R1,800,000 - R4,500,000",
    "R4,500,000+"
  ];

  const timelineOptions = [
    "1-2 months",
    "3-4 months",
    "5-6 months",
    "6+ months",
    "Ongoing support"
  ];

  const projectTypes = {
    "Software Development": ["Web Application", "Desktop Software", "API Development", "Database Design", "System Integration"],
    "Web Development": ["Corporate Website", "E-commerce Platform", "Web Application", "CMS Development", "Landing Pages"],
    "Cybersecurity": ["Security Audit", "Penetration Testing", "Compliance Assessment", "Security Training", "Incident Response"],
    "Game Development": ["Mobile Game", "PC Game", "Console Game", "VR/AR Experience", "Game Porting"],
    "Cloud Solutions": ["Cloud Migration", "Infrastructure Setup", "DevOps Implementation", "Monitoring & Analytics", "Backup Solutions"],
    "Mobile Apps": ["iOS App", "Android App", "Cross-platform App", "App Redesign", "App Maintenance"]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Save service request to database
      await ServiceRequestService.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service_type: `${formData.service} - ${formData.projectType}`,
        budget: formData.budget,
        timeline: formData.timeline,
        description: formData.description
      });

      setSubmitStatus("success");
      setStatusMessage("Thank you! We'll review your request and get back to you within 24 hours with a detailed proposal.");
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: serviceName,
        projectType: "",
        budget: "",
        timeline: "",
        description: ""
      });
    } catch (error) {
      console.error("Service request submission error:", error);
      setSubmitStatus("error");
      setStatusMessage("Sorry, there was an error submitting your request. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={className}
    >
      <Card className="border-2 border-border/50 shadow-xl bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <CardTitle 
            className="text-2xl md:text-3xl text-foreground font-bold"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            Request {serviceName} Service
          </CardTitle>
          <p 
            className="text-muted-foreground font-light mt-2"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            Tell us about your project and we'll provide a detailed proposal within 24 hours.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
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
                <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                <Input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@company.com" 
                  className="bg-input-background border-border/50"
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                <Input 
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your company name" 
                  className="bg-input-background border-border/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                <Input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+27 123 456 789" 
                  className="bg-input-background border-border/50"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-4">
              <h3 
                className="text-lg font-semibold text-foreground border-b border-border/50 pb-2"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                Project Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Project Type</label>
                  <Select onValueChange={handleSelectChange('projectType')}>
                    <SelectTrigger className="bg-input-background border-border/50">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes[serviceName as keyof typeof projectTypes]?.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Budget Range</label>
                  <Select onValueChange={handleSelectChange('budget')}>
                    <SelectTrigger className="bg-input-background border-border/50">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem key={range} value={range}>{range}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Timeline</label>
                <Select onValueChange={handleSelectChange('timeline')}>
                  <SelectTrigger className="bg-input-background border-border/50">
                    <SelectValue placeholder="Select project timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {timelineOptions.map((timeline) => (
                      <SelectItem key={timeline} value={timeline}>{timeline}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Project Description *</label>
                <Textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your project requirements, goals, and any specific features you need..."
                  rows={5}
                  className="bg-input-background border-border/50"
                  required
                />
              </div>
            </div>

            {/* Status Message */}
            {submitStatus !== "idle" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-3 p-4 rounded-lg ${
                  submitStatus === "success" 
                    ? "bg-green-50 text-green-700 border border-green-200" 
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {submitStatus === "success" ? (
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                )}
                <div className="text-sm leading-relaxed">{statusMessage}</div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                type="submit" 
                size="lg" 
                className="w-full btn-gradient-blue h-14 text-lg font-medium tracking-wide"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting Request...
                  </div>
                ) : (
                  <>
                    Submit Service Request
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </motion.div>

            <p 
              className="text-xs text-muted-foreground text-center leading-relaxed"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              By submitting this form, you agree to our terms of service. We'll contact you within 24 hours 
              to discuss your project in detail and provide a comprehensive proposal.
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}