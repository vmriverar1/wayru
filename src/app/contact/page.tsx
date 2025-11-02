import { AppClientLayout } from '@/components/layout/AppClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPinIcon } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';

const ContactContent = () => {
  const pageTitle = "Contact Us";

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 md:pt-32">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">{pageTitle}</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">We'd love to hear from you. Reach out with any questions, inquiries, or partnership ideas.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <Card className="shadow-xl bg-card">
          <CardHeader>
            <CardTitle className="text-2xl text-card-foreground">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
        
        <Card className="shadow-xl bg-card">
          <CardHeader>
            <CardTitle className="text-2xl text-card-foreground">Our Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-3">
              <MapPinIcon className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Address</h3>
                <p className="text-muted-foreground">123 Aqua Street, Hydro City, HC 12345, Peru</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Email</h3>
                <a href="mailto:info@wayru.pe" className="text-muted-foreground hover:text-primary">info@wayru.pe</a>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Phone</h3>
                <a href="tel:+51123456789" className="text-muted-foreground hover:text-primary">+51 123 456 789</a>
              </div>
            </div>
            <div className="mt-6 border-t pt-6">
              <h3 className="font-semibold text-foreground mb-2">Office Hours</h3>
              <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM (PET)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function ContactPage() {
  return (
    <AppClientLayout>
      <ContactContent />
    </AppClientLayout>
  );
}
