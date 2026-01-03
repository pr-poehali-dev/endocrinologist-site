import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const cheatsheets = [
    {
      id: 1,
      title: 'Норма гормонов щитовидной железы',
      category: 'Анализы',
      icon: 'Activity',
      content: [
        { name: 'ТТГ', range: '0.4-4.0 мМЕ/л', note: 'Основной скрининг' },
        { name: 'Т4 свободный', range: '9-19 пмоль/л', note: 'При отклонении ТТГ' },
        { name: 'Т3 свободный', range: '2.6-5.7 пмоль/л', note: 'Редко используется' },
      ]
    },
    {
      id: 2,
      title: 'Дозировки левотироксина',
      category: 'Препараты',
      icon: 'Pill',
      content: [
        { name: 'Начальная доза', range: '25-50 мкг/сут', note: 'Пожилые и с ИБС' },
        { name: 'Стандартная доза', range: '75-100 мкг/сут', note: 'Молодые без патологий' },
        { name: 'Контроль ТТГ', range: 'Через 6-8 недель', note: 'После начала терапии' },
      ]
    },
    {
      id: 3,
      title: 'Сахарный диабет: критерии',
      category: 'Диагностика',
      icon: 'Syringe',
      content: [
        { name: 'Глюкоза натощак', range: '≥7.0 ммоль/л', note: 'Двукратно' },
        { name: 'HbA1c', range: '≥6.5%', note: 'Гликированный гемоглобин' },
        { name: 'Глюкоза случайная', range: '≥11.1 ммоль/л', note: 'С симптомами' },
      ]
    },
    {
      id: 4,
      title: 'Тиреотоксикоз: первая помощь',
      category: 'Неотложка',
      icon: 'AlertCircle',
      content: [
        { name: 'Тиреостатики', range: 'Тиамазол 30-40 мг', note: 'Начальная доза' },
        { name: 'Бета-блокаторы', range: 'Пропранолол 40 мг', note: '3-4 раза в день' },
        { name: 'Контроль', range: 'ТТГ, Т4св через 4 нед', note: 'Коррекция дозы' },
      ]
    },
    {
      id: 5,
      title: 'Остеопороз: профилактика',
      category: 'Рекомендации',
      icon: 'Bone',
      content: [
        { name: 'Кальций', range: '1000-1200 мг/сут', note: 'С пищей или добавки' },
        { name: 'Витамин D', range: '800-2000 МЕ/сут', note: 'Ежедневно' },
        { name: 'Денситометрия', range: 'Женщины >65 лет', note: 'Скрининг' },
      ]
    },
    {
      id: 6,
      title: 'Метформин: правила назначения',
      category: 'Препараты',
      icon: 'Pill',
      content: [
        { name: 'Начальная доза', range: '500-850 мг/сут', note: 'Во время еды' },
        { name: 'Целевая доза', range: '2000-2500 мг/сут', note: 'Разделить на 2-3 приема' },
        { name: 'Контроль СКФ', range: '>60 мл/мин', note: 'Противопоказан при <30' },
      ]
    },
  ];

  const specialists = [
    {
      id: 1,
      name: 'Иванова Мария Сергеевна',
      specialty: 'Эндокринолог, д.м.н.',
      experience: '25 лет',
      avatar: '',
      initials: 'ИМ',
      expertise: ['Диабетология', 'Тиреоидология'],
    },
    {
      id: 2,
      name: 'Петров Алексей Викторович',
      specialty: 'Эндокринолог, к.м.н.',
      experience: '15 лет',
      avatar: '',
      initials: 'ПА',
      expertise: ['Надпочечники', 'Репродуктивная эндокринология'],
    },
    {
      id: 3,
      name: 'Смирнова Елена Дмитриевна',
      specialty: 'Эндокринолог',
      experience: '10 лет',
      avatar: '',
      initials: 'СЕ',
      expertise: ['Щитовидная железа', 'Остеопороз'],
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Как интерпретировать анализы щитовидной железы',
      excerpt: 'Пошаговый алгоритм расшифровки ТТГ, Т4 и Т3 для начинающих врачей',
      date: '15 декабря 2025',
      category: 'Диагностика',
      readTime: '5 мин',
    },
    {
      id: 2,
      title: 'Частые ошибки при лечении сахарного диабета 2 типа',
      excerpt: 'Разбор клинических случаев и рекомендации по коррекции терапии',
      date: '10 декабря 2025',
      category: 'Терапия',
      readTime: '8 мин',
    },
    {
      id: 3,
      title: 'Тиреотоксический криз: пошаговая тактика',
      excerpt: 'Неотложная помощь и ведение пациента в стационаре',
      date: '5 декабря 2025',
      category: 'Неотложка',
      readTime: '6 мин',
    },
  ];

  const filteredCheatsheets = cheatsheets.filter(
    (sheet) =>
      sheet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sheet.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 via-background to-accent/20">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
                <Icon name="Stethoscope" className="text-primary-foreground" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">ЭндоШпаргалка</h1>
                <p className="text-sm text-muted-foreground">Справочник для эндокринологов</p>
              </div>
            </div>
            <Button variant="outline" className="rounded-full">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Руководства
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 animate-fade-in">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Быстрый доступ к важной информации
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Нормы анализов, дозировки препаратов, алгоритмы диагностики — всё в одном месте
            </p>
            <div className="relative max-w-xl mx-auto">
              <Icon
                name="Search"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <Input
                type="text"
                placeholder="Поиск по шпаргалкам: гормоны, препараты, диагностика..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg rounded-2xl border-2 focus:border-primary transition-all"
              />
            </div>
          </div>
        </section>

        <Tabs defaultValue="cheatsheets" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 h-12 rounded-2xl">
            <TabsTrigger value="cheatsheets" className="rounded-xl">
              <Icon name="FileText" size={18} className="mr-2" />
              Шпаргалки
            </TabsTrigger>
            <TabsTrigger value="specialists" className="rounded-xl">
              <Icon name="Users" size={18} className="mr-2" />
              Специалисты
            </TabsTrigger>
            <TabsTrigger value="blog" className="rounded-xl">
              <Icon name="BookMarked" size={18} className="mr-2" />
              Блог
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cheatsheets" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCheatsheets.map((sheet) => (
                <Card
                  key={sheet.id}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-3xl border-2 overflow-hidden"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Icon name={sheet.icon} className="text-primary" size={24} />
                      </div>
                      <Badge variant="secondary" className="rounded-full">
                        {sheet.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{sheet.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sheet.content.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-semibold text-sm">{item.name}</span>
                            <span className="text-primary font-bold text-sm">{item.range}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{item.note}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredCheatsheets.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" className="mx-auto text-muted-foreground mb-4" size={48} />
                <p className="text-lg text-muted-foreground">
                  Ничего не найдено. Попробуйте другой запрос
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="specialists" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialists.map((specialist) => (
                <Card
                  key={specialist.id}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-3xl border-2"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-16 h-16 border-4 border-primary/20">
                        <AvatarImage src={specialist.avatar} alt={specialist.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                          {specialist.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{specialist.name}</CardTitle>
                        <CardDescription>{specialist.specialty}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Briefcase" size={16} className="text-primary" />
                        <span className="text-muted-foreground">Опыт: {specialist.experience}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-2">Специализация:</p>
                        <div className="flex flex-wrap gap-2">
                          {specialist.expertise.map((exp, idx) => (
                            <Badge key={idx} variant="outline" className="rounded-full">
                              {exp}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full mt-4 rounded-2xl" variant="outline">
                        <Icon name="MessageCircle" size={18} className="mr-2" />
                        Задать вопрос
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="blog" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Card
                  key={post.id}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-3xl border-2 cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="rounded-full">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                    <CardDescription className="text-base">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                      <Button variant="ghost" size="sm" className="rounded-full">
                        Читать
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t mt-16 py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2026 ЭндоШпаргалка. Справочная информация для врачей-эндокринологов
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Не является руководством к самолечению. Требуется консультация специалиста.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
