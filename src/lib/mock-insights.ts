export interface FinancialInsight {
  id: string;
  type: 'tip' | 'warning' | 'achievement' | 'suggestion';
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
}

export function generateMockInsights(income: number, expenses: number): FinancialInsight[] {
  const savings = income - expenses;
  const savingsRate = income > 0 ? (savings / income) * 100 : 0;
  
  const insights: FinancialInsight[] = [];

  // Savings rate insights
  if (savingsRate >= 20) {
    insights.push({
      id: '1',
      type: 'achievement',
      title: 'Excellent Savings Rate!',
      message: `You're saving ${savingsRate.toFixed(1)}% of your income. This is above the recommended 20% savings rate.`,
      priority: 'high'
    });
  } else if (savingsRate >= 10) {
    insights.push({
      id: '2',
      type: 'tip',
      title: 'Good Savings Habit',
      message: `You're saving ${savingsRate.toFixed(1)}% of your income. Try to increase this to 20% for optimal financial health.`,
      priority: 'medium'
    });
  } else if (savingsRate > 0) {
    insights.push({
      id: '3',
      type: 'suggestion',
      title: 'Improve Your Savings',
      message: `You're saving ${savingsRate.toFixed(1)}% of your income. Consider reducing expenses or increasing income to save at least 10%.`,
      priority: 'high'
    });
  } else {
    insights.push({
      id: '4',
      type: 'warning',
      title: 'Spending More Than Earning',
      message: 'You\'re spending more than you earn. This is unsustainable and requires immediate attention.',
      priority: 'high'
    });
  }

  // Expense insights
  if (expenses > income * 0.8) {
    insights.push({
      id: '5',
      type: 'warning',
      title: 'High Expense Ratio',
      message: 'Your expenses are more than 80% of your income. Consider reviewing your spending habits.',
      priority: 'high'
    });
  }

  // General tips
  const tips = [
    {
      id: '6',
      type: 'tip' as const,
      title: 'Emergency Fund',
      message: 'Aim to build an emergency fund covering 3-6 months of expenses for financial security.',
      priority: 'medium' as const
    },
    {
      id: '7',
      type: 'suggestion' as const,
      title: 'Track Daily Expenses',
      message: 'Recording daily expenses helps identify spending patterns and areas for improvement.',
      priority: 'low' as const
    },
    {
      id: '8',
      type: 'tip' as const,
      title: 'Automate Savings',
      message: 'Set up automatic transfers to savings accounts to make saving effortless.',
      priority: 'medium' as const
    }
  ];

  // Add 2-3 random tips
  const randomTips = tips.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 3) + 1);
  insights.push(...randomTips);

  return insights;
}