import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import DemoClient from './demo-client'

const VALID = ['dentist', 'gym', 'salon', 'coaching', 'restaurant', 'tech']

export function generateStaticParams() {
  return VALID.map((slug) => ({ slug }))
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!VALID.includes(slug)) {
    notFound()
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#101014] text-white/50 flex items-center justify-center">Loading demo experience...</div>}>
      <DemoClient slug={slug} />
    </Suspense>
  )
}