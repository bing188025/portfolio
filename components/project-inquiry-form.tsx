'use client'

import { type FormEvent, type ReactNode, useMemo, useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { AlertCircle, CheckCircle2, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { SITE_CONFIG } from '@/lib/config'
import {
  budgetRanges,
  preferredContactMethods,
  services,
  timelineOptions,
} from '@/lib/site-data'
import { cn } from '@/lib/utils'

type Errors = Record<string, string>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ProjectInquiryForm({ compact = false }: { compact?: boolean }) {
  const [state, handleSubmit] = useForm(SITE_CONFIG.formspreeId)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [preferredContact, setPreferredContact] = useState('Email')
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Errors>({})

  const serviceTitles = useMemo(() => services.map((service) => service.title), [])

  const toggleService = (title: string) => {
    setSelectedServices((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title],
    )
  }

  const validate = (form: HTMLFormElement) => {
    const formData = new FormData(form)
    const nextErrors: Errors = {}
    const fullName = String(formData.get('fullName') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const company = String(formData.get('company') ?? '').trim()
    const projectSummary = String(formData.get('projectSummary') ?? '').trim()
    const goals = String(formData.get('goals') ?? '').trim()

    if (!fullName) nextErrors.fullName = 'Please enter your full name.'
    if (!emailPattern.test(email)) nextErrors.email = 'Please enter a valid business email.'
    if (!company) nextErrors.company = 'Please enter your company or organization name.'
    if (selectedServices.length === 0) nextErrors.serviceCategories = 'Select at least one service category.'
    if (!budget) nextErrors.budgetRange = 'Select a budget range.'
    if (!timeline) nextErrors.timeline = 'Select a timeline.'
    if (!projectSummary || projectSummary.length < 20) {
      nextErrors.projectSummary = 'Please summarize the project in at least 20 characters.'
    }
    if (!goals || goals.length < 20) {
      nextErrors.goals = 'Please describe the goals or requirements in at least 20 characters.'
    }
    if (!preferredContact) nextErrors.preferredContactMethod = 'Select a preferred contact method.'
    if (!consent) nextErrors.consent = 'Please confirm that we may contact you about this request.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate(event.currentTarget)) return
    void handleSubmit(event)
  }

  if (state.succeeded) {
    return (
      <div className="rounded-2xl border border-green-400/30 bg-green-400/10 p-8 text-center">
        <CheckCircle2 className="mx-auto size-14 text-green-400" />
        <h2 className="mt-5 text-2xl font-semibold text-foreground">Request received</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          Thank you for contacting DevForge Studio. Our team will review your request and respond within one business day with recommended next steps.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      {selectedServices.map((service) => (
        <input key={service} type="hidden" name="serviceCategories" value={service} />
      ))}
      <input type="hidden" name="budgetRange" value={budget} />
      <input type="hidden" name="timeline" value={timeline} />
      <input type="hidden" name="preferredContactMethod" value={preferredContact} />
      <input type="hidden" name="consent" value={consent ? 'yes' : 'no'} />

      <div className={cn('grid gap-5', compact ? 'md:grid-cols-2' : 'lg:grid-cols-2')}>
        <Field label="Full name" htmlFor="fullName" error={errors.fullName}>
          <Input id="fullName" name="fullName" placeholder="Your name" aria-invalid={!!errors.fullName} />
        </Field>
        <Field label="Business email" htmlFor="email" error={errors.email}>
          <Input id="email" name="email" type="email" placeholder="you@company.com" aria-invalid={!!errors.email} />
        </Field>
        <Field label="Phone optional" htmlFor="phone">
          <Input id="phone" name="phone" placeholder="+1 555 000 0000" />
        </Field>
        <Field label="Company / organization" htmlFor="company" error={errors.company}>
          <Input id="company" name="company" placeholder="Company name" aria-invalid={!!errors.company} />
        </Field>
        <Field label="Company website optional" htmlFor="website">
          <Input id="website" name="website" type="url" placeholder="https://example.com" />
        </Field>
        <Field label="Your role optional" htmlFor="role">
          <Input id="role" name="role" placeholder="Founder, COO, Product Lead..." />
        </Field>
      </div>

      <div>
        <FormLabel>Service categories</FormLabel>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {serviceTitles.map((title) => (
            <label
              key={title}
              className={cn(
                'flex items-center gap-3 rounded-xl border bg-background/50 p-3 text-sm transition',
                selectedServices.includes(title) ? 'border-primary/50 bg-primary/10 text-foreground' : 'border-border/60 text-foreground/75',
              )}
            >
              <Checkbox
                checked={selectedServices.includes(title)}
                onCheckedChange={() => toggleService(title)}
                aria-label={title}
              />
              <span>{title}</span>
            </label>
          ))}
        </div>
        <FieldError message={errors.serviceCategories} />
      </div>

      <div className={cn('grid gap-5', compact ? 'md:grid-cols-2' : 'lg:grid-cols-3')}>
        <Field label="Budget range" htmlFor="budgetRange" error={errors.budgetRange}>
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger id="budgetRange" className="w-full bg-background/70" aria-invalid={!!errors.budgetRange}>
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent>
              {budgetRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Timeline" htmlFor="timeline" error={errors.timeline}>
          <Select value={timeline} onValueChange={setTimeline}>
            <SelectTrigger id="timeline" className="w-full bg-background/70" aria-invalid={!!errors.timeline}>
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              {timelineOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Desired delivery date optional" htmlFor="desiredDeliveryDate">
          <Input id="desiredDeliveryDate" name="desiredDeliveryDate" type="date" />
        </Field>
      </div>

      <Field label="Project summary" htmlFor="projectSummary" error={errors.projectSummary}>
        <Textarea
          id="projectSummary"
          name="projectSummary"
          rows={4}
          placeholder="Briefly describe what you want to build or improve."
          aria-invalid={!!errors.projectSummary}
        />
      </Field>

      <Field label="Goals and requirements" htmlFor="goals" error={errors.goals}>
        <Textarea
          id="goals"
          name="goals"
          rows={5}
          placeholder="Share business goals, must-have features, integrations, users, or launch expectations."
          aria-invalid={!!errors.goals}
        />
      </Field>

      <div className="grid gap-5 lg:grid-cols-2">
        <Field label="Preferred contact method" htmlFor="preferredContactMethod" error={errors.preferredContactMethod}>
          <Select value={preferredContact} onValueChange={setPreferredContact}>
            <SelectTrigger id="preferredContactMethod" className="w-full bg-background/70">
              <SelectValue placeholder="Select contact method" />
            </SelectTrigger>
            <SelectContent>
              {preferredContactMethods.map((method) => (
                <SelectItem key={method} value={method}>
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <div className="rounded-xl border border-border/60 bg-background/45 p-4 text-sm leading-6 text-muted-foreground">
          After submission, we review the request, identify the best first step, and reply with practical questions or an estimate path.
        </div>
      </div>

      <div>
        <label className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/45 p-4 text-sm leading-6 text-muted-foreground">
          <Checkbox checked={consent} onCheckedChange={(checked) => setConsent(checked === true)} className="mt-1" />
          <span>
            I agree that DevForge Studio may contact me about this project request. I understand this form does not create a service agreement.
          </span>
        </label>
        <FieldError message={errors.consent} />
      </div>

      {state.errors && (
        <div className="flex gap-3 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <ValidationError errors={state.errors} />
        </div>
      )}

      <Button type="submit" size="lg" disabled={state.submitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
        {state.submitting ? 'Sending request...' : 'Request a Project Estimate'}
        <Send className="size-4" />
      </Button>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <FormLabel htmlFor={htmlFor}>{label}</FormLabel>
      <div className="mt-2">{children}</div>
      <FieldError message={error} />
    </div>
  )
}

function FormLabel({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-foreground/80">
      {children}
    </label>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-2 text-xs text-red-300">{message}</p>
}
