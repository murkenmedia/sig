<?php
/**
 * Content Slider
 *
 * @package SIG
 * @since   1.0.0
 */

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$block_classes = array(
    'content-slider-wrap',
    'fade-in',
    $className
);

$slides = $slider = $controls = '';
$slidenum = 0;

$cpt = array('post');

if(get_field('cpt')) {
    $cpt = get_field('cpt');
}

$max = 3;
if(get_field('max')) {
    $max = get_field('max');
}

$args = array(
    'post_type' => $cpt,
    'posts_per_page' => $max, 
    'orderby' => 'date',
    'order' => 'DESC',
    'post_status' => 'publish'	
);

$tabindex = '1';

$the_query = new WP_Query( $args );
if ( $the_query->have_posts() ) {
    while ( $the_query->have_posts() ) : $the_query->the_post();
        $id = get_the_ID();
        $title = get_the_title($id);
        $url = get_the_permalink($id);
        $excerpt = get_the_excerpt($id);


        $titleclass = 'large';

        if(strlen($title) > 60) {
            $titleclass = 'medium';
        }
        $img = get_default_image($id);

        $linktext = __('Read More', 'sig');
        $postypetitle = '';
        $posttype = get_post_type($id);
        switch ($posttype) {
            case 'post':
                $linktext = __('Read Insight', 'sig');
                $postypetitle = "Insights";
                break;
            case 'webinar':
                $linktext = __('Watch Webinar', 'sig');
                $postypetitle = "Webinars";
                break;
            case 'case-study':
                $linktext = __('Read Case Study', 'sig');
                $postypetitle = "Case Highlight";
                break;
        }

        $slides .= '
        <div class="content-slider__slide">
            <a class="content-slider__slide__link" href="'.$url.'" tabindex="'.$tabindex.'"><span class="sr-only">'.$linktext.' - '.$title.'</span></a>
            <div class="content-slider__slide__img">
                '.$img.'
            </div>
            <div class="content-slider__slide__content">
                <div class="content-slider__slide__content__col">
                    <p class="content-type-title has-blue-dark-medium-color">'.$postypetitle.'</p>
                    <h3 class="has-blue-dark-color mb-0 has-'.$titleclass.'-font-size">'.widowfix($title).'</h3>
                </div>
                <div class="content-slider__slide__content__col">
                    <p class="pt-md-4 has-small-font-size">'.$excerpt.'</p>
                </div>
            </div>
        </div>';

         $slidenum++;
         $tabindex = '-1';
    endwhile;

wp_reset_postdata();

if($slidenum > 1) {
        
    $slider = '
    <div id="'.$block['id'].'-slider" class="owl-carousel owl-theme content-slider">
        '.$slides.'
    </div>';
    
    $controls = '
    <div class="content-slider__controls">
        <button id="'.$block['id'].'-prev" class="content-slider__prev content-slider__btn"><span class="sr-only">'.__('Previous', 'sig').'</span></button>
        <button id="'.$block['id'].'-next" class="content-slider__next content-slider__btn"><span class="sr-only">'.__('Next', 'sig').'</span></button>
    </div>';
}

};

?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>" data-id="<?php echo esc_attr( $block['id'] ); ?>">
    <?php echo $controls; ?>
    <?php echo $slider; ?>
</div>