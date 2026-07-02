export interface Summary {
  events: number;

  opportunities: number;

  registrations: number;

  applications: number;
}

export interface Growth {
  events: number;

  opportunities: number;

  registrations: number;

  applications: number;
}

export interface MonthlyTrend {
  month: string;

  value: number;
}

export interface AnalyticsResponse {
  summary: Summary;

  growth?: Growth;

  monthlyTrend?: MonthlyTrend[];

  topEvents?: unknown[];

  topOpportunities?: unknown[];

  month?: number;

  year?: number;
}
