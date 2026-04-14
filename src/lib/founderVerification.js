const safeNumber = (value) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

const hasUrl = (value) => typeof value === 'string' && /^(https?:\/\/|blob:|data:)/i.test(value.trim())

const splitCsv = (value) =>
  (value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

const scoreClamp = (value) => Math.max(0, Math.min(100, Math.round(value)))

export const verificationSchema = {
  identity: {
    founderName: 'string',
    officialEmail: 'string',
    phoneNumber: 'string',
    phoneVerified: 'boolean',
    emailVerified: 'boolean',
    governmentIdUrl: 'string',
    governmentIdNumber: 'string',
    selfieUrl: 'string',
    faceMatchScore: 'number',
    linkedinUrl: 'string',
    linkedinHeadline: 'string',
    linkedinExperienceYears: 'number',
    linkedinConnections: 'number',
    linkedinRecentPosts: 'number',
    city: 'string',
    category: 'string',
    consistencyDeclaration: 'boolean'
  },
  execution: {
    startupName: 'string',
    problemStatement: 'string',
    solutionDescription: 'string',
    prototypeStage: 'string',
    mvpLink: 'string',
    demoLink: 'string',
    githubUrl: 'string',
    websiteUrl: 'string',
    screenshotLinks: 'csv-string'
  },
  investorReadiness: {
    totalUsers: 'number',
    monthlyActiveUsers: 'number',
    growthRateMonthly: 'number',
    monthlyRevenue: 'number',
    pitchDeckUrl: 'string',
    businessModel: 'string',
    targetMarket: 'string',
    competitors: 'string',
    askAmountUsd: 'number'
  }
}

export const initialVerificationForm = {
  founderName: '',
  officialEmail: '',
  phoneNumber: '',
  phoneVerified: false,
  emailVerified: false,
  governmentIdUrl: '',
  governmentIdNumber: '',
  selfieUrl: '',
  faceMatchScore: '',
  linkedinUrl: '',
  linkedinHeadline: '',
  linkedinExperienceYears: '',
  linkedinConnections: '',
  linkedinRecentPosts: '',
  city: '',
  category: '',
  consistencyDeclaration: false,
  startupName: '',
  problemStatement: '',
  solutionDescription: '',
  prototypeStage: 'idea',
  mvpLink: '',
  demoLink: '',
  githubUrl: '',
  websiteUrl: '',
  screenshotLinks: '',
  totalUsers: '',
  monthlyActiveUsers: '',
  growthRateMonthly: '',
  monthlyRevenue: '',
  pitchDeckUrl: '',
  businessModel: '',
  targetMarket: '',
  competitors: '',
  askAmountUsd: ''
}

const aiFeedbackFromSignals = (signals) => {
  const missing = []
  const improve = []

  if (!signals.verifiedContact) {
    missing.push('Verify both phone and email to increase trust confidence.')
  }
  if (!signals.linkedinStrong) {
    improve.push('Strengthen your LinkedIn footprint with recent activity and richer experience details.')
  }
  if (!signals.productProofStrong) {
    missing.push('Add a working MVP/demo and at least 2 screenshots to prove build execution.')
  }
  if (!signals.problemSolutionClear) {
    improve.push('Clarify the problem and solution in concrete, measurable terms.')
  }
  if (!signals.tractionSignalStrong) {
    missing.push('Add user growth or MAU trend data to support traction claims.')
  }
  if (!signals.deckReady) {
    missing.push('Upload a pitch deck with market, moat, and growth assumptions.')
  }

  return {
    missing,
    improve,
    summary:
      missing.length === 0 && improve.length === 0
        ? 'High-quality submission. Signals are consistent, execution-led, and investor ready.'
        : 'Submission can improve with stronger evidence and clearer investor narrative.'
  }
}

export const evaluateIdentityStep = (form) => {
  const faceMatchScore = scoreClamp(safeNumber(form.faceMatchScore))
  const hasLegalName = (form.founderName || '').trim().length >= 3
  const hasProfessionalEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((form.officialEmail || '').trim())
  const hasCity = (form.city || '').trim().length >= 2

  const idCompleteness =
    [form.governmentIdUrl, form.governmentIdNumber, form.selfieUrl].filter((v) => (v || '').trim()).length / 3

  const contactVerification = [Boolean(form.phoneVerified), Boolean(form.emailVerified && hasProfessionalEmail)].filter(Boolean).length / 2

  const linkedinStrength =
    (hasUrl(form.linkedinUrl) ? 0.55 : 0) +
    Math.min((form.linkedinHeadline || '').trim().length / 60, 1) * 0.45

  const identityCompleteness = [hasLegalName, hasProfessionalEmail, hasCity].filter(Boolean).length / 3

  const authenticityRaw =
    idCompleteness * 30 +
    (faceMatchScore / 100) * 25 +
    linkedinStrength * 25 +
    contactVerification * 20

  const normalizedWithCompleteness = authenticityRaw * (0.7 + identityCompleteness * 0.3)

  const score = scoreClamp(normalizedWithCompleteness)

  const flags = []
  if (!form.phoneVerified || !form.emailVerified) flags.push('Unverified contact channels')
  if (faceMatchScore < 50) flags.push('Low selfie vs ID confidence')
  if (!hasUrl(form.linkedinUrl) || (form.linkedinHeadline || '').trim().length < 20) flags.push('Weak digital footprint')
  if (idCompleteness < 0.66) flags.push('Incomplete identity evidence')

  const signals = {
    verifiedContact: form.phoneVerified && form.emailVerified,
    linkedinStrong: linkedinStrength >= 0.55,
    productProofStrong: false,
    problemSolutionClear: true,
    tractionSignalStrong: true,
    deckReady: true
  }

  return {
    score,
    flags,
    signals,
    details: {
      idCompleteness,
      contactVerification,
      linkedinStrength,
      faceMatchScore,
      identityCompleteness
    }
  }
}

export const evaluateExecutionStep = (form) => {
  const screenshotCount = splitCsv(form.screenshotLinks).length

  const productProof =
    [form.mvpLink, form.demoLink, form.githubUrl, form.websiteUrl].filter(hasUrl).length / 4

  const buildEvidence = Math.min((productProof * 0.7) + (Math.min(screenshotCount, 4) / 4) * 0.3, 1)

  const problemDepth = Math.min((form.problemStatement || '').trim().length / 240, 1)
  const solutionDepth = Math.min((form.solutionDescription || '').trim().length / 280, 1)

  const stageWeight = {
    idea: 0.25,
    wireframe: 0.45,
    prototype: 0.65,
    mvp: 0.82,
    live: 1
  }[form.prototypeStage] || 0.25

  const clarity = (problemDepth * 0.45) + (solutionDepth * 0.55)
  const executionRaw = buildEvidence * 45 + clarity * 30 + stageWeight * 25
  const score = scoreClamp(executionRaw)

  const flags = []
  if (productProof < 0.5) flags.push('Insufficient working product proof')
  if (clarity < 0.55) flags.push('Problem/solution clarity is low')
  if (screenshotCount === 0) flags.push('No product screenshots uploaded')
  if (form.prototypeStage === 'idea' && productProof === 0) flags.push('Idea-stage only submission')

  const signals = {
    verifiedContact: true,
    linkedinStrong: true,
    productProofStrong: buildEvidence >= 0.6,
    problemSolutionClear: clarity >= 0.6,
    tractionSignalStrong: true,
    deckReady: true
  }

  return {
    score,
    flags,
    signals,
    details: {
      productProof,
      buildEvidence,
      clarity,
      stageWeight,
      screenshotCount
    }
  }
}

export const evaluateReadinessStep = (form) => {
  const totalUsers = safeNumber(form.totalUsers)
  const mau = safeNumber(form.monthlyActiveUsers)
  const growthRate = safeNumber(form.growthRateMonthly)
  const monthlyRevenue = safeNumber(form.monthlyRevenue)

  const tractionScore =
    Math.min(totalUsers / 10000, 1) * 0.35 +
    Math.min(mau / 5000, 1) * 0.25 +
    Math.min(growthRate / 25, 1) * 0.25 +
    Math.min(monthlyRevenue / 25000, 1) * 0.15

  const narrativeScore =
    Math.min((form.businessModel || '').trim().length / 180, 1) * 0.4 +
    Math.min((form.targetMarket || '').trim().length / 160, 1) * 0.3 +
    Math.min((form.competitors || '').trim().length / 140, 1) * 0.3

  const deckSignal = hasUrl(form.pitchDeckUrl) ? 1 : 0
  const readinessRaw = tractionScore * 50 + narrativeScore * 35 + deckSignal * 15
  const score = scoreClamp(readinessRaw)

  const flags = []
  if (!hasUrl(form.pitchDeckUrl)) flags.push('Pitch deck missing')
  if (tractionScore < 0.35) flags.push('Weak traction evidence')
  if (narrativeScore < 0.55) flags.push('Market model narrative needs depth')

  const signals = {
    verifiedContact: true,
    linkedinStrong: true,
    productProofStrong: true,
    problemSolutionClear: true,
    tractionSignalStrong: tractionScore >= 0.5,
    deckReady: deckSignal === 1
  }

  return {
    score,
    flags,
    signals,
    details: {
      tractionScore,
      narrativeScore,
      deckSignal
    }
  }
}

export const calculateFounderScore = ({ authenticityScore, executionScore, investorReadinessScore }) => {
  const finalScore = scoreClamp(authenticityScore * 0.35 + executionScore * 0.4 + investorReadinessScore * 0.25)

  const badges = {
    verifiedIdentity: authenticityScore >= 70,
    productBuilt: executionScore >= 65,
    investorReady: investorReadinessScore >= 70
  }

  const riskFlags = []
  if (authenticityScore < 50) riskFlags.push('Authenticity risk: identity trust signal is low')
  if (executionScore < 50) riskFlags.push('Execution risk: product evidence is too weak')
  if (investorReadinessScore < 50) riskFlags.push('Readiness risk: traction or deck quality is weak')

  return {
    finalScore,
    badges,
    riskFlags
  }
}

export const buildAiFeedback = ({ identityResult, executionResult, readinessResult }) => {
  return aiFeedbackFromSignals({
    ...identityResult.signals,
    ...executionResult.signals,
    ...readinessResult.signals
  })
}

export const computeDropoffState = ({ startedAt, lastUpdatedAt, activeStep, completedStepCount }) => {
  const now = Date.now()
  const ageMs = now - (startedAt || now)
  const idleMs = now - (lastUpdatedAt || now)

  let risk = 'low'
  if (idleMs > 10 * 60 * 1000 || (ageMs > 18 * 60 * 1000 && completedStepCount < 2)) risk = 'high'
  else if (idleMs > 5 * 60 * 1000 || (ageMs > 10 * 60 * 1000 && completedStepCount < 2)) risk = 'medium'

  return {
    risk,
    activeStep,
    idleMinutes: Math.floor(idleMs / 60000),
    totalMinutes: Math.floor(ageMs / 60000)
  }
}

const MOCK_PEERS = [
  { id: 'F-112', startupName: 'FlowMint', city: 'Bengaluru', category: 'SaaS', founderScore: 77, executionScore: 81, investorReadinessScore: 69 },
  { id: 'F-108', startupName: 'VedaCare', city: 'Delhi', category: 'HealthTech', founderScore: 71, executionScore: 64, investorReadinessScore: 74 },
  { id: 'F-096', startupName: 'TerraFleet', city: 'Bengaluru', category: 'Climate Tech', founderScore: 83, executionScore: 86, investorReadinessScore: 79 },
  { id: 'F-091', startupName: 'OrbitPay', city: 'Mumbai', category: 'Fintech', founderScore: 73, executionScore: 75, investorReadinessScore: 67 },
  { id: 'F-083', startupName: 'LensCopilot', city: 'Bengaluru', category: 'SaaS', founderScore: 68, executionScore: 72, investorReadinessScore: 59 }
]

export const compareAgainstPeers = ({ city, category, currentFounder }) => {
  const peers = MOCK_PEERS.filter((peer) => {
    const cityMatch = city ? peer.city.toLowerCase() === city.toLowerCase() : true
    const categoryMatch = category ? peer.category.toLowerCase() === category.toLowerCase() : true
    return cityMatch && categoryMatch
  })

  const pool = [...peers, currentFounder].sort((a, b) => b.founderScore - a.founderScore)
  const rank = pool.findIndex((item) => item.id === currentFounder.id) + 1
  const percentile = scoreClamp(((pool.length - rank) / Math.max(pool.length - 1, 1)) * 100)

  return {
    rank,
    total: pool.length,
    percentile,
    peers: pool
  }
}

export const toInvestorRecord = ({ form, scores, badges, flags, dropoff }) => {
  return {
    id: `F-${Math.floor(Date.now() / 1000)}`,
    createdAt: new Date().toISOString(),
    city: form.city || 'Unknown',
    category: form.category || 'Other',
    startupName: form.startupName || 'Untitled Startup',
    founderName: form.founderName || 'Unknown Founder',
    authenticityScore: scores.authenticityScore,
    executionScore: scores.executionScore,
    investorReadinessScore: scores.investorReadinessScore,
    founderScore: scores.founderScore,
    badges,
    qualityFlags: flags,
    dropoff,
    traction: {
      totalUsers: safeNumber(form.totalUsers),
      monthlyActiveUsers: safeNumber(form.monthlyActiveUsers),
      growthRateMonthly: safeNumber(form.growthRateMonthly),
      monthlyRevenue: safeNumber(form.monthlyRevenue)
    },
    links: {
      mvpLink: form.mvpLink,
      githubUrl: form.githubUrl,
      websiteUrl: form.websiteUrl,
      pitchDeckUrl: form.pitchDeckUrl,
      linkedinUrl: form.linkedinUrl
    }
  }
}

export const saveInvestorRecord = (record) => {
  const key = 'fh_founder_verifications'
  const existing = JSON.parse(window.localStorage.getItem(key) || '[]')
  const next = [record, ...existing].slice(0, 50)
  window.localStorage.setItem(key, JSON.stringify(next))
}

export const loadInvestorRecords = () => {
  const key = 'fh_founder_verifications'
  return JSON.parse(window.localStorage.getItem(key) || '[]')
}
