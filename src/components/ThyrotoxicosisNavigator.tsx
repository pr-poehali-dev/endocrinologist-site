import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type DiagnosisType = 'graves' | 'hashitoxicosis' | 'unclear';

export const ThyrotoxicosisNavigator = () => {
  const [tsh, setTsh] = useState('');
  const [atRttg, setAtRttg] = useState('');
  const [ultrasound, setUltrasound] = useState<'increased' | 'normal' | ''>('');
  const [redFlags, setRedFlags] = useState({
    photophobia: false,
    exophthalmos: false,
    eyelidSwelling: false,
  });
  const [result, setResult] = useState<{
    diagnosis: DiagnosisType;
    confidence: number;
    recommendations: string[];
    therapy: string;
    monitoring: string[];
    redFlagsAlert: boolean;
  } | null>(null);

  const analyzeThyrotoxicosis = () => {
    const tshNum = parseFloat(tsh);
    const atRttgNum = parseFloat(atRttg);

    if (isNaN(tshNum)) {
      return;
    }

    let diagnosis: DiagnosisType = 'unclear';
    let confidence = 0;
    let recommendations: string[] = [];
    let therapy = '';
    let monitoring: string[] = [];
    const redFlagsPresent = Object.values(redFlags).some((flag) => flag);

    if (tshNum < 0.1) {
      if (!isNaN(atRttgNum) && atRttgNum > 1.5 && ultrasound === 'increased') {
        diagnosis = 'graves';
        confidence = 90;
        therapy = 'Тирозол 30-40 мг/сут (схема «блокируй») или Тирозол + L-тироксин (схема «блокируй и замещай»)';
        recommendations = [
          'Начать терапию тиреостатиками (Тирозол/Мерказолил)',
          'ОАК (контроль лейкоцитов) — каждые 2 недели в первый месяц',
          'Риск агранулоцитоза — предупредить пациента о симптомах (боль в горле, температура)',
          'Бета-блокаторы для контроля симптомов (Бисопролол 2.5-5 мг или Анаприлин 40 мг 3 р/д)',
          'Контроль ТТГ, Т4св через 4-6 недель',
        ];
        monitoring = [
          'ОАК через 14 дней',
          'ТТГ, Т4св через 4-6 недель',
          'Осмотр офтальмолога (профилактика офтальмопатии)',
        ];
      } else if (ultrasound === 'normal' || atRttgNum <= 1.5) {
        diagnosis = 'hashitoxicosis';
        confidence = 75;
        therapy = 'Бета-блокаторы (Бисопролол 2.5-5 мг или Анаприлин 40 мг 3 р/д)';
        recommendations = [
          'Тиреостатики НЕ показаны (деструктивный тиреоидит)',
          'Симптоматическая терапия: бета-блокаторы для снятия симптомов',
          'Состояние пройдет само через 2-4 месяца',
          'После разрешения тиреотоксикоза ожидается гипотиреоз',
          'Контроль ТТГ через 1 месяц, затем каждые 2 месяца',
        ];
        monitoring = [
          'ТТГ через 1 месяц',
          'ТТГ каждые 2 месяца до нормализации',
          'Подготовка к назначению L-тироксина при развитии гипотиреоза',
        ];
      } else {
        diagnosis = 'unclear';
        confidence = 50;
        therapy = 'Требуется дообследование';
        recommendations = [
          'Недостаточно данных для точной диагностики',
          'Рекомендовано: УЗИ щитовидной железы с ЦДК (цветное допплеровское картирование)',
          'Определить АТ-рТТГ (антитела к рецепторам ТТГ)',
          'Возможна сцинтиграфия щитовидной железы для дифференциальной диагностики',
          'До уточнения диагноза — бета-блокаторы для контроля симптомов',
        ];
        monitoring = ['Повторная консультация после получения результатов обследования'];
      }
    } else {
      recommendations = [
        'ТТГ не в диапазоне тиреотоксикоза',
        'При ТТГ ≥ 0.1 диагноз тиреотоксикоза маловероятен',
        'Рекомендован пересмотр диагноза или повторное исследование ТТГ',
      ];
      monitoring = ['Контроль ТТГ через 1-2 недели'];
    }

    setResult({
      diagnosis,
      confidence,
      recommendations,
      therapy,
      monitoring,
      redFlagsAlert: redFlagsPresent,
    });
  };

  const reset = () => {
    setTsh('');
    setAtRttg('');
    setUltrasound('');
    setRedFlags({
      photophobia: false,
      exophthalmos: false,
      eyelidSwelling: false,
    });
    setResult(null);
  };

  const getDiagnosisLabel = (diagnosis: DiagnosisType) => {
    switch (diagnosis) {
      case 'graves':
        return 'Болезнь Грейвса';
      case 'hashitoxicosis':
        return 'Хашитоксикоз (деструктивный тиреоидит)';
      default:
        return 'Требуется дообследование';
    }
  };

  const getDiagnosisColor = (diagnosis: DiagnosisType) => {
    switch (diagnosis) {
      case 'graves':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'hashitoxicosis':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card className="rounded-3xl border-2">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Icon name="Stethoscope" className="text-primary" size={24} />
          </div>
          <div>
            <CardTitle>EndoNavigator: Тиреотоксикоз</CardTitle>
            <CardDescription>
              Дифференциальная диагностика и выбор терапии
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tsh-thyro">ТТГ (мМЕ/л)</Label>
            <Input
              id="tsh-thyro"
              type="number"
              step="0.01"
              placeholder="0.05"
              value={tsh}
              onChange={(e) => setTsh(e.target.value)}
              className="rounded-xl"
            />
            <p className="text-xs text-muted-foreground">
              Норма: 0.4-4.0 мМЕ/л | Тиреотоксикоз: &lt; 0.1
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="at-rttg">АТ-рТТГ (Ед/л)</Label>
            <Input
              id="at-rttg"
              type="number"
              step="0.1"
              placeholder="3.5"
              value={atRttg}
              onChange={(e) => setAtRttg(e.target.value)}
              className="rounded-xl"
            />
            <p className="text-xs text-muted-foreground">
              Норма: &lt; 1.5 Ед/л | Повышение → Болезнь Грейвса
            </p>
          </div>

          <div className="space-y-3">
            <Label>УЗИ щитовидной железы с ЦДК</Label>
            <RadioGroup value={ultrasound} onValueChange={(v) => setUltrasound(v as any)}>
              <div className="flex items-center space-x-2 p-3 rounded-xl hover:bg-muted/50">
                <RadioGroupItem value="increased" id="ultrasound-increased" />
                <Label htmlFor="ultrasound-increased" className="cursor-pointer flex-1">
                  Усилен кровоток (гиперваскуляризация)
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-xl hover:bg-muted/50">
                <RadioGroupItem value="normal" id="ultrasound-normal" />
                <Label htmlFor="ultrasound-normal" className="cursor-pointer flex-1">
                  Кровоток нормальный или снижен
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="p-4 bg-muted/50 rounded-2xl space-y-3">
            <p className="font-semibold text-sm flex items-center gap-2">
              <Icon name="AlertTriangle" size={18} className="text-red-500" />
              Красные флаги офтальмопатии
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-background">
                <Checkbox
                  id="photophobia"
                  checked={redFlags.photophobia}
                  onCheckedChange={(checked) =>
                    setRedFlags({ ...redFlags, photophobia: checked as boolean })
                  }
                />
                <Label htmlFor="photophobia" className="cursor-pointer flex-1 text-sm">
                  Светобоязнь, «песок» в глазах
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-background">
                <Checkbox
                  id="exophthalmos"
                  checked={redFlags.exophthalmos}
                  onCheckedChange={(checked) =>
                    setRedFlags({ ...redFlags, exophthalmos: checked as boolean })
                  }
                />
                <Label htmlFor="exophthalmos" className="cursor-pointer flex-1 text-sm">
                  Экзофтальм (выпячивание глаз)
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-background">
                <Checkbox
                  id="eyelid-swelling"
                  checked={redFlags.eyelidSwelling}
                  onCheckedChange={(checked) =>
                    setRedFlags({ ...redFlags, eyelidSwelling: checked as boolean })
                  }
                />
                <Label htmlFor="eyelid-swelling" className="cursor-pointer flex-1 text-sm">
                  Отечность век по утрам
                </Label>
              </div>
            </div>
          </div>
        </div>

        {result && (
          <div className="space-y-4 animate-fade-in">
            {result.redFlagsAlert && (
              <Alert className="border-2 border-red-500 bg-red-50 rounded-2xl">
                <Icon name="AlertCircle" className="text-red-600" />
                <AlertTitle className="text-red-800 font-bold">
                  СРОЧНО: Признаки эндокринной офтальмопатии!
                </AlertTitle>
                <AlertDescription className="text-red-700">
                  Немедленное направление к офтальмологу. Может потребоваться пульс-терапия
                  глюкокортикоидами. Офтальмопатия лечится не только Тирозолом!
                </AlertDescription>
              </Alert>
            )}

            <div className="p-5 bg-primary/10 rounded-2xl border-2 border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Target" className="text-primary" size={20} />
                <p className="font-bold text-lg">Диагноз</p>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-4 py-2 rounded-full border-2 font-semibold ${getDiagnosisColor(result.diagnosis)}`}>
                  {getDiagnosisLabel(result.diagnosis)}
                </span>
                {result.confidence > 0 && (
                  <Badge variant="outline" className="text-sm">
                    Вероятность: {result.confidence}%
                  </Badge>
                )}
              </div>
            </div>

            {result.therapy && (
              <div className="p-4 bg-secondary/30 rounded-2xl space-y-2">
                <p className="font-semibold flex items-center gap-2">
                  <Icon name="Pill" size={18} className="text-primary" />
                  Рекомендуемая терапия
                </p>
                <p className="text-sm bg-background p-3 rounded-xl">{result.therapy}</p>
              </div>
            )}

            <div className="p-4 bg-accent/50 rounded-2xl space-y-3">
              <p className="font-semibold flex items-center gap-2">
                <Icon name="ClipboardList" size={18} className="text-primary" />
                План ведения пациента
              </p>
              <ul className="space-y-2">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {result.monitoring.length > 0 && (
              <div className="p-4 bg-blue-50 rounded-2xl border-2 border-blue-200 space-y-2">
                <p className="font-semibold flex items-center gap-2 text-blue-800">
                  <Icon name="Calendar" size={18} />
                  График контроля
                </p>
                <ul className="space-y-1">
                  {result.monitoring.map((mon, idx) => (
                    <li key={idx} className="text-sm text-blue-700 flex items-start gap-2">
                      <Icon name="Clock" size={14} className="mt-0.5 flex-shrink-0" />
                      <span>{mon}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={analyzeThyrotoxicosis} className="flex-1 rounded-2xl h-12" size="lg">
            <Icon name="Activity" size={18} className="mr-2" />
            Провести анализ
          </Button>
          <Button onClick={reset} variant="outline" className="rounded-2xl h-12" size="lg">
            <Icon name="RotateCcw" size={18} />
          </Button>
        </div>

        <div className="p-4 bg-muted/50 rounded-2xl">
          <p className="text-xs text-muted-foreground">
            <strong>Важно:</strong> Этот инструмент является справочным и не заменяет клинического
            мышления. Окончательное решение о диагнозе и терапии принимает лечащий врач на основании
            полной клинической картины.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
