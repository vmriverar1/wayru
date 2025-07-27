
"use client";

import { AppClientLayout } from '@/components/layout/AppClientLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useI18n } from '@/hooks/useI18n';
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from 'react';
import { format } from "date-fns";
import { es } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const ComplaintsBookContent = () => {
  const { t, locale } = useI18n();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const dateLocale = locale === 'es' ? es : undefined;
    setCurrentDate(format(new Date(), "PPP", { locale: dateLocale }));
  }, [locale]);

  const createFormSchema = (t: Function) => z.object({
    fullName: z.string().min(1, { message: t('pages.complaintsBook.fieldRequiredError') }),
    documentType: z.enum(['DNI', 'Pasaporte', 'Carnet de extranjería', 'RUC'], {
      required_error: t('pages.complaintsBook.fieldRequiredError'),
    }),
    documentNumber: z.string().min(1, { message: t('pages.complaintsBook.fieldRequiredError') }),
    email: z.string().email({ message: t('pages.complaintsBook.invalidEmailError') }).min(1, { message: t('pages.complaintsBook.fieldRequiredError') }),
    address: z.string().optional(),
    phone: z.string().optional(),
    representative: z.string().optional(),
    isProduct: z.boolean().default(false),
    isService: z.boolean().default(false),
    acquisitionDate: z.date({
      required_error: t('pages.complaintsBook.fieldRequiredError'),
    }),
    itemDescription: z.string().min(1, { message: t('pages.complaintsBook.fieldRequiredError') }),
    claimComplaintType: z.enum(['Reclamo', 'Queja'], {
      required_error: t('pages.complaintsBook.fieldRequiredError'),
    }),
    claimDetail: z.string().min(1, { message: t('pages.complaintsBook.fieldRequiredError') }),
    signatureFile: z.any().optional(),
  }).refine(data => data.isProduct || data.isService, {
    message: t('pages.complaintsBook.selectAtLeastOneError'),
    path: ['isProduct'], // Checkbox group validation, path indicates where to show error
  });

  type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

  const form = useForm<FormValues>({
    resolver: zodResolver(createFormSchema(t)),
    defaultValues: {
      fullName: "",
      documentNumber: "",
      email: "",
      address: "",
      phone: "",
      representative: "",
      isProduct: false,
      isService: false,
      itemDescription: "",
      claimDetail: "",
    },
  });

  const handleNext = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      setCurrentStep(2);
    } else {
      // Focus on the first error field if possible
      const fieldErrors = form.formState.errors;
      const firstErrorField = Object.keys(fieldErrors)[0] as keyof FormValues | undefined;
      if (firstErrorField) {
        form.setFocus(firstErrorField);
      }
    }
  };

  const onSubmit = (data: FormValues) => {
    const year = new Date().getFullYear();
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const caseNumber = `${year}-${randomNumber.toString().padStart(4, '0')}`;
    const claimType = data.claimComplaintType === 'Reclamo' ? t('pages.complaintsBook.claimTypes.claimShort') : t('pages.complaintsBook.claimTypes.complaintShort');

    console.log("Form Data:", data);
    console.log("Generated Case Number:", caseNumber);

    toast({
      title: t('pages.complaintsBook.submissionSuccessTitle'),
      description: t('pages.complaintsBook.submissionSuccessMessage', { claimType: claimType, caseNumber: caseNumber }),
      variant: "default",
      duration: 9000,
    });
    form.reset();
    setCurrentStep(1);
  };

  return (
    <div className="bg-primary min-h-screen"> {/* Added bg-primary and min-h-screen here */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 md:pt-32"> {/* This div will be primary background */}
        <Card className="shadow-xl max-w-3xl mx-auto bg-card"> {/* Card remains bg-card (white) */}
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold text-primary">{t('pages.complaintsBook.mainTitle')}</CardTitle>
            <CardDescription className="text-muted-foreground pt-2">
              {t('pages.complaintsBook.introText1')}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-foreground">
            <div className="text-center text-sm text-muted-foreground mb-6">
              <p>{t('pages.complaintsBook.companyNameRUC')}</p>
              <p>{t('pages.complaintsBook.companyLocation')}</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {currentStep === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label className="font-semibold text-primary">{t('pages.complaintsBook.formTitle')}</Label>
                      <div className="text-sm">
                        <span className="font-medium">{t('pages.complaintsBook.dateLabel')}:</span> {currentDate}
                      </div>
                    </div>

                    {/* Section 1 */}
                    <div className="space-y-4 p-4 border rounded-md bg-card">
                      <h3 className="font-semibold text-lg text-primary">{t('pages.complaintsBook.section1Title')}</h3>
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('pages.complaintsBook.fullNameLabel')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('pages.complaintsBook.fullNamePlaceholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="documentType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>{t('pages.complaintsBook.idDocumentTypeLabel')}</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                              >
                                {(['DNI', 'Pasaporte', 'Carnet de extranjería', 'RUC'] as const).map(option => (
                                  <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value={option} />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {t(`pages.complaintsBook.idOptions.${option.toLowerCase().replace(' ', '').replace('ó', 'o').replace('í', 'i')}`)}
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="documentNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('pages.complaintsBook.idNumberLabel')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('pages.complaintsBook.idNumberPlaceholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('pages.complaintsBook.emailLabel')}</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder={t('pages.complaintsBook.emailPlaceholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('pages.complaintsBook.addressLabel')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('pages.complaintsBook.addressPlaceholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('pages.complaintsBook.phoneLabel')}</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder={t('pages.complaintsBook.phonePlaceholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="representative"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('pages.complaintsBook.representativeLabel')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('pages.complaintsBook.representativePlaceholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Section 2 */}
                    <div className="space-y-4 p-4 border rounded-md bg-card">
                      <h3 className="font-semibold text-lg text-primary">{t('pages.complaintsBook.section2Title')}</h3>
                      <FormItem>
                        <FormLabel>{t('pages.complaintsBook.relatedToLabel')}</FormLabel>
                        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 pt-1">
                          <FormField
                            control={form.control}
                            name="isProduct"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    {t('pages.complaintsBook.relatedOptions.product')}
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="isService"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    {t('pages.complaintsBook.relatedOptions.service')}
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                        {form.formState.errors.isProduct && <FormMessage>{form.formState.errors.isProduct.message}</FormMessage>}
                      </FormItem>
                      <FormField
                        control={form.control}
                        name="acquisitionDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>{t('pages.complaintsBook.acquisitionDateLabel')}</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP", { locale: locale === 'es' ? es : undefined })
                                    ) : (
                                      <span>{t('pages.complaintsBook.datePlaceholder')}</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                  locale={locale === 'es' ? es : undefined}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="itemDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('pages.complaintsBook.descriptionLabel')}</FormLabel>
                            <FormControl>
                              <Textarea placeholder={t('pages.complaintsBook.descriptionPlaceholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Section 3 */}
                    <div className="space-y-4 p-4 border rounded-md bg-card">
                      <h3 className="font-semibold text-lg text-primary">{t('pages.complaintsBook.section3Title')}</h3>
                       <FormField
                        control={form.control}
                        name="claimComplaintType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>{t('pages.complaintsBook.claimTypeLabel')}</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-2"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="Reclamo" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {t('pages.complaintsBook.claimTypes.claim')}
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="Queja" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {t('pages.complaintsBook.claimTypes.complaint')}
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="claimDetail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('pages.complaintsBook.claimDetailLabel')}</FormLabel>
                            <FormControl>
                              <Textarea rows={5} placeholder={t('pages.complaintsBook.claimDetailPlaceholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="signatureFile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('pages.complaintsBook.signatureLabel')}</FormLabel>
                            <FormControl>
                               <Input type="file" onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} className="block w-full text-sm text-foreground file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"/>
                            </FormControl>
                             <FormDescription>{t('pages.complaintsBook.signatureHelpText')}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="button" onClick={handleNext} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      {t('pages.complaintsBook.nextButton')}
                    </Button>
                  </>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6 p-4 border rounded-md bg-card text-sm">
                    <p>{t('pages.complaintsBook.postNextText1')}</p>
                    <p>{t('pages.complaintsBook.postNextText2')}</p>
                    <p>{t('pages.complaintsBook.postNextText3')}</p>
                    <p className="font-semibold">{t('pages.complaintsBook.postNextText4')}</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} className="w-full sm:w-auto">
                        {t('pages.complaintsBook.backButton')}
                      </Button>
                      <Button type="submit" className="w-full sm:w-auto flex-grow bg-primary hover:bg-primary/90 text-primary-foreground">
                        {t('pages.complaintsBook.sendButton')}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function ComplaintsBookPage() {
  return (
    <AppClientLayout>
      <ComplaintsBookContent />
    </AppClientLayout>
  );
}
