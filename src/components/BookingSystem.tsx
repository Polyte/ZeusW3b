import { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Label } from './ui/label';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingSystem({ isOpen, onClose }: BookingSystemProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const services = [
    'Web Development Consultation',
    'Software Development Strategy',
    'Cybersecurity Assessment',
    'Game Development Planning',
    'General Technology Consultation'
  ];

  const timeSlots: TimeSlot[] = [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: false },
    { time: '13:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: false },
    { time: '17:00', available: true }
  ];

  const handleSubmit = async () => {
    // Here you would send to backend
    console.log('Booking:', { selectedDate, selectedTime, ...formData });
    setSubmitted(true);
    
    setTimeout(() => {
      onClose();
      setStep(1);
      setSubmitted(false);
      setSelectedDate('');
      setSelectedTime('');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    }, 3000);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Booking Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-background border border-border rounded-lg shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
          >
            {submitted ? (
              // Success State
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <CheckCircle className="h-20 w-20 mx-auto text-green-500 mb-4" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                  Booking Confirmed!
                </h2>
                <p className="text-muted-foreground mb-4">
                  We've received your consultation request for {selectedDate} at {selectedTime}.
                  A confirmation email has been sent to {formData.email}.
                </p>
                <p className="text-sm text-muted-foreground">
                  Our team will reach out to you shortly to confirm the details.
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="p-6 border-b border-border">
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                    Book a Consultation
                  </h2>
                  <p className="text-muted-foreground">
                    Schedule a free consultation with our experts
                  </p>

                  {/* Progress Steps */}
                  <div className="flex items-center gap-2 mt-4">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center flex-1">
                        <div
                          className={`h-2 rounded-full flex-1 transition-colors ${
                            s <= step ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Step 1: Select Service & Date */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <Label htmlFor="service" className="mb-2 flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Select Service
                        </Label>
                        <select
                          id="service"
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full p-2 border border-border rounded-lg bg-background"
                        >
                          <option value="">Choose a service...</option>
                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="date" className="mb-2 flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Select Date
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          min={getMinDate()}
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Select Time */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <Label className="mb-3 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Select Time Slot
                      </Label>
                      <div className="grid grid-cols-4 gap-3">
                        {timeSlots.map((slot) => (
                          <Button
                            key={slot.time}
                            variant={selectedTime === slot.time ? 'default' : 'outline'}
                            onClick={() => slot.available && setSelectedTime(slot.time)}
                            disabled={!slot.available}
                            className="h-12"
                          >
                            {slot.time}
                          </Button>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        Times are shown in SAST (South African Standard Time)
                      </p>
                    </motion.div>
                  )}

                  {/* Step 3: Contact Information */}
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="name" className="mb-2 flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="mb-2 flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="mb-2 flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+27 12 345 6789"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message" className="mb-2">
                          Additional Information (Optional)
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your project or any specific requirements..."
                          rows={4}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border flex justify-between">
                  <Button variant="outline" onClick={step === 1 ? onClose : () => setStep(step - 1)}>
                    {step === 1 ? 'Cancel' : 'Back'}
                  </Button>
                  <Button
                    onClick={() => {
                      if (step < 3) {
                        setStep(step + 1);
                      } else {
                        handleSubmit();
                      }
                    }}
                    disabled={
                      (step === 1 && (!formData.service || !selectedDate)) ||
                      (step === 2 && !selectedTime) ||
                      (step === 3 && (!formData.name || !formData.email || !formData.phone))
                    }
                  >
                    {step === 3 ? 'Confirm Booking' : 'Next'}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
