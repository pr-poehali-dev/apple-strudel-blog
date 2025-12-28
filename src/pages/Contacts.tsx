import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: 'Mail',
      title: 'Email',
      value: 'info@vkusrecepty.ru',
      description: 'Ответим в течение 24 часов'
    },
    {
      icon: 'MessageCircle',
      title: 'Telegram',
      value: '@vkusrecepty',
      description: 'Быстрая связь в мессенджере'
    },
    {
      icon: 'Phone',
      title: 'Телефон',
      value: '+7 (495) 123-45-67',
      description: 'Пн-Пт с 10:00 до 18:00 МСК'
    }
  ];

  const socialLinks = [
    { icon: 'Instagram', name: 'Instagram', link: '#' },
    { icon: 'Facebook', name: 'Facebook', link: '#' },
    { icon: 'Youtube', name: 'YouTube', link: '#' },
    { icon: 'MessageCircle', name: 'Telegram', link: '#' }
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
              <Link to="/about" className="text-sm hover:text-primary transition-colors">О сайте</Link>
              <Link to="/contacts" className="text-sm text-primary font-medium transition-colors">Контакты</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary text-white">Свяжитесь с нами</Badge>
          <h1 className="text-5xl font-bold mb-6">Контакты</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Мы всегда рады услышать ваши вопросы, предложения и отзывы. Выберите удобный способ связи!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={method.icon} size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                <p className="text-primary font-medium mb-2">{method.value}</p>
                <p className="text-sm text-gray-600">{method.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Напишите нам</h2>
            <Card>
              <CardContent className="pt-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ваше имя</label>
                    <Input
                      type="text"
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="ivan@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Тема</label>
                    <Input
                      type="text"
                      placeholder="О чём вы хотите написать?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Сообщение</label>
                    <Textarea
                      placeholder="Расскажите подробнее..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" size="lg">
                    <Icon name="Send" size={20} className="mr-2" />
                    Отправить сообщение
                  </Button>
                  {submitted && (
                    <p className="text-center text-green-600 font-medium animate-fade-in">
                      ✓ Спасибо! Ваше сообщение отправлено
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Часто задаваемые вопросы</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6 pb-6">
                  <h3 className="font-semibold mb-2 flex items-start gap-2">
                    <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
                    Как добавить свой рецепт?
                  </h3>
                  <p className="text-sm text-gray-600 ml-7">
                    Напишите нам на email или через форму обратной связи. Мы рассмотрим ваш рецепт и опубликуем его на сайте.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 pb-6">
                  <h3 className="font-semibold mb-2 flex items-start gap-2">
                    <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
                    Можно ли использовать рецепты в коммерческих целях?
                  </h3>
                  <p className="text-sm text-gray-600 ml-7">
                    Рецепты предназначены для личного использования. Для коммерческого использования свяжитесь с нами.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 pb-6">
                  <h3 className="font-semibold mb-2 flex items-start gap-2">
                    <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
                    Как сообщить об ошибке в рецепте?
                  </h3>
                  <p className="text-sm text-gray-600 ml-7">
                    Оставьте комментарий под рецептом или напишите нам напрямую. Мы быстро исправим неточности.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-secondary border-none">
                <CardContent className="pt-8 pb-8">
                  <h3 className="font-semibold mb-4 text-center">Следите за нами в соцсетях</h3>
                  <div className="flex justify-center gap-6">
                    {socialLinks.map((social, idx) => (
                      <a
                        key={idx}
                        href={social.link}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
                        aria-label={social.name}
                      >
                        <Icon name={social.icon} size={24} />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Card className="bg-primary text-white border-none">
          <CardContent className="pt-12 pb-12 text-center">
            <Icon name="Users" size={48} className="mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Сотрудничество</h2>
            <p className="max-w-2xl mx-auto mb-6">
              Заинтересованы в партнёрстве, рекламе или сотрудничестве? Мы открыты к предложениям!
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              <Icon name="Briefcase" size={20} className="mr-2" />
              Предложить сотрудничество
            </Button>
          </CardContent>
        </Card>
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

export default Contacts;
