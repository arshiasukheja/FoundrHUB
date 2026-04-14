export const buildDefaultUserData = ({ name, email, role }) => ({
  profile: {
    name: name || 'Founder',
    email: email || '',
    role: role || 'founder'
  },
  dashboard: {
    stats: {
      activeUsers: { value: 1863, delta: 2.1 },
      profileViews: { value: 863, delta: 2.1 },
      aiActions: { value: 363, delta: 2.1 },
      investorInteractions: { value: 163, delta: 2.3 }
    },
    activityTimeline: {
      year: 2025,
      month: 6,
      today: 12,
      days: {
        4: { visits: 12, ai: 3, investor: 5, spike: false },
        7: { visits: 18, ai: 5, investor: 2, spike: true },
        12: { visits: 22, ai: 7, investor: 6, spike: true },
        18: { visits: 9, ai: 2, investor: 3, spike: false },
        23: { visits: 16, ai: 4, investor: 1, spike: false },
        28: { visits: 26, ai: 8, investor: 9, spike: true }
      }
    },
    growthTrend: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10'],
      points: [120, 114, 108, 100, 92, 84, 76, 68, 60, 52],
      highlightValue: 1420,
      quickStats: {
        month: { label: 'This Month', value: 120, delta: 3.1, up: true, icon: '✨' },
        week: { label: 'This Week', value: 420, delta: 2.4, up: true, icon: '🤖' }
      }
    },
    performanceSplit: {
      highValue: 54500,
      lowValue: 25500,
      seriesHigh: [100, 90, 85, 80, 60, 55, 50, 35, 25, 20],
      seriesLow: [110, 100, 95, 90, 85, 80, 72, 68, 60, 55]
    },
    userDistribution: {
      labels: ['Founders', 'Investors'],
      values: [60, 40],
      deltas: { Founders: 2.2, Investors: 1.1 }
    },
    liveActivity: [
      '12 people viewed your startup',
      'Idea generated in AI layer',
      '3 new messages from investors',
      '1 collaboration request',
      'High traffic from Bangalore'
    ],
    equitySnapshot: {
      valuationCr: 12.5,
      investorEquity: 18.2,
      impliedPrice: 1.25,
      committedCr: 2.1,
      softCircledCr: 0.75,
      runwayMonths: 8.5
    }
  },
  discovery: {
    startups: [
      {
        id: 1,
        name: 'Arcadia',
        tagline: 'High-quality Gaming Everywhere',
        logo: 'AR',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
        description: 'Arcadia is a cloud gaming platform for streaming high-quality licensed games.',
        views: 28430,
        growth: 45,
        readiness: 86,
        category: 'Gaming',
        location: 'Bangalore',
        stage: 'Growth',
        verified: true
      },
      {
        id: 2,
        name: 'SkillSprint',
        tagline: 'Internal Upskilling Academy',
        logo: 'SS',
        description: 'Gamified internal training platform to accelerate employee skill growth.',
        views: 19240,
        growth: 32,
        readiness: 79,
        category: 'EdTech',
        location: 'Delhi',
        stage: 'Seed',
        verified: true
      },
      {
        id: 3,
        name: 'GreenOps',
        tagline: 'Office Waste Optimization',
        logo: 'GO',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80',
        description: 'IoT-led platform tracking office resource usage to reduce waste.',
        views: 15620,
        growth: 58,
        readiness: 88,
        category: 'Sustainability',
        location: 'Mumbai',
        stage: 'Scale',
        verified: true
      },
      {
        id: 4,
        name: 'CulturePulse',
        tagline: 'Culture Analytics',
        logo: 'CP',
        image: 'https://images.unsplash.com/photo-1522071823991-b5ae72643156?auto=format&fit=crop&q=80',
        description: 'Anonymous survey analytics to improve team engagement and retention.',
        views: 31560,
        growth: 72,
        readiness: 92,
        category: 'Well-being',
        location: 'Bangalore',
        stage: 'Growth',
        verified: true
      },
      {
        id: 5,
        name: 'TalentX',
        tagline: 'Talent-as-a-Service',
        logo: 'TX',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
        description: 'Match specialized experts with high-impact execution needs.',
        views: 42310,
        growth: 24,
        readiness: 73,
        category: 'Future of Work',
        location: 'Delhi',
        stage: 'Growth',
        verified: true
      },
      {
        id: 6,
        name: 'Insightly',
        tagline: 'AI Customer Insights',
        logo: 'IN',
        description: 'AI-led customer feedback analysis across email, chat, and social.',
        views: 8420,
        growth: 15,
        readiness: 64,
        category: 'AI',
        location: 'Mumbai',
        stage: 'Seed',
        verified: false
      }
    ]
  },
  communication: {
    meetings: [
      {
        id: 1,
        title: 'Product Demo Call',
        date: 'Today',
        time: '2:30 PM',
        type: 'video',
        icon: 'video',
        description: 'With Sequoia Capital partner'
      },
      {
        id: 2,
        title: 'Investor Meeting',
        date: 'Tomorrow',
        time: '10:00 AM',
        type: 'in-person',
        icon: 'in-person',
        description: 'Sand Hill Road, Palo Alto'
      },
      {
        id: 3,
        title: 'Product Launch Event',
        date: 'Mar 28',
        time: '6:00 PM',
        type: 'event',
        icon: 'event',
        description: 'Product Hunt launch day'
      }
    ],
    conversations: [
      {
        id: 1,
        name: 'Aarav Mehta',
        role: 'Founder, GreenGrid Labs',
        time: '10:42 AM',
        message: 'Shared the updated traction deck and growth experiments.',
        unread: 2
      },
      {
        id: 2,
        name: 'Riya Kapoor',
        role: 'Founder, NovaLedger',
        time: 'Yesterday',
        message: 'Can we review the investor follow-up sequence today?',
        unread: 0
      },
      {
        id: 3,
        name: 'Kabir Rao',
        role: 'Founder, MentorSpark',
        time: 'Tue',
        message: 'Need feedback on the new brand positioning statement.',
        unread: 1
      },
      {
        id: 4,
        name: 'Sneha Iyer',
        role: 'Founder, CulturePulse',
        time: 'Mon',
        message: 'Our demo day slot is confirmed. Sharing the invite soon.',
        unread: 0
      }
    ]
  },
  aiAnalytics: {
    startupName: 'Foundr startup',
    implementedFixIds: [],
    recommendations: [
      {
        id: 'rec-onboarding',
        title: 'Fix onboarding drop in first session',
        reason: 'Most users bounce before completing setup step 2.',
        fix: 'Replace long setup with 2-step onboarding + sample data autofill.',
        impact: '+18% activation, +9% revenue lift'
      },
      {
        id: 'rec-pricing',
        title: 'Improve pricing page conversion',
        reason: 'Annual value proposition is not visible above the fold.',
        fix: 'Move annual plan card to first position and add savings badge near CTA.',
        impact: '+11% paid conversion'
      },
      {
        id: 'rec-segment',
        title: 'Target high-converting segment',
        reason: 'Teams with 5-10 members convert much higher than solo users.',
        fix: 'Launch a dedicated landing page and outreach flow for 5-10 team segment.',
        impact: '+14% qualified pipeline'
      }
    ],
    brandSuggestions: [
      {
        title: 'Clarify positioning in one line',
        detail: 'State the exact outcome in 7-10 words (who, outcome, time frame).',
        impact: 'Higher recall + easier referrals'
      },
      {
        title: 'Build social proof in the hero section',
        detail: 'Add 2 founder quotes + one quantified result above the fold.',
        impact: '+8-12% lift in conversion'
      },
      {
        title: 'Create a brand rhythm',
        detail: 'Lock a weekly content cadence: 2 short posts + 1 founder insight.',
        impact: 'More consistent inbound traffic'
      },
      {
        title: 'Product story in 3 slides',
        detail: 'Replace feature dumps with problem, proof, payoff.',
        impact: 'Shorter sales cycle'
      }
    ],
    allocationDefaults: {
      valuation: '12.5',
      equity: '18',
      budget: '2.8',
      stage: 'Seed',
      goal: 'User growth'
    }
  }
})
