import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { boolean } from '@storybook/addon-knobs';

export const CarrouselProducts = () => {

    const getConfigurableProps = () => ({
        showThumbs: boolean('showThumbs', false, 'Toggles'),

    });

    return (

        <Carousel {...getConfigurableProps()} autoPlay>
            <div>
                <img alt="" src="https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-c22e243f-9749-4de3-b323-e348538827df.jpg" />
            </div>
            <div>
                <img alt="" src="https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-d58634fa-df88-4aa3-b077-64a3ea9434f2.jpg" />
            </div>
            <div>
                <img alt="" src="https://http2.mlstatic.com/optimize/o:f_webp/resources/exhibitors/MLA-tu-reserva-online-terrenos/aaaaaeb0-28e0-11eb-bcdc-1de649d1402d-home-slider_desktop.jpg" />
            </div>
        </Carousel>

    )

}