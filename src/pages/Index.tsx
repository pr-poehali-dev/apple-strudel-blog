import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [servings, setServings] = useState(8);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const baseServings = 8;
  const multiplier = servings / baseServings;

  const scaleIngredient = (ingredient: string): string => {
    const match = ingredient.match(/^(\d+(?:\.\d+)?)\s*([а-яА-Я\s.]+)\s+(.+)$/);
    if (match) {
      const amount = parseFloat(match[1]);
      const unit = match[2];
      const name = match[3];
      const scaled = Math.round(amount * multiplier * 10) / 10;
      return `${scaled} ${unit} ${name}`;
    }
    return ingredient;
  };

  const recipe = {
    title: 'Классический Яблочный Штрудель',
    subtitle: 'Австрийский десерт с хрустящим тестом и ароматной начинкой',
    prepTime: '45 минут',
    cookTime: '35 минут',
    servings: '6-8 порций',
    difficulty: 'Средняя',
  };

  const ingredients = [
    { category: 'Для теста', items: ['300 г муки', '150 мл тёплой воды', '2 ст.л. растительного масла', '1 ч.л. соли', '1 яйцо'] },
    { category: 'Для начинки', items: ['1 кг яблок (лучше Антоновка)', '100 г сахара', '100 г изюма', '80 г грецких орехов', '2 ч.л. корицы', '50 г панировочных сухарей', '80 г сливочного масла'] },
    { category: 'Для подачи', items: ['Сахарная пудра', 'Ванильное мороженое'] }
  ];

  const steps = [
    { title: 'Приготовление теста', time: '15 мин', description: 'Смешайте муку, соль, яйцо, воду и масло. Замесите эластичное тесто, накройте плёнкой и оставьте отдыхать на 30 минут при комнатной температуре.' },
    { title: 'Подготовка начинки', time: '10 мин', description: 'Очистите яблоки, нарежьте тонкими дольками. Добавьте сахар, корицу, изюм и рубленые орехи. Перемешайте.' },
    { title: 'Раскатка теста', time: '10 мин', description: 'На присыпанном мукой столе раскатайте тесто максимально тонко. Смажьте растопленным маслом и посыпьте сухарями.' },
    { title: 'Формирование штруделя', time: '5 мин', description: 'Выложите начинку вдоль края теста. Аккуратно сверните рулет, используя полотенце. Переложите на противень швом вниз.' },
    { title: 'Выпекание', time: '35 мин', description: 'Смажьте штрудель маслом. Выпекайте при 180°C до золотистой корочки. Остудите 10 минут перед нарезкой.' }
  ];

  const chefTips = [
    { icon: 'Lightbulb', title: 'Выбор яблок', text: 'Используйте кислые сорта — Антоновка, Гренни Смит или Симиренко. Они сохраняют форму при выпекании и не превращаются в кашу.' },
    { icon: 'ThermometerSun', title: 'Температура теста', text: 'Все ингредиенты для теста должны быть комнатной температуры. Это ключ к эластичности теста и его способности тянуться.' },
    { icon: 'Clock3', title: 'Отдых теста', text: 'Не пропускайте этап отдыха теста! За 30 минут клейковина расслабится, и тесто можно будет растянуть до прозрачности.' },
    { icon: 'Droplets', title: 'Секрет хрустящей корочки', text: 'Обильно смазывайте слои теста растопленным маслом и посыпайте сухарями — они впитают лишнюю влагу из яблок.' },
    { icon: 'Flame', title: 'Правильная подача', text: 'Подавайте штрудель тёплым с шариком ванильного мороженого или взбитыми сливками. Контраст температур — это волшебство!' },
    { icon: 'Refrigerator', title: 'Хранение', text: 'Храните остывший штрудель в холодильнике до 3 дней. Перед подачей разогрейте в духовке 10 минут при 160°C.' }
  ];

  const gallery = [
    { url: 'https://cdn.poehali.dev/projects/d96d6b12-d163-4b8a-a4d6-c8c1768ef193/files/ac032ffa-5cbd-40f9-83af-98a43e7fea40.jpg', caption: 'Готовый штрудель с золотистой корочкой' },
    { url: 'https://cdn.poehali.dev/projects/d96d6b12-d163-4b8a-a4d6-c8c1768ef193/files/dc22f049-3ab0-43b2-9137-e4f734530a8e.jpg', caption: 'Свежие ингредиенты для начинки' },
    { url: 'https://cdn.poehali.dev/projects/d96d6b12-d163-4b8a-a4d6-c8c1768ef193/files/daf4bc3f-3391-4556-9d60-bd2d5acbc984.jpg', caption: 'Идеальная подача с мороженым' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold tracking-tight">Вкусные Рецепты</h1>
            <div className="flex gap-6">
              <a href="#recipe" className="text-sm hover:text-primary transition-colors">Рецепты</a>
              <a href="#gallery" className="text-sm hover:text-primary transition-colors">Галерея</a>
              <a href="#subscribe" className="text-sm hover:text-primary transition-colors">Подписка</a>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://cdn.poehali.dev/projects/d96d6b12-d163-4b8a-a4d6-c8c1768ef193/files/ac032ffa-5cbd-40f9-83af-98a43e7fea40.jpg" 
            alt="Яблочный штрудель" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <Badge className="mb-4 bg-primary text-white">Лучший рецепт недели</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gray-900">{recipe.title}</h1>
          <p className="text-xl text-gray-700 mb-8">{recipe.subtitle}</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
            <Icon name="ChefHat" size={20} className="mr-2" />
            Начать готовить
          </Button>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Icon name="Clock" size={32} className="mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Подготовка</p>
              <p className="font-semibold">{recipe.prepTime}</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Icon name="Timer" size={32} className="mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Приготовление</p>
              <p className="font-semibold">{recipe.cookTime}</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Icon name="Users" size={32} className="mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Порций</p>
              <p className="font-semibold">{recipe.servings}</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Icon name="TrendingUp" size={32} className="mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Сложность</p>
              <p className="font-semibold">{recipe.difficulty}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-center text-muted-foreground mb-2">Реклама</p>
          <div className="h-24 bg-white border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
            <p className="text-gray-400">Яндекс.Директ / Google Ads</p>
          </div>
        </div>

        <section id="recipe" className="mb-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-4xl font-bold mb-4 md:mb-0">Ингредиенты</h2>
            <Card className="bg-secondary border-primary">
              <CardContent className="py-4 px-6">
                <div className="flex items-center gap-4">
                  <label className="font-semibold text-sm whitespace-nowrap">Количество порций:</label>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setServings(Math.max(2, servings - 2))}
                      disabled={servings <= 2}
                    >
                      <Icon name="Minus" size={16} />
                    </Button>
                    <Input 
                      type="number" 
                      value={servings} 
                      onChange={(e) => setServings(Math.max(2, parseInt(e.target.value) || 2))}
                      className="w-16 text-center font-bold"
                      min="2"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setServings(Math.min(20, servings + 2))}
                      disabled={servings >= 20}
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            {ingredients.map((group, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary">{group.category}</h3>
                  <ul className="space-y-3">
                    {group.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Icon name="Check" size={20} className="mr-3 text-primary mt-0.5 flex-shrink-0" />
                        <span>{scaleIngredient(item)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-center text-muted-foreground mb-2">Реклама</p>
          <div className="h-24 bg-white border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
            <p className="text-gray-400">Яндекс.Директ / Google Ads</p>
          </div>
        </div>

        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8">Пошаговое приготовление</h2>
          <div className="space-y-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                    {idx + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                    <Badge variant="outline" className="text-xs">{step.time}</Badge>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  {idx < steps.length - 1 && <Separator className="mt-8" />}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary text-white">Советы от шеф-повара</Badge>
            <h2 className="text-4xl font-bold mb-4">Секреты идеального штруделя</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Профессиональные рекомендации для безупречного результата
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chefTips.map((tip, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <Icon name={tip.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{tip.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="gallery" className="mb-20">
          <h2 className="text-4xl font-bold mb-8">Галерея</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gallery.map((image, idx) => (
              <div key={idx} className="group cursor-pointer overflow-hidden rounded-lg">
                <img 
                  src={image.url} 
                  alt={image.caption}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <p className="mt-2 text-sm text-center text-gray-600">{image.caption}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-center text-muted-foreground mb-2">Реклама</p>
          <div className="h-24 bg-white border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
            <p className="text-gray-400">Яндекс.Директ / Google Ads</p>
          </div>
        </div>

        <section id="subscribe" className="mb-16">
          <Card className="bg-secondary border-none">
            <CardContent className="pt-12 pb-12 text-center">
              <Icon name="Mail" size={48} className="mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-4">Подпишитесь на новые рецепты</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Получайте лучшие рецепты и кулинарные советы прямо на почту
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white"
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white whitespace-nowrap">
                  Подписаться
                </Button>
              </form>
              {subscribed && (
                <p className="mt-4 text-green-600 font-medium animate-fade-in">
                  ✓ Спасибо за подписку!
                </p>
              )}
            </CardContent>
          </Card>
        </section>
      </div>

      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Вкусные Рецепты</h3>
              <p className="text-sm text-gray-600">Лучшие кулинарные рецепты со всего мира</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Разделы</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#recipe" className="hover:text-primary transition-colors">Рецепты</a></li>
                <li><a href="#gallery" className="hover:text-primary transition-colors">Галерея</a></li>
                <li><a href="#subscribe" className="hover:text-primary transition-colors">Подписка</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="flex gap-4">
                <Icon name="Instagram" size={20} className="text-gray-600 hover:text-primary cursor-pointer transition-colors" />
                <Icon name="Facebook" size={20} className="text-gray-600 hover:text-primary cursor-pointer transition-colors" />
                <Icon name="Youtube" size={20} className="text-gray-600 hover:text-primary cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          <Separator className="mb-8" />
          <p className="text-center text-sm text-gray-500">© 2024 Вкусные Рецепты. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;