<?php
/**
 * Circle Slider
 *
 * @package SIG
 * @since   1.0.0
 */

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$block_classes = array(
    'circle-slider-wrap',
    'fade-in',
    'alignfull',
    $className
);

$slides = $slider = $controls = '';
$slidenum = 0;

$colorarr = array(
    'blue-light', 
    'blue-medium',
    'blue',
    'blue-dark'
);

if( have_rows('slides') ):

    while( have_rows('slides') ) : the_row();
        $link = $circlelink = $content = '';

        $title = get_sub_field('title');
        
        if(get_sub_field('link')) {
            $link = $url = $target = $lintext = '';
            
            $link = get_sub_field('link');
            $url = wp_kses_post($link['url']);
            $target = $link['target'];
            $linktext = $link['title'];
            
            $circlelink = '<a href="'.$url.'" class="circle-slide__link" tabindex="-1" target="'.$target.'"><span class="sr-only">'.$linktext.' about '.$title.'</span></a>';

            $link = '
            <a href="'.$url.'" class="circle-slide__textlink" tabindex="-1" target="'.$target.'">
                '.$linktext.'
            </a>';
            
        }

        $text = '';
        if(get_sub_field('content')) {
            $text = get_sub_field('content');
            $text = widowfix($text);
        }

        $content = '
        <div class="circle-slide__content">
            <h3 class="mb-4 mb-lg-5">'.get_sub_field('title').'</h3>
            <div class="circle-slide__content__collapse">
                <p>'.$text.'</p>'.$link.'
            </div>
        </div>';

        $color = $colorarr[$slidenum];

        $slides .= '
        <div class="circle-slide circle-slide-'.$slidenum.' slide-color-'.$color.'">
            '.$content.$circlelink.'
        </div>';

        $slidenum++;
        
    endwhile;

    if($slidenum > 1) {
        
        $slider = '
        <div id="'.$block['id'].'-slider" class="owl-carousel owl-theme circle-slider">
            '.$slides.'
        </div>';
        
        $controls = '
        <div class="circle-slider__controls fade-in">
            <button id="'.$block['id'].'-prev" class="circle-slider__prev circle-slider__btn"><span class="sr-only">'.__('Previous', 'sig').'</span></button>
            <button id="'.$block['id'].'-next" class="circle-slider__next circle-slider__btn"><span class="sr-only">'.__('Next', 'sig').'</span></button>
        </div>';
    }


endif;


?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>" data-id="<?php echo esc_attr( $block['id'] ); ?>">
    <?php echo $controls; ?>
    <?php echo $slider; ?>
</div>