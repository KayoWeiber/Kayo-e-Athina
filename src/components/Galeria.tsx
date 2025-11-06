import Reveal from "./Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function GalleryCarouselRow({ images }: { images: string[] }) {
  return (
    <Carousel className="w-full" opts={{ align: "start" }}>
      <CarouselContent className="-ml-3 sm:-ml-4">
        {images.map((src, idx) => (
          <CarouselItem
            key={idx}
            className="pl-3 sm:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/3"
          >
            <div className="p-1 sm:p-2">
              <div className="overflow-hidden rounded-2xl border-4 ka-border-roxo-escuro bg-white/80 shadow-sm">
                <div className="relative aspect-square w-full">
                  <img
                    src={src}
                    alt={`Foto ${src}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading={idx < 2 ? "eager" : "lazy"}
                    decoding="async"
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 33vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 bg-white/90 ring-2 ka-border-roxo-escuro hover:bg-white" />
      <CarouselNext className="right-2 bg-white/90 ring-2 ka-border-roxo-escuro hover:bg-white" />
    </Carousel>
  );
}

export default function Galeria() {
  const all = Array.from({ length: 12 }, (_, i) => `galeria/${i + 1}.png`);
  const rows = [all.slice(0, 4), all.slice(4, 8), all.slice(8, 12)];
  return (
    <main className="ka-container py-12 md:py-16">
      <Reveal>
        <h1 className="font-title text-3xl md:text-5xl font-extrabold tracking-tight ka-text-roxo-escuro text-center">
          Galeria de Fotos
        </h1>
      </Reveal>
      <Reveal delay={80}>
        <p className="mt-3 text-neutral-700 text-center max-w-prose mx-auto">
          Momentos especiais capturados ao longo da nossa jornada
        </p>
      </Reveal>

      <div className="mt-8 space-y-8 md:space-y-10">
        {rows.map((imgs, i) => (
          <Reveal key={i} delay={i * 60}>
            <GalleryCarouselRow images={imgs} />
          </Reveal>
        ))}
      </div>
    </main>
  );
}
