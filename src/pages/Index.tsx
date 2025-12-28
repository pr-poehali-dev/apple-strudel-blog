import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [servings, setServings] = useState(8);
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Таймер завершён!', {
          body: `Этап "${steps[activeTimer!].title}" завершён`,
          icon: '/favicon.ico'
        });
      }
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isRunning, timeLeft, activeTimer]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Загружаем или инициализируем просмотры
    const storedViews = localStorage.getItem('recipeViews_apple-strudel');
    const storedFavCount = localStorage.getItem('recipeFavCount_apple-strudel');
    
    if (!storedViews) {
      // Первый визит - случайное начальное значение для реалистичности
      const initialViews = Math.floor(Math.random() * 500) + 1247;
      localStorage.setItem('recipeViews_apple-strudel', initialViews.toString());
      setViewCount(initialViews);
    } else {
      const views = parseInt(storedViews) + 1;
      localStorage.setItem('recipeViews_apple-strudel', views.toString());
      setViewCount(views);
    }

    // Загружаем количество добавлений в избранное
    if (storedFavCount) {
      setFavoriteCount(parseInt(storedFavCount));
    } else {
      const initialFavs = Math.floor(Math.random() * 100) + 342;
      localStorage.setItem('recipeFavCount_apple-strudel', initialFavs.toString());
      setFavoriteCount(initialFavs);
    }

    // Проверяем, добавлен ли рецепт в избранное
    const favorites = localStorage.getItem('favoriteRecipes');
    if (favorites) {
      const favList = JSON.parse(favorites);
      setIsFavorite(favList.includes('apple-strudel'));
    }
  }, []);

  const toggleFavorite = () => {
    const favorites = localStorage.getItem('favoriteRecipes');
    let favList: string[] = favorites ? JSON.parse(favorites) : [];
    
    if (isFavorite) {
      favList = favList.filter(id => id !== 'apple-strudel');
      const newCount = favoriteCount - 1;
      setFavoriteCount(newCount);
      localStorage.setItem('recipeFavCount_apple-strudel', newCount.toString());
    } else {
      favList.push('apple-strudel');
      const newCount = favoriteCount + 1;
      setFavoriteCount(newCount);
      localStorage.setItem('recipeFavCount_apple-strudel', newCount.toString());
    }
    
    localStorage.setItem('favoriteRecipes', JSON.stringify(favList));
    setIsFavorite(!isFavorite);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shareRecipe = (platform: string) => {
    const url = window.location.href;
    const title = 'Классический Яблочный Штрудель - Лучший Рецепт';
    const text = 'Попробуйте этот потрясающий рецепт яблочного штруделя!';

    const shareUrls: { [key: string]: string } = {
      vk: `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const startTimer = (stepIndex: number, minutes: number) => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    setActiveTimer(stepIndex);
    setTimeLeft(minutes * 60);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setActiveTimer(null);
    setTimeLeft(0);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
    { title: 'Приготовление теста', time: '15 мин', minutes: 15, description: 'Смешайте муку, соль, яйцо, воду и масло. Замесите эластичное тесто, накройте плёнкой и оставьте отдыхать на 30 минут при комнатной температуре.' },
    { title: 'Подготовка начинки', time: '10 мин', minutes: 10, description: 'Очистите яблоки, нарежьте тонкими дольками. Добавьте сахар, корицу, изюм и рубленые орехи. Перемешайте.' },
    { title: 'Раскатка теста', time: '10 мин', minutes: 10, description: 'На присыпанном мукой столе раскатайте тесто максимально тонко. Смажьте растопленным маслом и посыпьте сухарями.' },
    { title: 'Формирование штруделя', time: '5 мин', minutes: 5, description: 'Выложите начинку вдоль края теста. Аккуратно сверните рулет, используя полотенце. Переложите на противень швом вниз.' },
    { title: 'Выпекание', time: '35 мин', minutes: 35, description: 'Смажьте штрудель маслом. Выпекайте при 180°C до золотистой корочки. Остудите 10 минут перед нарезкой.' }
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

  const reviews = [
    { 
      name: 'Анна Соколова', 
      rating: 5, 
      date: '15 декабря 2024', 
      avatar: '👩🏻‍🦰',
      text: 'Потрясающий рецепт! Получилось с первого раза. Тесто действительно растягивается до прозрачности, а корочка вышла хрустящей. Вся семья в восторге!' 
    },
    { 
      name: 'Дмитрий Петров', 
      rating: 5, 
      date: '12 декабря 2024', 
      avatar: '👨🏻',
      text: 'Готовил по этому рецепту на день рождения жены. Гости просили добавки! Особенно помогли советы шеф-повара про яблоки и температуру.' 
    },
    { 
      name: 'Елена Морозова', 
      rating: 4, 
      date: '8 декабря 2024', 
      avatar: '👩🏼',
      text: 'Очень вкусно, но с первого раза тесто немного порвалось при раскатке. Во второй раз учла все нюансы — получилось идеально!' 
    },
    { 
      name: 'Сергей Иванов', 
      rating: 5, 
      date: '3 декабря 2024', 
      avatar: '👨🏼‍🦱',
      text: 'Лучший штрудель, что я пробовал! Таймер для этапов — гениальная идея, ничего не пропустишь. Спасибо за подробный рецепт!' 
    }
  ];

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  const similarRecipes = [
    {
      title: 'Венский Захер',
      description: 'Классический шоколадный торт с абрикосовым джемом',
      image: 'https://cdn.poehali.dev/projects/d96d6b12-d163-4b8a-a4d6-c8c1768ef193/files/ac032ffa-5cbd-40f9-83af-98a43e7fea40.jpg',
      time: '90 минут',
      difficulty: 'Сложная',
      rating: 4.9
    },
    {
      title: 'Тирамису',
      description: 'Нежный итальянский десерт с кофе и маскарпоне',
      image: 'https://cdn.poehali.dev/projects/d96d6b12-d163-4b8a-a4d6-c8c1768ef193/files/dc22f049-3ab0-43b2-9137-e4f734530a8e.jpg',
      time: '30 минут',
      difficulty: 'Лёгкая',
      rating: 4.7
    },
    {
      title: 'Панна-котта',
      description: 'Итальянский молочный десерт с ягодным соусом',
      image: 'https://cdn.poehali.dev/projects/d96d6b12-d163-4b8a-a4d6-c8c1768ef193/files/daf4bc3f-3391-4556-9d60-bd2d5acbc984.jpg',
      time: '20 минут',
      difficulty: 'Лёгкая',
      rating: 4.8
    }
  ];

  const faq = [
    {
      question: 'Почему тесто рвется при растягивании?',
      answer: 'Основные причины: недостаточный отдых теста (нужно минимум 30 минут), холодные ингредиенты, мало жидкости в тесте. Убедитесь, что все продукты комнатной температуры и дайте тесту полностью расслабиться под пленкой.'
    },
    {
      question: 'Можно ли заменить яблоки другими фруктами?',
      answer: 'Да! Отлично подходят груши, вишня, сливы или ягоды. Главное — используйте не слишком сочные фрукты, иначе тесто размокнет. Груши лучше выбирать твердые, вишню — без косточек и слить лишний сок.'
    },
    {
      question: 'Что делать, если штрудель разваливается при нарезке?',
      answer: 'Обязательно дайте штруделю остыть минимум 10-15 минут после выпекания. Режьте острым ножом пилящими движениями, а не давящими. Горячий штрудель всегда разваливается — это нормально.'
    },
    {
      question: 'Можно ли приготовить штрудель заранее?',
      answer: 'Да, штрудель можно испечь за 1-2 дня. Храните в холодильнике в контейнере. Перед подачей разогрейте в духовке при 160°C около 10 минут — корочка снова станет хрустящей.'
    },
    {
      question: 'Чем заменить панировочные сухари?',
      answer: 'Можно использовать измельченное печенье (например, Мария), молотые орехи или кокосовую стружку. Главная функция сухарей — впитывать влагу из начинки, поэтому любой сухой компонент подойдет.'
    },
    {
      question: 'Можно ли заморозить готовый штрудель?',
      answer: 'Да, остывший штрудель можно заморозить на срок до 2 месяцев. Размораживайте в холодильнике, затем разогревайте в духовке 15-20 минут при 160°C для восстановления текстуры.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold tracking-tight">vkusrecepty.ru</h1>
            <div className="flex gap-6">
              <a href="#recipe" className="text-sm hover:text-primary transition-colors">Рецепты</a>
              <a href="#gallery" className="text-sm hover:text-primary transition-colors">Галерея</a>
              <a href="#subscribe" className="text-sm hover:text-primary transition-colors">Подписка</a>
            </div>
          </div>
        </div>
      </nav>

      <section className="hero-section relative h-[70vh] flex items-center justify-center overflow-hidden">
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
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              <Icon name="ChefHat" size={20} className="mr-2" />
              Начать готовить
            </Button>
            <Button 
              size="lg" 
              variant={isFavorite ? "default" : "outline"}
              onClick={toggleFavorite}
              className={isFavorite ? "bg-red-500 hover:bg-red-600 text-white" : ""}
            >
              <Icon name={isFavorite ? "Heart" : "Heart"} size={20} className={`mr-2 ${isFavorite ? "fill-white" : ""}`} />
              {isFavorite ? "В избранном" : "В избранное"}
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.print()}>
              <Icon name="Printer" size={20} className="mr-2" />
              Распечатать рецепт
            </Button>
          </div>

          {/* Кнопки мессенджеров */}
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const text = encodeURIComponent(`Попробуй этот рецепт: ${recipe.title}\n\n${window.location.href}`);
                window.open(`https://wa.me/?text=${text}`, '_blank');
              }}
              className="bg-green-500 hover:bg-green-600 text-white border-0"
            >
              <Icon name="MessageCircle" size={18} className="mr-2" />
              WhatsApp
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const text = encodeURIComponent(`Попробуй этот рецепт: ${recipe.title}\n\n${window.location.href}`);
                window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Попробуй этот рецепт: ${recipe.title}`)}`, '_blank');
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white border-0"
            >
              <Icon name="Send" size={18} className="mr-2" />
              Telegram
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const text = encodeURIComponent(`Попробуй этот рецепт: ${recipe.title}`);
                window.open(`https://vk.com/share.php?url=${encodeURIComponent(window.location.href)}&title=${text}`, '_blank');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white border-0"
            >
              <Icon name="Share2" size={18} className="mr-2" />
              ВКонтакте
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Icon name="Clock" size={28} className="mx-auto mb-2 text-primary" />
              <p className="text-xs text-muted-foreground">Подготовка</p>
              <p className="font-semibold text-sm">{recipe.prepTime}</p>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Icon name="Timer" size={28} className="mx-auto mb-2 text-primary" />
              <p className="text-xs text-muted-foreground">Приготовление</p>
              <p className="font-semibold text-sm">{recipe.cookTime}</p>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Icon name="Users" size={28} className="mx-auto mb-2 text-primary" />
              <p className="text-xs text-muted-foreground">Порций</p>
              <p className="font-semibold text-sm">{recipe.servings}</p>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Icon name="TrendingUp" size={28} className="mx-auto mb-2 text-primary" />
              <p className="text-xs text-muted-foreground">Сложность</p>
              <p className="font-semibold text-sm">{recipe.difficulty}</p>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Icon name="Eye" size={28} className="mx-auto mb-2 text-primary" />
              <p className="text-xs text-muted-foreground">Просмотров</p>
              <p className="font-semibold text-sm">{viewCount.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Icon name="Heart" size={28} className="mx-auto mb-2 text-red-500 fill-red-500" />
              <p className="text-xs text-muted-foreground">В избранном</p>
              <p className="font-semibold text-sm">{favoriteCount.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {isFavorite && (
          <div className="mb-8 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-red-700">
              <Icon name="Heart" size={20} className="fill-red-500 text-red-500" />
              <p className="font-semibold">Рецепт добавлен в избранное</p>
            </div>
          </div>
        )}

        <Card className="mb-8 border-2 border-primary/20">
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Icon name="Share2" size={24} className="text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">Поделиться рецептом</h3>
                  <p className="text-sm text-gray-600">Расскажите друзьям о рецепте</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => shareRecipe('vk')}
                  className="hover:bg-blue-50"
                >
                  <span className="text-lg mr-1">🔵</span>
                  ВКонтакте
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => shareRecipe('telegram')}
                  className="hover:bg-blue-50"
                >
                  <span className="text-lg mr-1">✈️</span>
                  Telegram
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => shareRecipe('whatsapp')}
                  className="hover:bg-green-50"
                >
                  <span className="text-lg mr-1">💬</span>
                  WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => shareRecipe('facebook')}
                  className="hover:bg-blue-50"
                >
                  <span className="text-lg mr-1">📘</span>
                  Facebook
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => shareRecipe('twitter')}
                  className="hover:bg-blue-50"
                >
                  <span className="text-lg mr-1">🐦</span>
                  Twitter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200 no-print">
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

        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200 no-print">
          <p className="text-sm text-center text-muted-foreground mb-2">Реклама</p>
          <div className="h-24 bg-white border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
            <p className="text-gray-400">Яндекс.Директ / Google Ads</p>
          </div>
        </div>

        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8">Пошаговое приготовление</h2>
          
          {activeTimer !== null && (
            <Card className="timer-widget mb-6 bg-primary text-white border-none">
              <CardContent className="py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Icon name="Timer" size={32} />
                    <div>
                      <p className="text-sm opacity-90">Активный таймер</p>
                      <p className="text-2xl font-bold">{steps[activeTimer].title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold tabular-nums">
                      {formatTime(timeLeft)}
                    </div>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={stopTimer}
                    >
                      <Icon name="X" size={16} className="mr-1" />
                      Остановить
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                    {idx + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                    <Badge variant="outline" className="text-xs">{step.time}</Badge>
                    <Button 
                      variant={activeTimer === idx ? "default" : "outline"}
                      size="sm"
                      onClick={() => startTimer(idx, step.minutes)}
                      disabled={activeTimer !== null && activeTimer !== idx}
                      className="ml-auto"
                    >
                      <Icon name="Timer" size={16} className="mr-1" />
                      {activeTimer === idx ? 'Таймер идёт' : 'Запустить таймер'}
                    </Button>
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

        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200 no-print">
          <p className="text-sm text-center text-muted-foreground mb-2">Реклама</p>
          <div className="h-24 bg-white border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
            <p className="text-gray-400">Яндекс.Директ / Google Ads</p>
          </div>
        </div>

        <section id="reviews" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Отзывы о рецепте</h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon 
                    key={star} 
                    name="Star" 
                    size={24} 
                    className={star <= parseFloat(averageRating) ? "fill-primary text-primary" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold">{averageRating}</span>
              <span className="text-gray-600">из 5</span>
            </div>
            <p className="text-gray-600">На основе {reviews.length} отзывов</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl">{review.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-lg">{review.name}</h3>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Icon 
                              key={star} 
                              name="Star" 
                              size={16} 
                              className={star <= review.rating ? "fill-primary text-primary" : "text-gray-300"}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">
              <Icon name="MessageSquarePlus" size={20} className="mr-2" />
              Оставить свой отзыв
            </Button>
          </div>
        </section>

        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200 no-print">
          <p className="text-sm text-center text-muted-foreground mb-2">Реклама</p>
          <div className="h-24 bg-white border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
            <p className="text-gray-400">Яндекс.Директ / Google Ads</p>
          </div>
        </div>

        <section id="similar" className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary text-white">Вам может понравиться</Badge>
            <h2 className="text-4xl font-bold mb-4">Похожие рецепты</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Другие популярные десерты европейской кухни
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarRecipes.map((recipe, idx) => (
              <Card key={idx} className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-md">
                    <Icon name="Star" size={14} className="fill-primary text-primary" />
                    <span className="text-sm font-semibold">{recipe.rating}</span>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {recipe.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Icon name="Clock" size={16} />
                      <span>{recipe.time}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {recipe.difficulty}
                    </Badge>
                  </div>
                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white">
                    Смотреть рецепт
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200 no-print">
          <p className="text-sm text-center text-muted-foreground mb-2">Реклама</p>
          <div className="h-24 bg-white border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
            <p className="text-gray-400">Яндекс.Директ / Google Ads</p>
          </div>
        </div>

        <section id="faq" className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary text-white">Помощь</Badge>
            <h2 className="text-4xl font-bold mb-4">Частые вопросы</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ответы на самые популярные вопросы о приготовлении штруделя
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faq.map((item, idx) => (
              <Collapsible
                key={idx}
                open={openFaqIndex === idx}
                onOpenChange={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
              >
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                  <CollapsibleTrigger className="w-full">
                    <CardContent className="pt-6 pb-6">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-lg font-semibold text-left">{item.question}</h3>
                        <Icon 
                          name={openFaqIndex === idx ? "ChevronUp" : "ChevronDown"} 
                          size={24} 
                          className="text-primary flex-shrink-0"
                        />
                      </div>
                    </CardContent>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0 pb-6">
                      <Separator className="mb-4" />
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </section>

        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200 no-print">
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

      <audio ref={audioRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbT6/fEhysFJHfH8N2QQAoUXrTp66hVFApGn+Dy" preload="auto" />

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
          <p className="text-center text-sm text-gray-500">© 2025 vkusrecepty.ru Все права защищены</p>
        </div>
      </footer>

      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="lg"
          className="fixed bottom-8 right-8 rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90 text-white z-50 no-print"
          aria-label="Наверх"
        >
          <Icon name="ArrowUp" size={24} />
        </Button>
      )}
    </div>
  );
};

export default Index;