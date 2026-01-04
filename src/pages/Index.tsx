import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Movie {
  id: number;
  title: string;
  genre: string;
  year: number;
  rating: number;
  duration: string;
  poster: string;
  description: string;
  quality: string[];
  watched?: number;
}

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Последний рубеж',
    genre: 'Боевик',
    year: 2024,
    rating: 8.5,
    duration: '2ч 15м',
    poster: 'https://cdn.poehali.dev/projects/0d0a3159-57b3-4c20-a9ad-95ea2f4949ae/files/826751d7-53c9-4903-a565-b009e1b14ba3.jpg',
    description: 'Захватывающий боевик о последнем шансе на спасение.',
    quality: ['HD', 'FHD', '4K'],
    watched: 45
  },
  {
    id: 2,
    title: 'Город будущего',
    genre: 'Фантастика',
    year: 2024,
    rating: 9.0,
    duration: '2ч 30м',
    poster: 'https://cdn.poehali.dev/projects/0d0a3159-57b3-4c20-a9ad-95ea2f4949ae/files/2fedfd15-bd27-4190-b4b3-e00ebea324a8.jpg',
    description: 'Путешествие в мир технологий и невероятных открытий.',
    quality: ['HD', 'FHD', '4K']
  },
  {
    id: 3,
    title: 'Золотой час',
    genre: 'Драма',
    year: 2023,
    rating: 8.8,
    duration: '1ч 58м',
    poster: 'https://cdn.poehali.dev/projects/0d0a3159-57b3-4c20-a9ad-95ea2f4949ae/files/8731733d-da60-4a5d-b72f-81171e44e642.jpg',
    description: 'Трогательная история о поиске себя и смысле жизни.',
    quality: ['HD', 'FHD']
  },
  {
    id: 4,
    title: 'Темные воды',
    genre: 'Триллер',
    year: 2024,
    rating: 8.2,
    duration: '2ч 5м',
    poster: 'https://cdn.poehali.dev/projects/0d0a3159-57b3-4c20-a9ad-95ea2f4949ae/files/826751d7-53c9-4903-a565-b009e1b14ba3.jpg',
    description: 'Психологический триллер с неожиданным финалом.',
    quality: ['HD', 'FHD', '4K']
  },
  {
    id: 5,
    title: 'Космическая одиссея',
    genre: 'Фантастика',
    year: 2023,
    rating: 9.2,
    duration: '2ч 45м',
    poster: 'https://cdn.poehali.dev/projects/0d0a3159-57b3-4c20-a9ad-95ea2f4949ae/files/2fedfd15-bd27-4190-b4b3-e00ebea324a8.jpg',
    description: 'Эпическое путешествие через галактику.',
    quality: ['FHD', '4K'],
    watched: 78
  },
  {
    id: 6,
    title: 'Семейные узы',
    genre: 'Драма',
    year: 2024,
    rating: 8.0,
    duration: '1ч 50м',
    poster: 'https://cdn.poehali.dev/projects/0d0a3159-57b3-4c20-a9ad-95ea2f4949ae/files/8731733d-da60-4a5d-b72f-81171e44e642.jpg',
    description: 'История о важности семейных ценностей.',
    quality: ['HD', 'FHD']
  }
];

export default function Index() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('FHD');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Все');

  const genres = ['Все', 'Боевик', 'Фантастика', 'Драма', 'Триллер'];

  const watchedMovies = mockMovies.filter(m => m.watched);

  const filteredMovies = mockMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'Все' || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handlePlayMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setSelectedQuality(movie.quality.includes('FHD') ? 'FHD' : movie.quality[0]);
    setIsPlayerOpen(true);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                <Icon name="Film" size={28} />
                CineStream
              </h1>
              <nav className="hidden md:flex items-center gap-6">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  <Icon name="Home" size={18} className="mr-2" />
                  Главная
                </Button>
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  <Icon name="Grid3x3" size={18} className="mr-2" />
                  Каталог
                </Button>
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  <Icon name="Clock" size={18} className="mr-2" />
                  История
                </Button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск фильмов..."
                  className="pl-10 w-64 bg-card border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="icon" variant="ghost">
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="catalog" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="catalog" className="gap-2">
              <Icon name="Grid3x3" size={16} />
              Каталог
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Icon name="Clock" size={16} />
              История просмотров
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-8">
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Популярное сегодня</h2>
                <div className="flex gap-2">
                  {genres.map((genre) => (
                    <Button
                      key={genre}
                      variant={selectedGenre === genre ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedGenre(genre)}
                    >
                      {genre}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMovies.map((movie) => (
                  <Card
                    key={movie.id}
                    className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer hover-scale"
                    onClick={() => handlePlayMovie(movie)}
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                          <div className="flex gap-1">
                            {movie.quality.map((q) => (
                              <Badge key={q} variant="secondary" className="text-xs">
                                {q}
                              </Badge>
                            ))}
                          </div>
                          <Button className="w-full" size="sm">
                            <Icon name="Play" size={16} className="mr-2" />
                            Смотреть
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-lg line-clamp-1">{movie.title}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{movie.genre}</span>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="fill-accent text-accent" />
                          <span>{movie.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{movie.year}</span>
                        <span>•</span>
                        <span>{movie.duration}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Продолжить просмотр</h2>
              
              {watchedMovies.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {watchedMovies.map((movie) => (
                    <Card
                      key={movie.id}
                      className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all cursor-pointer"
                      onClick={() => handlePlayMovie(movie)}
                    >
                      <div className="flex gap-4 p-4">
                        <div className="relative w-32 aspect-[2/3] overflow-hidden rounded">
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{movie.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {movie.description}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Просмотрено {movie.watched}%</span>
                              <div className="flex gap-1">
                                {movie.quality.map((q) => (
                                  <Badge key={q} variant="outline" className="text-xs">
                                    {q}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Progress value={movie.watched} className="h-1" />
                          </div>
                          <Button size="sm" className="w-full">
                            <Icon name="Play" size={16} className="mr-2" />
                            Продолжить
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Icon name="Clock" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">История просмотров пуста</p>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={isPlayerOpen} onOpenChange={setIsPlayerOpen}>
        <DialogContent className="max-w-5xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedMovie?.title}</DialogTitle>
          </DialogHeader>
          
          {selectedMovie && (
            <div className="space-y-6">
              <div className="aspect-video bg-black rounded-lg relative overflow-hidden group/player">
                {!isPlaying ? (
                  <>
                    <img 
                      src={selectedMovie.poster} 
                      alt={selectedMovie.title}
                      className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30"
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <Button 
                        size="lg" 
                        className="rounded-full w-20 h-20 hover:scale-110 transition-transform"
                        onClick={() => setIsPlaying(true)}
                      >
                        <Icon name="Play" size={32} />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full">
                    <video
                      className="w-full h-full"
                      controls
                      autoPlay
                      poster={selectedMovie.poster}
                      onEnded={() => setIsPlaying(false)}
                    >
                      <source 
                        src={`https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`}
                        type="video/mp4"
                      />
                      Ваш браузер не поддерживает воспроизведение видео.
                    </video>
                    <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-full text-sm font-medium">
                      {selectedQuality}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-4">
                    <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedMovie.quality.map((quality) => (
                          <SelectItem key={quality} value={quality}>
                            {quality}
                            {quality === '4K' && ' (2160p)'}
                            {quality === 'FHD' && ' (1080p)'}
                            {quality === 'HD' && ' (720p)'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Wifi" size={16} />
                      <span>Авто-качество активно</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Качество видео адаптируется под вашу скорость интернета
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Описание</h4>
                <p className="text-sm text-muted-foreground">{selectedMovie.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="outline">{selectedMovie.genre}</Badge>
                  <span className="text-muted-foreground">{selectedMovie.year}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{selectedMovie.duration}</span>
                  <div className="flex items-center gap-1 text-accent">
                    <Icon name="Star" size={14} className="fill-accent" />
                    <span>{selectedMovie.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}