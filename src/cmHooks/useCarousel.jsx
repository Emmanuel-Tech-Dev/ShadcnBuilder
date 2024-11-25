import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useState } from "react"


const useCarousel = (styles = {}) => {

    const [twStyle, setTwStyle] = useState(styles)
    const [orientation, setOrientation] = useState("horizontal")




    const CarouselJSX = (data, key, localContent) => {

        return (
            <Carousel className={`w-full max-w-xs ${twStyle?.margin}`}>
                <CarouselContent >
                    {data?.map((item, index) => (
                        <CarouselItem key={index} className={`${twStyle?.basis}`}>
                            {localContent || (
                                <div className="p-1 " >
                                    <Card className="">
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <span className="text-4xl font-semibold">{item[key]}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}

                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />

            </Carousel >
        )


    }

    const CarouselWithCardJSX = () => {

        return (
            <Carousel className={`w-full max-w-xs ${twStyle.margin}`}
                opts={{
                    align: "start",
                    axis: 'x',
                    loop: true,
                    containScroll: "trimSnaps",
                    // duration: 400,
                    // breakpoints: {
                    //     '(min-width: 640px)': {
                    //         slides: { perView: 2, spacing: 16 }
                    //     },
                    //     '(min-width: 768px)': {
                    //         slides: { perView: 3, spacing: 16 }
                    //     },
                    //     '(min-width: 1024px)': {
                    //         slides: { perView: 4, spacing: 24, size: "1000px" }
                    //     }
                    // }

                }}
                orientation={orientation}
            >
                <CarouselContent className="-ml-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        )
    }



    return {
        CarouselJSX,
        CarouselWithCardJSX,
        setTwStyle,
        setOrientation
    }
}


export default useCarousel