import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: 'BookOpen',
      title: 'Проверенные рецепты',
      description: 'Все рецепты тщательно протестированы и подробно описаны с пошаговыми инструкциями'
    },
    {
      icon: 'Users',
      title: 'Сообщество',
      description: 'Тысячи кулинаров делятся опытом, советами и своими версиями рецептов'
    },
    {
      icon: 'Star',
      title: 'Только лучшее',
      description: 'Публикуем рецепты с высокими оценками и положительными отзывами'
    },
    {
      icon: 'Clock',
      title: 'Встроенные таймеры',
      description: 'Удобные таймеры для каждого этапа приготовления помогут не пропустить важные моменты'
    },
    {
      icon: 'Calculator',
      title: 'Калькулятор порций',
      description: 'Автоматический пересчёт ингредиентов под нужное количество порций'
    },
    {
      icon: 'Smartphone',
      title: 'Удобно на любом устройстве',
      description: 'Сайт отлично работает на телефонах, планшетах и компьютерах'
    }
  ];

  const stats = [
    { value: '500+', label: 'Рецептов' },
    { value: '10К+', label: 'Пользователей' },
    { value: '5К+', label: 'Отзывов' },
    { value: '4.8', label: 'Средняя оценка' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/">
              <h1 className="text-2xl font-bold tracking-tight">vkusrecepty.ru</h1>
            </Link>
            <div className="flex gap-6">
              <Link to="/" className="text-sm hover:text-primary transition-colors">Рецепты</Link>
              <Link to="/about" className="text-sm text-primary font-medium transition-colors">О сайте</Link>
              <Link to="/contacts" className="text-sm hover:text-primary transition-colors">Контакты</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary text-white">О проекте</Badge>
          <h1 className="text-5xl font-bold mb-6">vkusrecepty.ru</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Мы создали платформу для тех, кто любит готовить и хочет делиться своими кулинарными открытиями. 
            Здесь каждый найдёт рецепты на любой вкус — от классики до современных экспериментов.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, idx) => (
            <Card key={idx} className="text-center border-2">
              <CardContent className="pt-8 pb-8">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Наши преимущества</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name={feature.icon} size={28} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <Card className="bg-secondary border-none">
            <CardContent className="pt-12 pb-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Наша миссия</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Мы верим, что готовка — это не только необходимость, но и творчество, удовольствие и способ 
                  объединить людей за общим столом. Наша цель — сделать кулинарное искусство доступным каждому, 
                  независимо от уровня подготовки.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Каждый рецепт на нашем сайте — это результат тщательной работы, тестирования и любви к еде. 
                  Мы помогаем вам готовить с уверенностью и радостью!
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Присоединяйтесь к нам</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Подписывайтесь на обновления, делитесь своими рецептами и становитесь частью нашего кулинарного сообщества
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                <Icon name="ChefHat" size={20} className="mr-2" />
                Смотреть рецепты
              </Button>
            </Link>
            <Link to="/contacts">
              <Button size="lg" variant="outline">
                <Icon name="Mail" size={20} className="mr-2" />
                Связаться с нами
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">vkusrecepty.ru</h3>
              <p className="text-sm text-gray-600">Лучшие кулинарные рецепты со всего мира</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Разделы</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/" className="hover:text-primary transition-colors">Рецепты</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">О сайте</Link></li>
                <li><Link to="/contacts" className="hover:text-primary transition-colors">Контакты</Link></li>
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
          <div className="border-t border-gray-200 pt-8">
            <p className="text-center text-sm text-gray-500">© 2025 vkusrecepty.ru Все права защищены</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
