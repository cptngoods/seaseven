import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Mail, Phone, AlertCircle, Check } from 'lucide-react';
import { cn } from '../lib/utils';

export const BookingSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tripType: 'day', // 'day' or 'charter'
    destination: 'Sopot',
    charterLength: '7',
    guests: '16',
    specialOccasion: 'None',
    message: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        if (!value) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      case 'message':
        if (!value) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  useEffect(() => {
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message)
    };
    setErrors(newErrors);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setIsSubmitted(true);
      // Optional: Scroll to the top of the section for the confirmation message
      document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isFormValid = !errors.name && !errors.email && !errors.message && formData.name && formData.email && formData.message;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
    },
  };

  return (
    <section id="inquiry" className="py-24 md:py-28 px-6 bg-linen grain-overlay overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-10"
          >
            <div className="space-y-8">
              <motion.span variants={itemVariants} className="text-rose uppercase tracking-[0.6em] text-[10px] font-bold block font-display seafarer-line">Inquiry</motion.span>
              <motion.h2 variants={itemVariants} className="text-6xl md:text-8xl font-serif font-semibold text-ocean leading-[0.9]">
                Start Your <br />
                <span className="text-rose font-serif italic lowercase tracking-normal">Journey.</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-2xl text-charcoal/70 leading-relaxed font-serif italic tracking-wide">
                We are currently in soft launch for the Polish coast, accepting early bookings for the upcoming season. 
                Fill out the form below or reach out directly for a bespoke quote.
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="pt-12 border-t border-ocean/5 flex flex-col sm:flex-row gap-12">
              <a href="tel:+48555777000" className="group flex items-center gap-4">
                <div className="p-3 bg-sage/5 rounded-full group-hover:bg-sage/10 transition-colors">
                  <Phone className="w-5 h-5 text-sage" />
                </div>
                <span className="text-ocean font-display font-bold text-[10px] uppercase tracking-widest group-hover:text-rose transition-colors">+48 555 777 000</span>
              </a>
              <a href="mailto:hello@seaseven.pl" className="group flex items-center gap-4">
                <div className="p-3 bg-rose/5 rounded-full group-hover:bg-rose/10 transition-colors">
                  <Mail className="w-5 h-5 text-rose" />
                </div>
                <span className="text-ocean font-display font-bold text-[10px] uppercase tracking-widest group-hover:text-rose transition-colors">hello@seaseven.pl</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 bg-ocean p-7 md:p-10 shadow-2xl border border-ocean/10 soft-shadow min-h-[560px] flex flex-col"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="booking-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  className="space-y-8" 
                  onSubmit={handleSubmit}
                >
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center px-2">
                        <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-linen/50 font-display">Full Name</label>
                        <AnimatePresence>
                          {touched.name && errors.name && (
                            <motion.span 
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="text-[8px] text-rose font-bold uppercase tracking-widest flex items-center gap-1"
                            >
                              <AlertCircle className="w-2.5 h-2.5" /> {errors.name}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="relative">
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={cn(
                            "w-full bg-linen/5 border p-4 focus:ring-1 outline-none font-serif italic text-lg text-linen placeholder:text-linen/20 transition-all duration-300",
                            touched.name && errors.name ? "border-rose/60 focus:ring-rose/30 bg-rose/[0.02]" : 
                            touched.name && !errors.name ? "border-sage/50 focus:ring-sage/30 bg-sage/[0.02]" : "border-linen/12 focus:ring-rose/20"
                          )} 
                          placeholder="e.g. Julian Alexander" 
                        />
                        {touched.name && !errors.name && (
                          <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center px-2">
                        <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-linen/50 font-display">Email Address</label>
                        <AnimatePresence>
                          {touched.email && errors.email && (
                            <motion.span 
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="text-[8px] text-rose font-bold uppercase tracking-widest flex items-center gap-1"
                            >
                              <AlertCircle className="w-2.5 h-2.5" /> {errors.email}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="relative">
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={cn(
                            "w-full bg-linen/5 border p-4 focus:ring-1 outline-none font-serif italic text-lg text-linen placeholder:text-linen/20 transition-all duration-300",
                            touched.email && errors.email ? "border-rose/60 focus:ring-rose/30 bg-rose/[0.02]" : 
                            touched.email && !errors.email ? "border-sage/50 focus:ring-sage/30 bg-sage/[0.02]" : "border-linen/12 focus:ring-rose/20"
                          )} 
                          placeholder="e.g. julian@sea-seven.pl" 
                        />
                        {touched.email && !errors.email && (
                          <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-linen/50 ml-2 font-display block">Special Occasion</label>
                      <div className="relative">
                        <select 
                          name="specialOccasion"
                          value={formData.specialOccasion}
                          onChange={handleChange}
                          className="w-full bg-linen/5 border border-linen/12 p-4 focus:ring-1 focus:ring-rose/20 outline-none appearance-none font-serif italic text-lg text-linen cursor-pointer transition-all h-[52px]"
                        >
                          <option>None</option>
                          <option>Birthday / Celebration</option>
                          <option>Anniversary</option>
                          <option>Corporate Event</option>
                          <option>Photo / Film Shoot</option>
                          <option>Other</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <div className="w-1.5 h-1.5 border-r border-b border-ocean/30 rotate-45" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div layout className="grid sm:grid-cols-2 gap-8 relative">
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-linen/50 ml-2 font-display">Destination</label>
                      <div className="relative">
                        <select 
                          name="destination"
                          value={formData.destination}
                          onChange={handleChange}
                          className="w-full bg-linen/5 border border-linen/12 p-4 focus:ring-1 focus:ring-rose/20 outline-none appearance-none font-serif italic text-lg text-linen cursor-pointer transition-all h-[52px]"
                        >
                          <option>Sopot Anchorage</option>
                          <option>Gdańsk Old Town</option>
                          <option>Gdynia Orłowo</option>
                          <option>Hel Peninsula</option>
                          <option>Puck Bay Area</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <div className="w-1.5 h-1.5 border-r border-b border-ocean/30 rotate-45" />
                        </div>
                      </div>
                    </div>

                    <motion.div layout className="space-y-3">
                      <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-linen/50 ml-2 font-display">Number of Guests</label>
                      <div className="relative">
                        <select 
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="w-full bg-linen/5 border border-linen/12 p-4 focus:ring-1 focus:ring-rose/20 outline-none appearance-none font-serif italic text-lg text-linen cursor-pointer transition-all h-[52px]"
                        >
                          {[...Array(16)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <div className="w-1.5 h-1.5 border-r border-b border-ocean/30 rotate-45" />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center px-2">
                      <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-linen/50 font-display">Message & Requests</label>
                      <AnimatePresence>
                        {touched.message && errors.message && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[8px] text-rose font-bold uppercase tracking-widest flex items-center gap-1"
                          >
                            <AlertCircle className="w-2.5 h-2.5" /> {errors.message}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="relative">
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={cn(
                          "w-full bg-linen/5 border p-4 focus:ring-1 outline-none h-32 font-serif italic text-lg text-linen placeholder:text-linen/20 transition-all duration-300 resize-none",
                          touched.message && errors.message ? "border-rose/60 focus:ring-rose/30 bg-rose/[0.02]" : 
                          touched.message && !errors.message ? "border-sage/50 focus:ring-sage/30 bg-sage/[0.02]" : "border-linen/12 focus:ring-rose/20"
                        )} 
                        placeholder="Share your vision for the journey..."
                      ></textarea>
                      {touched.message && !errors.message && (
                        <Check className="absolute right-4 bottom-4 w-4 h-4 text-sage" />
                      )}
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={!isFormValid}
                    className={cn(
                      "group relative w-full overflow-hidden py-6 rounded-sm text-[9px] uppercase tracking-[0.5em] font-bold font-display transition-all duration-700",
                      isFormValid ? "btn-gradient-animate text-ocean shadow-xl shadow-ocean/10" : "bg-linen/10 text-linen/30 cursor-not-allowed"
                    )}
                  >
                    <span className="relative z-10">Submit Inquiry</span>
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
                  className="flex flex-col items-center justify-center h-full text-center space-y-10 py-12"
                >
                  <div className="relative">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-24 h-24 bg-sage/10 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-12 h-12 text-sage" />
                    </motion.div>
                    <motion.div 
                      className="absolute inset-0 bg-sage/20 rounded-full -z-10"
                      animate={{ scale: [1, 1.4, 1.2], opacity: [0.5, 0, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-4xl font-display font-bold text-ocean uppercase tracking-tight">Thank You, {formData.name.split(' ')[0]}</h3>
                    <p className="text-xl text-charcoal/70 font-serif italic max-w-sm mx-auto">
                      Your inquiry has been received. Our concierge team will reach out within 24 hours to begin crafting your experience.
                    </p>
                  </div>

                  <div className="w-full max-w-sm bg-linen/30 border border-ocean/5 rounded-sm p-8 text-left space-y-6">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sage block border-b border-ocean/5 pb-4">Request Summary</span>
                    
                    <div className="grid grid-cols-2 gap-y-4">
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase tracking-widest text-ocean/40 font-bold">Experience</span>
                        <p className="text-sm font-display font-bold text-ocean uppercase">Day Trip</p>
                      </div>
                      <div className="space-y-1 text-right">
                        <span className="text-[8px] uppercase tracking-widest text-ocean/40 font-bold">Destination</span>
                        <p className="text-sm font-display font-bold text-ocean uppercase">
                          {formData.destination}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase tracking-widest text-ocean/40 font-bold">Guests</span>
                        <p className="text-sm font-display font-bold text-ocean uppercase">{formData.guests} Guests</p>
                      </div>
                      <div className="space-y-1 text-right">
                        <span className="text-[8px] uppercase tracking-widest text-ocean/40 font-bold">Occasion</span>
                        <p className="text-sm font-display font-bold text-ocean uppercase">{formData.specialOccasion}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-[9px] uppercase tracking-[0.4em] font-bold text-ocean/40 hover:text-rose transition-colors duration-300 underline underline-offset-8"
                  >
                    Edit your request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
