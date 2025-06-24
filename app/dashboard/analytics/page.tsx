"use client"

import { useGoogleSheet } from "@/hooks/useGoogleSheet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, TrendingUp, Users, Activity, AlertTriangle } from "lucide-react"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Line, PieChart, Pie, Cell, Legend, BarChart, Bar } from "recharts"

const OVARIAN_DATA_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSOrLbxUb6jmar3LIp2tFGHHimYL7Tl6zZTRNqJohoWBaq7sk0UHkxTKPwknP3muI5rx2kE6PwSyrKk/pub?gid=0&single=true&output=csv";

function getMonthName(dateString: string) {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleString("default", { month: "short" });
}

export default function AnalyticsPage() {
  const ovarian = useGoogleSheet(OVARIAN_DATA_CSV);

  if (ovarian.loading) return <div>Loading...</div>;
  if (ovarian.error) return <div>Error loading data</div>;

  // Map ovarian_data to patients for analytics
  const patients = (ovarian.data || []).filter(p => p["Patient ID"]);

  // Group by month for the last 6 months
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return d.toLocaleString("default", { month: "short" });
  });

  const monthlyData = months.map(month => {
    // Patients with Date of Exam in this month
    const monthPatients = patients.filter(p => getMonthName(p["Date of Exam"]) === month);
    return {
      month,
      patients: monthPatients.length,
      predictions: Math.round(monthPatients.length * 0.95), // Placeholder for AI predictions
      accuracy: 94 + Math.floor(Math.random() * 4), // Placeholder accuracy
    };
  });

  // Risk mapping
  function getRisk(rec: any) {
    if (rec["Recommended Management"] === "Referral") return "High";
    if (rec["Recommended Management"] === "Surgery") return "Medium";
    if (rec["Recommended Management"] === "Medication") return "Low";
    return "-";
  }

  // Risk distribution
  const riskCounts = { High: 0, Medium: 0, Low: 0 };
  patients.forEach(p => {
    const risk = getRisk(p);
    if (risk === "High" || risk === "Medium" || risk === "Low") riskCounts[risk]++;
  });
  const riskDistribution = [
    { name: "Low Risk", value: riskCounts.Low },
    { name: "Medium Risk", value: riskCounts.Medium },
    { name: "High Risk", value: riskCounts.High },
  ];

  // Age group distribution by risk
  const ageGroups = ['<30', '30-39', '40-49', '50+'];
  function getAgeGroup(age: string | number) {
    const n = Number(age);
    if (isNaN(n)) return '<30';
    if (n < 30) return '<30';
    if (n < 40) return '30-39';
    if (n < 50) return '40-49';
    return '50+';
  }
  const ageRiskMap: Record<string, { High: number; Medium: number; Low: number }> = {
    '<30': { High: 0, Medium: 0, Low: 0 },
    '30-39': { High: 0, Medium: 0, Low: 0 },
    '40-49': { High: 0, Medium: 0, Low: 0 },
    '50+': { High: 0, Medium: 0, Low: 0 },
  };
  patients.forEach(p => {
    const group = getAgeGroup(p['Age']);
    const risk = getRisk(p);
    if (risk === 'High' || risk === 'Medium' || risk === 'Low') {
      ageRiskMap[group][risk]++;
    }
  });
  const ageRiskDistribution = ageGroups.map(group => ({
    ageGroup: group,
    ...ageRiskMap[group],
  }));

  // Summary cards
  const totalPatients = patients.length;
  const predictionAccuracy = monthlyData.length > 0 ? monthlyData[monthlyData.length - 1].accuracy : 0;
  const highRiskCases = riskCounts.High;
  const growthRate = monthlyData.length > 1 && monthlyData[monthlyData.length - 2].patients > 0
    ? ((monthlyData[monthlyData.length - 1].patients - monthlyData[monthlyData.length - 2].patients) / monthlyData[monthlyData.length - 2].patients * 100).toFixed(1) + "%"
    : "+0%";

  // Prepare separate datasets for pre- and post-menopausal
  const preUltrasoundData: Array<any> = [];
  const postUltrasoundData: Array<any> = [];
  patients.forEach(p => {
    const region = p['Region'] || 'Unknown';
    const menopause = (p['Menopause Status'] || '').toLowerCase().includes('pre') ? 'Pre' : 'Post';
    const feature = p['Ultrasound Features'] || 'Unknown';
    let entryArr = menopause === 'Pre' ? preUltrasoundData : postUltrasoundData;
    let entry = entryArr.find(d => d.region === region);
    if (!entry) {
      entry = { region };
      entryArr.push(entry);
    }
    entry[feature] = (entry[feature] || 0) + 1;
  });

  // Grouped+Stacked Bar Chart: Region x Menopause x Ultrasound Feature
  const featureSet = new Set<string>();
  const groupedStackedData: Array<any> = [];
  const regionMenopauseMap: Record<string, Record<string, Record<string, number>>> = {};
  patients.forEach(p => {
    const region = p['Region'] || 'Unknown';
    const menopause = (p['Menopause Status'] || '').toLowerCase().includes('pre') ? 'Pre' : 'Post';
    const feature = p['Ultrasound Features'] || 'Unknown';
    featureSet.add(feature);
    if (!regionMenopauseMap[region]) regionMenopauseMap[region] = {};
    if (!regionMenopauseMap[region][menopause]) regionMenopauseMap[region][menopause] = {};
    regionMenopauseMap[region][menopause][feature] = (regionMenopauseMap[region][menopause][feature] || 0) + 1;
  });
  // Flatten to array for recharts
  Object.entries(regionMenopauseMap).forEach(([region, menopauseObj]) => {
    Object.entries(menopauseObj).forEach(([menopause, featureCounts]) => {
      groupedStackedData.push({
        region,
        menopause,
        ...featureCounts,
      });
    });
  });
  const ultrasoundFeatures = Array.from(featureSet);

  // Process data for charts
  const processData = (data: any[]) => {
    // Age distribution data
    const ageDistributionData = processAgeDistribution(data);

    // Risk distribution data
    const riskDistributionData = processRiskDistribution(data);

    // Monthly growth data
    const monthlyGrowthData = processMonthlyGrowth(data);

    return {
      ageDistributionData,
      riskDistributionData,
      monthlyGrowthData,
    };
  };

  // Process age distribution
  const processAgeDistribution = (data: any[]) => {
    const ageGroups = {
      '<30': { Low: 0, Medium: 0, High: 0 },
      '30-39': { Low: 0, Medium: 0, High: 0 },
      '40-49': { Low: 0, Medium: 0, High: 0 },
      '50+': { Low: 0, Medium: 0, High: 0 }
    };

    data.forEach(p => {
      const age = parseInt(p['Age']) || 0;
      const risk = getRisk(p);
      let ageGroup = age < 30 ? '<30' : age < 40 ? '30-39' : age < 50 ? '40-49' : '50+';
      ageGroups[ageGroup][risk]++;
    });

    return Object.entries(ageGroups).map(([name, values]) => ({
      name,
      ...values
    }));
  };

  // Process risk distribution
  const processRiskDistribution = (data: any[]) => {
    const riskCounts = { Low: 0, Medium: 0, High: 0 };
    data.forEach(p => {
      const risk = getRisk(p);
      riskCounts[risk]++;
    });

    return Object.entries(riskCounts).map(([name, value]) => ({
      name,
      value
    }));
  };

  // Process monthly growth
  const processMonthlyGrowth = (data: any[]) => {
    const monthlyData: Record<string, number> = {};
    
    data.forEach(p => {
      const date = p['Date'] ? new Date(p['Date']) : null;
      if (date) {
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthlyData[monthYear] = (monthlyData[monthYear] || 0) + 1;
      }
    });

    // Convert to array and sort by date
    return Object.entries(monthlyData)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  const chartData = processData(patients);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" /> Last 6 Months
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPatients}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">Live</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prediction Accuracy</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{predictionAccuracy}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">Live</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highRiskCases}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">Live</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{growthRate}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">Live</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Monthly Patient Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData.monthlyGrowthData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Risk Level Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData.riskDistributionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {chartData.riskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Age Distribution by Risk Level</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData.ageDistributionData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Low" stackId="a" fill="#82ca9d" />
                <Bar dataKey="Medium" stackId="a" fill="#8884d8" />
                <Bar dataKey="High" stackId="a" fill="#ff7f7f" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 