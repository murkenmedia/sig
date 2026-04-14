<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package SIG
 */

get_header();


$content_markup = $hero = '';

$insightsid = get_option( 'page_for_posts' );
$bloghome = get_post($insightsid);
$blocks = parse_blocks( $bloghome->post_content );

foreach( $blocks as $block ) {
    if($block['blockName'] !== null) {
        if (strpos($block['blockName'], 'acf') !== false) {
            if( 'acf/hero' === $block['blockName'] ) {
                $hero = render_block( $block );
            } else {
                $content_markup .= render_block( $block );
            }    
        } else {
            $content_markup .= render_block( $block );
        }
    } else {
        $content_markup .= render_block( $block );
    }
}




?>
    
<section class="site-content">
	<?php 
    if ($hero == '') {
		echo get_hero_header($insightsid);
	}
    echo $content_markup;
    ?>
</section>

<?php get_footer(); ?>