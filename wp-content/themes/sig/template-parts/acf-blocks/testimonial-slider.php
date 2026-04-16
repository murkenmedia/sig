<?php
/**
 * Testimonial Slider
 *
 * @package SIG
 * @since   1.0.0
 */

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$block_classes = array(
    'testimonial-slider-block',	
	$className
);

$slides = $slider = $controls = '';
$slidenum = 0;

$showlogo = false;
if(get_field('show_logo')) {    
    $showlogo = get_field('show_logo');
}


$type = 'single';
if(get_field('type')) {    
    $type = get_field('type');
}

if($type == 'select') {

    $select = get_field('select_testimonials');
    foreach($select as $id) {
        $slides .= get_testimonial_slide($id,$showlogo);
        $slidenum++;
    }

} else {


    $max = 3;
    if(get_field('max')) {
        $max = get_field('max');
    }
    $topics = array();
    if(get_field('topics')) {
        $topics = get_field('topics');
    }

    $args = array(
        'post_type' => 'testimonial',
        'posts_per_page' =>$max,
        'orderby' => 'menu_order',
        'order' => 'ASC',
        'post_status' => 'publish',
        'tax_query' => array(
        array(
                'taxonomy' => 'insight_topic',
                'field'    => 'term_id', 
                'terms'    => $topics,
                'operator' => 'IN',
            ),
        ),
    );


    $the_query = new WP_Query( $args );

    if ( $the_query->have_posts() ) {
        while ( $the_query->have_posts() ) {
            $the_query->the_post();                
            $id = get_the_ID();
            
            $slides .= get_testimonial_slide($id,$showlogo);
            $slidenum++;
        }
        wp_reset_postdata();
    }
        

}

if($slidenum > 1) {
        
    $slider = '
    <div id="'.$block['id'].'-slider" class="owl-carousel owl-theme testimonial-slider ">
        '.$slides.'
    </div>';
    
    $controls = '
    <div class="testimonial-slider__controls">
        <button id="'.$block['id'].'-prev" class="testimonial-slider__prev testimonial-slider__btn"><span class="sr-only">'.__('Previous', 'sig').'</span></button>
        <button id="'.$block['id'].'-next" class="testimonial-slider__next testimonial-slider__btn"><span class="sr-only">'.__('Next', 'sig').'</span></button>
    </div>';
} else {
    $slider = '
    <div class="single-testimonial max-lg mx-auto">
        '.$slides.'
    </div>';
}


?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>" data-id="<?php echo esc_attr( $block['id'] ); ?>">
	<?php echo $controls; ?>
    <?php echo $slider; ?>
</div>
