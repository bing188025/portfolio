"use client"

import { ScrollAnimation } from './scroll-animation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Facebook, 
  Instagram,
  Send,
  ArrowUpRight
} from 'lucide-react'

const socialLinks = [
  { name: "Email", icon: Mail, href: "mailto:hello@example.com", label: "hello@example.com" },
  { name: "Phone", icon: Phone, href: "tel:+1234567890", label: "+1 (234) 567-890" },
  { name: "LinkedIn", icon: Linkedin, href: "#", label: "linkedin.com/in/developer" },
  { name: "GitHub", icon: Github, href: "#", label: "github.com/developer" },
  { name: "Facebook", icon: Facebook, href: "#", label: "facebook.com/developer" },
  { name: "Instagram", icon: Instagram, href: "#", label: "@developer" },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-24 lg:py-32 relative">
      {/* Background accents */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-chart-2/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Get In Touch</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-balance">
              {"Let's Build Something"}
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent"> Powerful Together</span>
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
            <div className="glass border border-border rounded-2xl p-6 lg:p-8">
              <h3 className="text-xl font-semibold mb-6 text-foreground">Send a Message</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                      Name
                    </label>
                    <Input 
                      id="name"
                      placeholder="Your name"
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                      Email
                    </label>
                    <Input 
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-2">
                    Subject
                  </label>
                  <Input 
                    id="subject"
                    placeholder="Project inquiry"
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                    Message
                  </label>
                  <Textarea 
                    id="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="bg-background/50 border-border focus:border-primary resize-none"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg group"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </ScrollAnimation>

          {/* Contact Info */}
          <ScrollAnimation delay={200}>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Contact Information</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Feel free to reach out through any of these channels. 
                  {"I'm"} typically responsive within 24 hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="group flex items-center gap-4 p-4 rounded-xl glass border border-border hover:border-primary/30 transition-all"
                  >
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <link.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground">{link.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{link.label}</div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>

              {/* Availability Card */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-chart-2/10 border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-semibold text-foreground">Currently Available</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
