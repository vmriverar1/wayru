"use client";

import { AppClientLayout } from '@/components/layout/AppClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/hooks/useI18n';

const PrivacyPolicyContent = () => {
  const { t } = useI18n(); // Hook for translations
  const pageTitle = t('pages.privacyPolicy.title');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 md:pt-32">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-bold text-primary text-center">{pageTitle}</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none text-foreground">
          <p>
            This is the Privacy Policy page. Replace this content with your actual privacy policy.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h2 className="text-2xl font-semibold text-primary mt-6 mb-3">Information We Collect</h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
            eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <h2 className="text-2xl font-semibold text-primary mt-6 mb-3">How We Use Your Information</h2>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui 
            ratione voluptatem sequi nesciunt.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default function PrivacyPolicyPage() {
  return (
    <AppClientLayout>
      <PrivacyPolicyContent />
    </AppClientLayout>
  );
}
