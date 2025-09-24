import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChartDataPoint } from '../types';
import { useCurrency, useLanguage, useSettings } from '../contexts';
import { translations } from '../translations';

interface ChartProps {
  data: ChartDataPoint[];
  color: string;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  const { lang } = useLanguage();
  const { currency } = useCurrency();
  const t = translations[lang];

  if (active && payload && payload.length) {
    const formattedPrice = new Intl.NumberFormat(lang === 'pt' ? 'pt-BR' : 'en-US', {
        style: 'currency',
        currency: currency,
    }).format(payload[0].value);

    return (
      <div className="bg-white dark:bg-slate-800 p-2 border border-gray-200 dark:border-slate-700 rounded-md shadow-lg">
        <p className="label text-gray-600 dark:text-slate-300">{`${t.chartDate}: ${label}`}</p>
        <p className="intro text-sky-500 dark:text-sky-400 font-bold">{`${t.chartPrice}: ${formattedPrice}`}</p>
      </div>
    );
  }
  return null;
};


const Chart: React.FC<ChartProps> = ({ data, color }) => {
  const { lang } = useLanguage();
  const { currency } = useCurrency();
  const { theme } = useSettings();

  const tickColor = theme === 'dark' ? '#94a3b8' : '#6b7280';
  const axisColor = theme === 'dark' ? '#475569' : '#d1d5db';
  const gridColor = theme === 'dark' ? '#334155' : '#e5e7eb';


  const yAxisTickFormatter = (tick: number) => {
    return new Intl.NumberFormat(lang === 'pt' ? 'pt-BR' : 'en-US', {
        style: 'currency',
        currency: currency,
        notation: 'compact',
        compactDisplay: 'short'
    }).format(tick);
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="date" tick={{ fill: tickColor }} fontSize={12} axisLine={{ stroke: axisColor }} tickLine={{ stroke: axisColor }} />
        <YAxis tick={{ fill: tickColor }} fontSize={12} axisLine={{ stroke: axisColor }} tickLine={{ stroke: axisColor }} domain={['dataMin - dataMin * 0.05', 'dataMax + dataMax * 0.05']} tickFormatter={yAxisTickFormatter} />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="price" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
