export interface ChartData {
    status: string;
    name: string;
    unit: string;
    period: string;
    description: string;
    values: ChartValue[];
  }
export interface ChartValue {
    x: number;
    y: number;
  }
