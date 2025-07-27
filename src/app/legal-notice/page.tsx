
import { AppClientLayout } from '@/components/layout/AppClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/hooks/useI18n';

const LegalNoticeContent = () => {
  const { t } = useI18n(); 
  const pageTitle = t('pages.legalNotice.title');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 md:pt-32">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-bold text-primary text-center">{pageTitle}</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none text-foreground">
          <p>
            This is the Legal Notice page. Replace this content with your actual legal notice.
          </p>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti 
            quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia 
            deserunt mollitia animi, id est laborum et dolorum fuga.
          </p>
          <h2 className="text-2xl font-semibold text-primary mt-6 mb-3">Terms of Service</h2>
          <p>
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque 
            nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
          </p>
          <h2 className="text-2xl font-semibold text-primary mt-6 mb-3">Disclaimer</h2>
          <p>
            Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae 
            sint et molestiae non recusandae.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default function LegalNoticePage() {
  return (
    <AppClientLayout>
      <LegalNoticeContent />
    </AppClientLayout>
  );
}
