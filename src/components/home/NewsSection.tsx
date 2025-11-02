
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const newsData = [
  {
    id: 'news1',
    titleKey: 'newsSection.item1.title',
    subtitleKey: 'newsSection.item1.subtitle',
    link: 'https://elcomercio.pe/somos/historias/enco-por-una-ciudad-mas-feliz-dos-mujeres-dos-proyectos-y-el-objetivo-de-hacer-una-lima-mas-accesible-al-agua-potable-y-la-energia-solar-notfds-noticia/',
    imageSrc: '/images/news/news1.jpg',
    aiHint: 'city happiness water',
  },
  {
    id: 'news2',
    titleKey: 'newsSection.item2.title',
    subtitleKey: 'newsSection.item2.subtitle',
    link: 'https://dfsud.com/tecnologia-y-startup/catherine-romani-la-emprendedora-que-combate-la-crisis-hidrica-en-peru',
    imageSrc: '/images/news/news2.jpg',
    aiHint: 'entrepreneur water crisis',
  },
  {
    id: 'news3',
    titleKey: 'newsSection.item3.title',
    subtitleKey: 'newsSection.item3.subtitle',
    link: 'https://andina.pe/agencia/noticia-innovadoras-peruanas-crean-una-ducha-portatil-no-necesita-tuberias-ni-electricidad-979461.aspx',
    imageSrc: '/images/news/news3.jpg',
    aiHint: 'portable shower innovation',
  },
  {
    id: 'news4',
    titleKey: 'newsSection.item4.title',
    subtitleKey: 'newsSection.item4.subtitle',
    link: 'https://rpp.pe/campanas/contenido-patrocinado/conoce-wayru-peru-e-iway-iniciativas-peruanas-de-jovenes-agentes-de-cambio-noticia-1508026#:~:text=Por%20sus%20innovadoras%20propuestas%20con,cuenta%20con%20Naciones%20Unidas%20como',
    imageSrc: '/images/news/news4.jpg',
    aiHint: 'award young innovators',
  },
  {
    id: 'news5',
    titleKey: 'newsSection.item5.title',
    subtitleKey: 'newsSection.item5.subtitle',
    link: 'https://www.rcrperu.com/finalista-de-perumin-inspira-2023-wayru-peru-atiende-problema-de-acceso-limitado-al-agua',
    imageSrc: '/images/news/news5.jpg',
    aiHint: 'water access solution',
  },
  {
    id: 'news6',
    titleKey: 'newsSection.item6.title',
    subtitleKey: 'newsSection.item6.subtitle',
    link: 'https://diariocorreo.pe/peru/startup-peruana-crea-ducha-portatil-que-ahorra-90-de-agua-wayru-noticia/?ref=dcr',
    imageSrc: '/images/news/news6.jpg',
    aiHint: 'international conference water',
  },
  {
    id: 'news7',
    titleKey: 'newsSection.item7.title',
    subtitleKey: 'newsSection.item7.subtitle',
    link: 'https://www.publimetro.pe/noticias/2023/03/06/la-ducha-portatil-llego-para-revolucionar-la-higiene-en-los-hogares-peruanos/',
    imageSrc: '/images/news/news7.jpg',
    aiHint: 'hygiene revolution home',
  },
  {
    id: 'news8',
    titleKey: 'newsSection.item8.title',
    subtitleKey: 'newsSection.item8.subtitle',
    link: 'https://www.asme.org/about-asme/media-inquiries/press-releases/entrepreneurs-from-the-u-s-and-peru-earn-places-in-annual-asme-ishow-cohort-with-accessible-clean-energy-and-water-innovations',
    imageSrc: '/images/news/news8.jpg',
    aiHint: 'engineering innovation award',
  },
  {
    id: 'news9',
    titleKey: 'newsSection.item9.title',
    subtitleKey: 'newsSection.item9.subtitle',
    link: 'https://larepublica.pe/sociedad/2022/06/08/municipalidad-de-lima-geografa-peruana-gano-concurso-internacional-por-proyecto-de-duchas-portatiles',
    imageSrc: '/images/news/news9.jpg',
    aiHint: 'geographer award water',
  },
  {
    id: 'news10',
    titleKey: 'newsSection.item10.title',
    subtitleKey: 'newsSection.item10.subtitle',
    link: 'https://www.youtube.com/watch?t=43m36s&v=Ez2v5E6TLas&feature=youtu.be',
    imageSrc: '/images/news/news10.jpg',
    aiHint: 'tv peru interview',
  },
  {
    id: 'news11',
    titleKey: 'newsSection.item11.title',
    subtitleKey: 'newsSection.item11.subtitle',
    link: 'https://puntoedu.pucp.edu.pe/orgullo-pucp/alumnas-y-egresada-pucp-son-las-creadoras-de-wayru-proyecto-que-obtuvo-el-primer-lugar-en-la-e-hackathon-del-bid/',
    imageSrc: '/images/news/news11.jpg',
    aiHint: 'university project award',
  },
];

export function NewsSection() {
  const { t } = useI18n();

  return (
    <section id="news-section" className="bg-background text-foreground py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          {t('newsSection.mainTitle')}
        </h2>
        <Separator className="w-20 h-1 bg-primary mx-auto mb-4" />
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          {t('newsSection.mainSubtitle')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {newsData.map((news) => (
            <Card key={news.id} className="flex flex-col rounded-lg shadow-lg transform transition-all hover:shadow-2xl duration-300">
              <div className="relative w-full aspect-[4/3]"> {/* Image container */}
                <Image
                  src={news.imageSrc}
                  alt={t(news.titleKey)}
                  fill
                  className="object-cover rounded-t-lg" // Image covers this div
                  data-ai-hint={news.aiHint}
                />
              </div>
              
              {/* Overlapping white content box */}
              <div className="relative bg-background p-3 md:p-4 shadow-lg 
                              w-11/12 
                              self-end 
                              -mt-10 md:-mt-12 lg:-mt-14 
                              mr-2 sm:mr-3 
                              z-10 rounded-md text-left
                              flex flex-col">
                <h3 className="text-sm md:text-base font-semibold text-primary mb-1 leading-tight min-h-[3em] flex items-center">
                  {t(news.titleKey)}
                </h3>
                <p className="text-xs text-muted-foreground mb-3 leading-snug min-h-[2.5em] flex items-center">
                  {t(news.subtitleKey)}
                </p>
                <div className="mt-auto"> {/* Pushes button to bottom of this box */}
                  <Button 
                    asChild 
                    variant="default" 
                    size="sm" 
                    className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 text-xs h-7 leading-none"
                  >
                    <Link href={news.link} target="_blank" rel="noopener noreferrer">
                      {t('newsSection.readMoreButton')}
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
