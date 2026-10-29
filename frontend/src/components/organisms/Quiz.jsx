import OrderButton from './OrderButton'
import { useEffect, useRef, useState } from 'react'
import { PRODUCTS } from '../../data/products'
import { formatNaira } from '../../lib/site'
import BagArt from '../atoms/BagArt'
import { ArrowIcon, CloseIcon, SparkIcon, WhatsAppIcon } from '../atoms/Icons'

const QUESTIONS = [
  {
    id: 'occasion',
    prompt: 'Where is this bag going?',
    hint: 'Pick the moment you are dressing for.',
    options: [
      { value: 'work', label: 'Work & meetings', detail: 'Office, church, after-work plans' },
      { value: 'weekend', label: 'Weekends out', detail: 'Brunch, errands, street style' },
      { value: 'evening', label: 'Evenings & events', detail: 'Dinner, weddings, nights out' },
      { value: 'travel', label: 'Travel', detail: 'Weekend trips and cabin bags' },
    ],
  },
  {
    id: 'style',
    prompt: 'How do you like your style?',
    hint: 'There is no wrong answer.',
    options: [
      { value: 'classic', label: 'Classic & polished', detail: 'Structured, timeless, put together' },
      { value: 'minimal', label: 'Clean & minimal', detail: 'Quiet shapes, no fuss' },
      { value: 'bold', label: 'Bold & confident', detail: 'A statement before you speak' },
      { value: 'soft', label: 'Soft & feminine', detail: 'Easy shapes, gentle colour' },
    ],
  },
  {
    id: 'budget',
    prompt: 'What is your budget?',
    hint: 'We will find the best match in your range.',
    options: [
      { value: 'under', label: 'Under ₦45,000', detail: 'Smart everyday picks' },
      { value: 'mid', label: '₦45,000 – ₦70,000', detail: 'Our most-loved range' },
      { value: 'high', label: '₦70,000+', detail: 'The premium edit' },
    ],
  },
]

const BUDGETS = {
  under: 40000,
  mid: 57000,
  high: 85000,
}

function recommend(answers) {
  const target = BUDGETS[answers.budget] ?? 57000
  const scored = PRODUCTS.map((product) => {
    let score = 0
    if (product.tags.includes(answers.occasion)) score += 3
    if (product.tags.includes(answers.style)) score += 3
    const difference = Math.abs(product.price - target) / target
    score += Math.max(0, 2.5 - difference * 2.5)
    return { product, score }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored[0].product
}

export default function Quiz({ onClose, onNavigate }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const dialogRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [onClose])

  const question = QUESTIONS[step]
  const finished = step >= QUESTIONS.length
  const result = finished ? recommend(answers) : null
  const progress = finished ? 100 : Math.round((step / QUESTIONS.length) * 100)

  const choose = (value) => {
    const next = { ...answers, [question.id]: value }
    setAnswers(next)
    setStep((current) => current + 1)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-title"
    >
      <button
        type="button"
        aria-label="Close quiz"
        onClick={onClose}
        className="absolute inset-0 bg-jora-navy/70 backdrop-blur-sm"
      />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="anim-up relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-[2rem] bg-jora-soft outline-none sm:max-w-3xl sm:rounded-[2rem]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-jora-charcoal/10 px-6 py-5 sm:px-9">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.26em] text-jora-red">
              <SparkIcon className="h-3.5 w-3.5" />
              Find your bag
            </p>
            <h2 id="quiz-title" className="mt-2 font-display text-2xl text-jora-charcoal">
              {finished ? 'Your match is ready' : 'Three questions. One bag.'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quiz"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-jora-charcoal/15 text-jora-charcoal/70 transition hover:border-jora-red hover:text-jora-red"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="px-6 pb-8 pt-6 sm:px-9">
          <div className="h-1 overflow-hidden rounded-full bg-jora-charcoal/10">
            <div
              className="h-full rounded-full bg-jora-red transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {!finished && question && (
            <div className="mt-7">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-jora-charcoal/40">
                <span>Question {step + 1}</span>
                <span>0{QUESTIONS.length}</span>
              </div>
              <h3 className="mt-3 font-display text-2xl text-jora-charcoal sm:text-3xl">
                {question.prompt}
              </h3>
              <p className="mt-1 text-sm text-jora-charcoal/55">{question.hint}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {question.options.map((option) => {
                  const selected = answers[question.id] === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => choose(option.value)}
                      aria-pressed={selected}
                      className={`group flex items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-all duration-300 ${
                        selected
                          ? 'border-jora-red bg-white'
                          : 'border-jora-charcoal/10 bg-white/60 hover:-translate-y-0.5 hover:border-jora-red/50 hover:bg-white'
                      }`}
                    >
                      <span>
                        <span className="block text-sm font-medium text-jora-charcoal">
                          {option.label}
                        </span>
                        <span className="mt-1 block text-xs text-jora-charcoal/50">
                          {option.detail}
                        </span>
                      </span>
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-jora-charcoal/15 text-jora-charcoal/50 transition group-hover:border-jora-red group-hover:bg-jora-red group-hover:text-white">
                        <ArrowIcon className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep((current) => Math.max(0, current - 1))}
                  disabled={step === 0}
                  className="text-[10px] font-medium uppercase tracking-[0.18em] text-jora-charcoal/50 transition hover:text-jora-red disabled:opacity-30"
                >
                  Back
                </button>
                <p className="text-[10px] uppercase tracking-[0.18em] text-jora-charcoal/35">
                  No wrong answers
                </p>
              </div>
            </div>
          )}

          {finished && result && (
            <div className="mt-7 grid gap-6 sm:grid-cols-[0.85fr_1fr] sm:items-center">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-jora-charcoal/5 bg-[radial-gradient(circle_at_50%_35%,#ffffff,#e9eaec)]">
                <div className="absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-jora-charcoal/10" />
                <BagArt
                  variant={result.variant}
                  palette={result.palette}
                  className="relative h-full w-full p-5"
                />
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-jora-red">
                  Your match
                </p>
                <h3 className="mt-2 font-display text-3xl text-jora-charcoal">{result.name}</h3>
                <p className="mt-2 font-display text-lg text-jora-charcoal/70">
                  {formatNaira(result.price)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-jora-charcoal/60">
                  Chosen for the way you move: {answers.occasion} by day, {answers.style} in
                  spirit. Ask us about gift wrapping and delivery.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <OrderButton product={result}
                    className="btn-sweep inline-flex items-center gap-2 rounded-full bg-jora-red px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-white"
                    style={{ '--sweep-bg': '#1b2233' }}
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Order this bag
                  </OrderButton>
                  <button
                    type="button"
                    onClick={() => {
                      onClose()
                      onNavigate('shop')
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-jora-charcoal/15 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-jora-charcoal transition hover:border-jora-navy hover:bg-jora-navy hover:text-white"
                  >
                    Shop all bags
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep(0)
                    setAnswers({})
                  }}
                  className="mt-4 text-[10px] font-medium uppercase tracking-[0.18em] text-jora-charcoal/45 underline decoration-jora-red/40 underline-offset-4 transition hover:text-jora-red"
                >
                  Retake the quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
