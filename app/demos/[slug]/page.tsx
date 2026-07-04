import { notFound } from 'next/navigation'
import { demos, getDemo } from '@/lib/demos'
import { DemoExperience } from '@/components/demo-experience'

export function generateStaticParams() {
  return demos.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const demo = getDemo(slug)
  if (!demo) return {}
  return {
    title: `${demo.industry} Website Demo — Apex Forge`,
    description: demo.tagline,
  }
}

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const demo = getDemo(slug)
  if (!demo) notFound()
  return <DemoExperience demo={demo} />
}
