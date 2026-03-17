"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  if (submitted) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-primary font-medium mt-12"
      >
        You&apos;re on the list. We&apos;ll be in touch.
      </motion.p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 flex flex-col sm:flex-row gap-4 max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter institutional email"
        required
        className="flex-1 bg-transparent border-b border-foreground/20 py-3 focus:border-primary outline-none transition-colors font-display text-sm placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        className="bg-foreground text-background px-6 py-3 rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-300 text-sm active:translate-y-px"
      >
        Join Waitlist
      </button>
    </form>
  );
};

export default WaitlistForm;
