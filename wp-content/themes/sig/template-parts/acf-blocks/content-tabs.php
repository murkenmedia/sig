<?php
/**
 * Content Tabs
 *
 * @package SIG
 * @since   1.0.0
 */

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$block_classes = array(
    'content-tabs-wrap',
    'animation-chain',
    $className
);

$content = $nav = $class = $show = '';
$class = 'active';
$show = 'show ';
$dataattr = 'true';

$cpt = array('post');

if(get_field('cpt')) {
    $cpt = get_field('cpt');
}

$args = array(
    'post_type' => $cpt,
    'posts_per_page' => '4', 
    'orderby' => 'date',
    'order' => 'ASC',
    'post_status' => 'publish'	
);

$the_query = new WP_Query( $args );
if ( $the_query->have_posts() ) {
    while ( $the_query->have_posts() ) : $the_query->the_post();
        $id = get_the_ID();
        $title = get_the_title($id);
        $slug = 'content-'.sanitize_title($title);

        $title = widowfix($title);
        $url = get_the_permalink($id);

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
                $postypetitle = "Case Studies";
                break;
        }

        $nav .= '
        <li class="content-tabs__tab nav-item" role="presentation">
            <button class="nav-link '.$class.'" id="'.$slug.'-tab" data-toggle="tab" href="#'.$slug.'-panel" role="tab" type="button" aria-controls="'.$slug.'-panel" aria-selected="'.$dataattr.'" aria-label="'.$title.'">
                <span class="content-type-title">'.$postypetitle.'</span>
                <span class="tab-title serif arrow-icon"><span>'.$title.'</span></span>
            </button>
        </li>';

        $content .= '
        <div class="content-tabs__content tab-pane fade '.$show.$class.'" id="'.$slug.'-panel" role="tabpanel" aria-labelledby="'.$slug.'-tab">
            <a class="content-tabs__content__link" href="'.$url.'"></a>
            <p class="content-type-title">'.$postypetitle.'</p>
            <h3 class="arrow-icon"><span>'.$title.'</span></h3>
            <div class="wp-block-button is-style-small">
                <div class="wp-block-button__link has-blue-dark-medium-background-color has-background wp-element-button" href="'.$url.'">'.$linktext.'</div>
            </div>
            <div class="content-tabs__content__img">
                '.$img.'
            </div>
        </div>';

        

        $class = $show = '';
        $dataattr = 'false';

    endwhile;




wp_reset_postdata();

};
?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">	
	<div class="tab-content content-tabs__content-col fade-in" id="<?php echo esc_attr( $block['id'] ); ?>-content">
        <?php echo $content; ?>          
    </div>

    <ul class="content-tabs__tabs-col nav tabs-nav fade-in" id="<?php echo esc_attr( $block['id'] ); ?>-tab" role="tablist">
        <?php echo $nav; ?>
    </ul>
</div>