import { NextRequest, NextResponse } from 'next/server';
import { generateMockInsights } from '@/lib/mock-insights';

export async function POST(request: NextRequest) {
  try {
    const { income, expenses } = await request.json();

    if (typeof income !== 'number' || typeof expenses !== 'number') {
      return NextResponse.json(
        { error: 'Income and expenses must be numbers' },
        { status: 400 }
      );
    }

    // Simulate API delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 1000));

    const insights = generateMockInsights(income, expenses);

    return NextResponse.json({
      success: true,
      insights,
      summary: {
        totalIncome: income,
        totalExpenses: expenses,
        netSavings: income - expenses,
        savingsRate: income > 0 ? ((income - expenses) / income * 100).toFixed(1) : '0'
      }
    });
  } catch (error) {
    console.error('Insights API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    );
  }
}