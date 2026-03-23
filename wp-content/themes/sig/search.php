<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package SIG
 */

get_header();


$hero = get_default_hero('Search Results','has-title-box');

?>
<section <?php post_class('site-content'); ?>>
    
    <?php echo $hero; ?>
    
    

	<?php if ( have_posts() ) : ?>
		<header class="mb-5 max-lg has-text-align-center">
            
			<h2 class="has-text-align-center mb-5 sans-bold"><?php printf( __( 'Search Results for: %s', 'sig' ), '<span class="has-orange-color">' . get_search_query() . '</span>' ); ?></h2>
            
            <?php get_search_form(); ?>
            
		</header>		
			
        <div class="three-col-grid">
        <?php while ( have_posts() ) : the_post();
            $id = get_the_ID();
            echo get_post_block($id);
        endwhile; ?>
        </div>
    
        <?php 
        $prev_link = get_previous_posts_link(__('&laquo; Previous', 'sig'));
        $next_link = get_next_posts_link(__('Next &raquo;', 'sig'));
        if ($prev_link || $next_link) {
            echo '
            <div class="post-grid-nav">
                <div class="post-grid-nav__prev">'.$prev_link.'</div>
                <div class="post-grid-nav__next">'.$next_link.'</div>
            </div>';
        } ?>
    
    
	<?php else : ?>

		<article id="post-0" class="post no-results not-found">

			<header class="mb-5 max-lg has-text-align-center">       
				<h2 class="has-text-align-center mb-5 sans-bold"><?php esc_html_e( 'Nothing Found', 'sig' ); ?></h2>
			</div>

			<div class="wp-block-group is-style-max-lg text-center">
				<div class="wp-block-group__inner-container">	
					<p class="mb-5"><?php esc_html_e( 'Sorry, but nothing matched your search criteria. Please try again with some different keywords.', 'sig' ); ?></p>
					<?php get_search_form(); ?>
				</div>
			</div>

		</article>
    <?php endif; ?>


</section>


<?php get_footer(); ?>