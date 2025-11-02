"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Form submitted! (This is a demo)");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-foreground">Full Name</Label>
        <Input type="text" id="name" placeholder="Your Name" required className="mt-1 bg-background border-border focus:ring-primary" />
      </div>
      <div>
        <Label htmlFor="email" className="text-foreground">Email Address</Label>
        <Input type="email" id="email" placeholder="your.email@example.com" required className="mt-1 bg-background border-border focus:ring-primary" />
      </div>
      <div>
        <Label htmlFor="subject" className="text-foreground">Subject</Label>
        <Input type="text" id="subject" placeholder="Regarding..." required className="mt-1 bg-background border-border focus:ring-primary" />
      </div>
      <div>
        <Label htmlFor="message" className="text-foreground">Message</Label>
        <Textarea id="message" placeholder="Your message here..." rows={5} required className="mt-1 bg-background border-border focus:ring-primary" />
      </div>
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Send Message</Button>
    </form>
  );
};
