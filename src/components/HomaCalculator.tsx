import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export const HomaCalculator = () => {
  const [glucose, setGlucose] = useState('');
  const [insulin, setInsulin] = useState('');
  const [result, setResult] = useState<{
    homaIR: number;
    interpretation: string;
    status: 'normal' | 'warning' | 'danger';
  } | null>(null);

  const calculateHoma = () => {
    const glucoseNum = parseFloat(glucose);
    const insulinNum = parseFloat(insulin);

    if (isNaN(glucoseNum) || isNaN(insulinNum)) {
      return;
    }

    const homaIR = (glucoseNum * insulinNum) / 22.5;
    const homaValue = Math.round(homaIR * 100) / 100;

    let interpretation = '';
    let status: 'normal' | 'warning' | 'danger' = 'normal';

    if (homaValue < 2.0) {
      interpretation = 'Норма — инсулинорезистентности нет';
      status = 'normal';
    } else if (homaValue >= 2.0 && homaValue < 2.7) {
      interpretation = 'Пограничное значение — возможна ранняя ИР';
      status = 'warning';
    } else {
      interpretation = 'Инсулинорезистентность подтверждена';
      status = 'danger';
    }

    setResult({
      homaIR: homaValue,
      interpretation,
      status,
    });
  };

  const reset = () => {
    setGlucose('');
    setInsulin('');
    setResult(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'danger':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="rounded-3xl border-2">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Icon name="Activity" className="text-primary" size={24} />
          </div>
          <div>
            <CardTitle>Калькулятор индекса HOMA-IR</CardTitle>
            <CardDescription>Оценка инсулинорезистентности</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="glucose-homa">Глюкоза натощак (ммоль/л)</Label>
            <Input
              id="glucose-homa"
              type="number"
              step="0.1"
              placeholder="5.5"
              value={glucose}
              onChange={(e) => setGlucose(e.target.value)}
              className="rounded-xl"
            />
            <p className="text-xs text-muted-foreground">Норма: 3.3-5.5 ммоль/л</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="insulin-homa">Инсулин натощак (мкЕд/мл)</Label>
            <Input
              id="insulin-homa"
              type="number"
              step="0.1"
              placeholder="10.5"
              value={insulin}
              onChange={(e) => setInsulin(e.target.value)}
              className="rounded-xl"
            />
            <p className="text-xs text-muted-foreground">Норма: 2.6-24.9 мкЕд/мл</p>
          </div>
        </div>

        <div className="p-4 bg-muted/50 rounded-2xl">
          <p className="text-sm font-semibold mb-2">Формула HOMA-IR</p>
          <code className="text-xs bg-background p-2 rounded-lg block">
            HOMA-IR = (Глюкоза × Инсулин) / 22.5
          </code>
        </div>

        {result && (
          <div className="space-y-3 animate-fade-in">
            <div className="p-5 bg-primary/10 rounded-2xl border-2 border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="TrendingUp" className="text-primary" size={20} />
                <p className="font-bold text-lg">Результат</p>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">{result.homaIR}</span>
                <span className="text-muted-foreground">HOMA-IR</span>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border-2 ${getStatusColor(result.status)}`}>
              <div className="flex items-start gap-3">
                <Icon
                  name={
                    result.status === 'normal'
                      ? 'CheckCircle'
                      : result.status === 'warning'
                      ? 'AlertTriangle'
                      : 'XCircle'
                  }
                  size={24}
                />
                <div>
                  <p className="font-semibold mb-1">Интерпретация</p>
                  <p className="text-sm">{result.interpretation}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-secondary/30 rounded-2xl space-y-2">
              <p className="text-sm font-semibold">Справочные значения:</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>&lt; 2.0</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                    Норма
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>2.0 - 2.7</span>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                    Пограничное
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>&gt; 2.7</span>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
                    ИР
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={calculateHoma} className="flex-1 rounded-2xl h-12" size="lg">
            <Icon name="Calculator" size={18} className="mr-2" />
            Рассчитать HOMA-IR
          </Button>
          <Button onClick={reset} variant="outline" className="rounded-2xl h-12" size="lg">
            <Icon name="RotateCcw" size={18} />
          </Button>
        </div>

        <div className="p-4 bg-accent/50 rounded-2xl">
          <p className="text-xs text-muted-foreground">
            <strong>Примечание:</strong> Анализы должны быть сданы строго натощак (8-12 часов
            голодания). Результат интерпретируется в комплексе с клинической картиной.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
