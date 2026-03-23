<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package SIG
 */

get_header(); ?>
<?php
	while ( have_posts() ) :
		the_post();

        $postype = get_post_type();

        switch ($postype) {
            case 'solutions' || 'technologies' || 'post':
                get_template_part( 'template-parts/content', 'page' );
                break;
            default:
                get_template_part( 'template-parts/content', get_post_type() );
        }

	endwhile; // End of the loop.
?>
<?php get_footer(); ?>
