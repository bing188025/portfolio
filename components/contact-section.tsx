"use client"

import { useForm, ValidationError } from '@formspree/react'
import { ScrollAnimation } from './scroll-animation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Mail, 
  Linkedin, 
  Github, 
  Facebook, 
  Instagram,
  Send,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/masterAI359", label: "github.com/masterAI359" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/masterAI359", label: "linkedin" },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/masterAI359", label: "facebook" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/masterAI359", label: "instagram" },
]

export function ContactSection() {
  const [state, handleSubmit] = useForm('mlgoajnz')

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Hand scrolling on smartphone at night — Pixabay #169445 (man's hand, dark room, 4K, no face) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0, opacity: 0.35 }}
      >
        <source
          src="https://cdn.pixabay.com/video/2023/06/30/169445-841382824_large.mp4"
          type="video/mp4"
        />
        <source
          src="https://cdn.pixabay.com/video/2024/03/04/202987-919379330_large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Vignette scrim */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse at 60% 50%, rgba(5,8,20,0.30) 0%, rgba(5,8,20,0.75) 60%, rgba(5,8,20,0.97) 100%)',
        }}
      />
      {/* Top/bottom edge fades */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(5,8,20,0.92) 0%, rgba(5,8,20,0.08) 15%, rgba(5,8,20,0.08) 85%, rgba(5,8,20,0.96) 100%)',
        }}
      />
      {/* Subtle cyan tint to tie into site palette */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse at 65% 55%, rgba(0,200,220,0.06) 0%, transparent 55%)',
        }}
      />

      {/* Background accents */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/12 rounded-full blur-3xl" style={{ zIndex: 2 }} />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-chart-2/10 rounded-full blur-3xl" style={{ zIndex: 2 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 3 }}>
        <ScrollAnimation>
          <div className="text-center mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Get In Touch</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-balance">
              {"Let's Build Something"}
              <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent"> Powerful Together</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ready to bring your AI project to life? {"I'd"} love to hear about your ideas 
              and explore how we can create something exceptional.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <ScrollAnimation delay={100}>
            <div className="glass border border-border/60 rounded-2xl p-6 lg:p-8 shadow-xl shadow-black/30">
              <h3 className="text-xl font-semibold mb-6 text-foreground">Send a Message</h3>

              {state.succeeded ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <CheckCircle2 className="h-14 w-14 text-green-400" />
                  <p className="text-lg font-semibold text-foreground">Message sent!</p>
                  <p className="text-foreground/60 text-sm">{"I'll"} get back to you within 24 hours.</p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-2">
                        Name
                      </label>
                      <Input 
                        id="name"
                        name="name"
                        required
                        placeholder="Your name"
                        className="bg-background/70 border-border/60 focus:border-primary focus:ring-primary/20 placeholder:text-foreground/30"
                      />
                      <ValidationError field="name" errors={state.errors} className="mt-1 text-xs text-red-400" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-2">
                        Email
                      </label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="bg-background/70 border-border/60 focus:border-primary focus:ring-primary/20 placeholder:text-foreground/30"
                      />
                      <ValidationError field="email" errors={state.errors} className="mt-1 text-xs text-red-400" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground/70 mb-2">
                      Subject
                    </label>
                    <Input 
                      id="subject"
                      name="subject"
                      placeholder="Project inquiry"
                      className="bg-background/70 border-border/60 focus:border-primary focus:ring-primary/20 placeholder:text-foreground/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground/70 mb-2">
                      Message
                    </label>
                    <Textarea 
                      id="message"
                      name="message"
                      required
                      placeholder="Tell me about your project..."
                      rows={5}
                      className="bg-background/70 border-border/60 focus:border-primary focus:ring-primary/20 placeholder:text-foreground/30 resize-none"
                    />
                    <ValidationError field="message" errors={state.errors} className="mt-1 text-xs text-red-400" />
                  </div>
                  {state.errors && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <ValidationError errors={state.errors} />
                    </div>
                  )}
                  <Button 
                    type="submit"
                    disabled={state.submitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg group shadow-lg shadow-primary/20 disabled:opacity-60"
                  >
                    {state.submitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              )}
            </div>
          </ScrollAnimation>

          {/* Contact Info */}
          <ScrollAnimation delay={200}>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Contact Information</h3>
                <p className="text-foreground/60 leading-relaxed">
                  Feel free to reach out through any of these channels. 
                  {"I'm"} typically responsive within 24 hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="group flex items-center gap-4 p-4 rounded-xl glass border border-border/60 hover:border-primary/40 transition-all shadow-md shadow-black/20"
                  >
                    <div className="p-3 rounded-xl bg-primary/15 text-primary group-hover:bg-primary/25 transition-colors shadow-sm shadow-primary/10">
                      <link.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground">{link.name}</div>
                      <div className="text-xs text-foreground/50 truncate">{link.label}</div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>

              {/* Availability Card */}
              <div className="p-6 rounded-xl bg-linear-to-br from-primary/12 to-chart-2/10 border border-primary/25 shadow-lg shadow-primary/5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-sm shadow-green-400/50" />
                  <span className="font-semibold text-foreground">Currently Available</span>
                </div>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  Open for freelance projects, consulting, and full-time opportunities. 
                  {"Let's"} discuss how I can contribute to your team or project.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
