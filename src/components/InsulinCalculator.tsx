import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export const InsulinCalculator = () => {
  const [weight, setWeight] = useState('');
  const [glucose, setGlucose] = useState('');
  const [targetGlucose, setTargetGlucose] = useState('5.5');
  const [carbIntakeCoef, setCarbIntakeCoef] = useState('12');
  const [correctionCoef, setCorrectionCoef] = useState('2.5');
  const [carbs, setCarbs] = useState('');
  const [result, setResult] = useState<{
    bolus: number;
    correction: number;
    total: number;
  } | null>(null);

  const calculateDose = () => {
    const weightNum = parseFloat(weight);
    const glucoseNum = parseFloat(glucose);
    const targetNum = parseFloat(targetGlucose);
    const carbIntakeNum = parseFloat(carbIntakeCoef);
    const correctionNum = parseFloat(correctionCoef);
    const carbsNum = parseFloat(carbs);

    if (isNaN(weightNum) || isNaN(glucoseNum) || isNaN(carbsNum)) {
      return;
    }

    const bolusForCarbs = carbsNum / carbIntakeNum;
    const correctionDose = Math.max(0, (glucoseNum - targetNum) / correctionNum);
    const totalDose = bolusForCarbs + correctionDose;

    setResult({
      bolus: Math.round(bolusForCarbs * 10) / 10,
      correction: Math.round(correctionDose * 10) / 10,
      total: Math.round(totalDose * 10) / 10,
    });
  };

  const reset = () => {
    setWeight('');
    setGlucose('');
    setCarbs('');
    setResult(null);
  };

  return (
    <Card className="rounded-3xl border-2">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Icon name="Calculator" className="text-primary" size={24} />
          </div>
          <div>
            <CardTitle>Калькулятор дозы инсулина</CardTitle>
            <CardDescription>Расчет болюсной дозы на еду и коррекция</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Вес пациента (кг)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="glucose">Глюкоза крови сейчас (ммоль/л)</Label>
            <Input
              id="glucose"
              type="number"
              step="0.1"
              placeholder="8.5"
              value={glucose}
              onChange={(e) => setGlucose(e.target.value)}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="carbs">Углеводы в приеме пищи (г)</Label>
            <Input
              id="carbs"
              type="number"
              placeholder="60"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target">Целевая глюкоза (ммоль/л)</Label>
            <Input
              id="target"
              type="number"
              step="0.1"
              placeholder="5.5"
              value={targetGlucose}
              onChange={(e) => setTargetGlucose(e.target.value)}
              className="rounded-xl"
            />
          </div>
        </div>

        <div className="p-4 bg-muted/50 rounded-2xl space-y-2">
          <p className="text-sm font-semibold">Коэффициенты (настройка)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="carbIntake" className="text-xs">
                УИК (углеводный коэф.)
              </Label>
              <Input
                id="carbIntake"
                type="number"
                step="0.5"
                value={carbIntakeCoef}
                onChange={(e) => setCarbIntakeCoef(e.target.value)}
                className="rounded-xl h-9"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="correction" className="text-xs">
                ФЧИ (фактор чувствительности)
              </Label>
              <Input
                id="correction"
                type="number"
                step="0.1"
                value={correctionCoef}
                onChange={(e) => setCorrectionCoef(e.target.value)}
                className="rounded-xl h-9"
              />
            </div>
          </div>
        </div>

        {result && (
          <div className="p-5 bg-primary/10 rounded-2xl space-y-3 animate-fade-in border-2 border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="CheckCircle" className="text-primary" size={20} />
              <p className="font-bold text-lg">Результат расчета</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-background rounded-xl">
                <span className="text-sm">Болюс на углеводы:</span>
                <span className="font-bold text-primary text-lg">{result.bolus} ЕД</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-background rounded-xl">
                <span className="text-sm">Коррекционная доза:</span>
                <span className="font-bold text-primary text-lg">{result.correction} ЕД</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-primary/20 rounded-xl border-2 border-primary/30">
                <span className="font-semibold">Итоговая доза:</span>
                <span className="font-bold text-primary text-xl">{result.total} ЕД</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={calculateDose} className="flex-1 rounded-2xl h-12" size="lg">
            <Icon name="Calculator" size={18} className="mr-2" />
            Рассчитать
          </Button>
          <Button
            onClick={reset}
            variant="outline"
            className="rounded-2xl h-12"
            size="lg"
          >
            <Icon name="RotateCcw" size={18} />
          </Button>
        </div>

        <div className="p-4 bg-accent/50 rounded-2xl">
          <p className="text-xs text-muted-foreground">
            <strong>Примечание:</strong> Расчет носит справочный характер. Индивидуальные
            коэффициенты подбираются врачом на основании гликемического профиля.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
