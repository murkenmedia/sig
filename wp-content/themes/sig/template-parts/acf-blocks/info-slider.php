<?php
/**
 * Info Slider
 *
 * @package SIG
 * @since   1.0.0
 */

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$block_classes = array(
    'info-slider-wrap',
    'fade-in',
    $className
);

$slides = $slider = $controls = '';
$slidenum = 0;

$showbtns = false;
if(get_field('show_buttons')) {
    $showbtns = true;
}
if( have_rows('slides') ):

    while( have_rows('slides') ) : the_row();
        $img = $link1 = $link2 = $imglink = $content = $tileclass = $btn = '';
        

        if(get_sub_field('link')) {
            $link = $url = $target = $lintext = '';
            
            $link = get_sub_field('link');
            $url = wp_kses_post($link['url']);
            $target = $link['target'];
            $linktext = $link['title'];            
            
            $imglink = '<a href="'.$url.'" class="img-link" tabindex="-1" target="'.$target.'"><span class="sr-only">'.$linktext.'</span></a>';
            
            $link1 = '<a href="'.$url.'" target="'.$target.'">';
            $link2 = '</a>';
            
            $tileclass .= ' tile-has-link';
            
            
            if($showbtns) {
                $btn = '
                <div class="wp-block-button">
                    <a href="'.$url.'" class="img-link" tabindex="-1" target="'.$target.'">
                        '.$linktext.'
                    </a>
                </div>';
                
                $tileclass .= ' tile-has-button';
            }
            
        } else {
            $tileclass .= ' no-zoom-hover';
        }

        if(get_sub_field('img')) {
            $imgid = get_sub_field('img');
            $img = wp_get_attachment_image($imgid, 'full');
            $img = '<div class="tile__img">'.$img.$imglink.'</div>';
        }
        
        if(get_sub_field('title')) {
            $text = '';
            if(get_sub_field('content')) {
                $text = get_sub_field('content');
                $text = widowfix($text);
            }
            
            $content = '
            <div class="tile__content text-center">
                <h3 class="has-small-font-size mb-2">'.$link1.get_sub_field('title').$link2.'</h3>
                <p class="has-small-font-size">'.$text.'</p>'.$btn.'
            </div>';
            
        }

        $slides .= '
        <div class="tile tile-slide'.$tileclass.'">'
            .$img.$content.'            
        </div>';

        $slidenum++;
        
    endwhile;

    if($slidenum > 1) {
        
        $slider = '
        <div id="'.$block['id'].'-slider" class="owl-carousel owl-theme info-slider">
            '.$slides.'
        </div>';
        
        $controls = '
        <div class="info-slider__controls">
            <button id="'.$block['id'].'-prev" class="info-slider__prev info-slider__btn"><span class="sr-only">'.__('Previous', 'sig').'</span></button>
            <button id="'.$block['id'].'-next" class="info-slider__next info-slider__btn"><span class="sr-only">'.__('Next', 'sig').'</span></button>
        </div>';
    }


endif;


?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>" data-id="<?php echo esc_attr( $block['id'] ); ?>">
    <?php echo $controls; ?>
    <?php echo $slider; ?>
</div>