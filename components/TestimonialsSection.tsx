import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MotionPreset } from "@/components/ui/motion-preset";
import { useTranslation } from "react-i18next";

export type TestimonialItem = {
  name: string;
  role: string;
  company: string;
  content: string;
  logo?: string;
};

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const testimonials = (t("testimonials.items", { returnObjects: true }) as TestimonialItem[]) ?? [];
  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <Carousel
        className="mx-auto flex max-w-7xl gap-12 px-4 max-sm:flex-col sm:items-center sm:gap-16 sm:px-6 lg:gap-24 lg:px-8"
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
      >
        {/* Left Content */}
        <MotionPreset fade blur slide delay={0} transition={{ duration: 0.5 }} inView inViewOnce className="space-y-4 sm:w-1/2 lg:w-1/3">
          <p className="text-primary text-sm font-medium uppercase">{t("testimonials.eyebrow")}</p>

          <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">{t("testimonials.title")}</h2>

          <p className="text-muted-foreground text-xl">{t("testimonials.description")}</p>

          <div className="flex items-center gap-4">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </MotionPreset>

        {/* Right Testimonial Carousel */}
        <MotionPreset fade blur slide delay={0.1} transition={{ duration: 0.5 }} inView inViewOnce className="relative max-w-196 sm:w-1/2 lg:w-2/3">
          <CarouselContent className="sm:-ml-6">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="sm:pl-6 lg:basis-1/2">
                <Card className="hover:border-primary h-full transition-colors duration-300">
                  <CardContent className="p-6 space-y-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-muted-foreground text-sm">
                          {testimonial.role} at{" "}
                          <span className="text-card-foreground font-semibold">{testimonial.company}</span>
                        </p>
                      </div>

                      {testimonial.logo && (
                        <img
                          src={testimonial.logo}
                          alt={`${testimonial.company} logo`}
                          className="h-8 w-auto object-contain"
                        />
                      )}
                    </div>

                    <p>{testimonial.content}</p>
                  </CardContent>
                </Card>
                </CarouselItem>
              ))}
          </CarouselContent>
        </MotionPreset>
      </Carousel>
    </section>
  );
};

export default TestimonialsSection;
