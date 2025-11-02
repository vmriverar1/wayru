
"use client";

import { AppClientLayout } from '@/components/layout/AppClientLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

const BlogContent = () => {
  const { t } = useI18n();
  const pageTitle = t('pages.blog.title'); // Using translation key
  const blogPosts = [
    {
      id: "1",
      title: "The Future of Water: Innovations Shaping Tomorrow",
      date: "October 26, 2023",
      author: "Dr. Elena Aqua",
      excerpt: "Explore groundbreaking technologies like atmospheric water generation, AI-powered leak detection, and nanotech filtration that are revolutionizing how we access and manage water.",
      imageSrc: "/images/blog/blog1.jpg",
      aiHint: "futuristic water technology",
      authorImage: "/images/blog/author1.jpg"
    },
    {
      id: "2",
      title: "Community Voices: Stories from the Frontlines of Water Scarcity",
      date: "November 5, 2023",
      author: "Marco Rios",
      excerpt: "Hear directly from communities impacted by water scarcity and how local initiatives, supported by Wayru, are making a tangible difference in their daily lives.",
      imageSrc: "/images/blog/blog2.jpg",
      aiHint: "village people water",
      authorImage: "/images/blog/author2.jpg"
    },
    {
      id: "3",
      title: "A Drop of Hope: How Small Changes Create Big Waves in Water Conservation",
      date: "November 18, 2023",
      author: "Sofia Verde",
      excerpt: "Discover simple yet powerful tips for conserving water at home, in your garden, and in your community. Every drop saved contributes to a larger solution.",
      imageSrc: "/images/blog/blog3.jpg",
      aiHint: "water drop hand",
      authorImage: "/images/blog/author3.jpg"
    }
  ];

  return (
    <div>
      {/* Banner Section */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden">
        <Image
          src="/images/blog/banner.jpg"
          alt={pageTitle}
          fill
          className="object-cover"
          data-ai-hint="writing journalism"
        />
        <div className="absolute inset-0 bg-primary/60 flex flex-col justify-end items-center text-center pb-16 md:pb-20 lg:pb-24 px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <section className="bg-background text-foreground py-16 md:py-24">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Insights, stories, and updates on water conservation and our mission.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-card shadow-lg rounded-lg flex flex-col overflow-hidden transform transition-all hover:shadow-2xl duration-300">
                <Link href={`/blog/${post.id}`} className="block">
                  <div className="relative h-52 w-full">
                    <Image 
                      src={post.imageSrc}
                      alt={post.title}
                      fill
                      className="object-cover"
                      data-ai-hint={post.aiHint}
                    />
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <Link href={`/blog/${post.id}`} className="block mb-2">
                    <h3 className="text-xl font-semibold text-primary hover:underline">{post.title}</h3>
                  </Link>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center space-x-4 mb-3">
                    <div className="flex items-center">
                      <CalendarDays size={14} className="mr-1" /> {post.date}
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-5 w-5 mr-1">
                        <AvatarImage src={post.authorImage} alt={post.author} />
                        <AvatarFallback>{post.author.substring(0,1)}</AvatarFallback>
                      </Avatar>
                      {post.author}
                    </div>
                  </div>
                  <p className="text-sm text-foreground flex-grow">
                    {post.excerpt}
                  </p>
                </div>
                <div className="border-t p-4 mt-auto">
                  <Button asChild variant="link" className="p-0 h-auto text-primary">
                    <Link href={`/blog/${post.id}`}>Read More &rarr;</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default function BlogPage() {
  return (
    <AppClientLayout>
      <BlogContent />
    </AppClientLayout>
  );
}

// You would also create a dynamic route src/app/blog/[id]/page.tsx for individual blog posts.
// This is just the listing page.
