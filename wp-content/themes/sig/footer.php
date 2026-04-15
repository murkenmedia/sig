<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package SIG
 */

$post_id = get_queried_object_id();

if(get_field('page_options', $post_id)) {
	$options = get_field('page_options', $post_id);
	if(!in_array('hide_footer_circles', $options) && !is_single('post')) {
		echo get_footer_circles();
	}
} else {
    $posttype = get_post_type($post_id);
    $skiparr = array('post','case-study','webinar','event');
    if(!in_array($posttype,$skiparr)) {
         echo get_footer_circles();
    }
    
}



?>
</main>

	<footer id="footer" class="footer">
        <div class="footer__inner">
            
            <div class="footer__cta fade-in">
                 <?php 
                if ( is_active_sidebar( 'footer-cta' ) ) :
                    dynamic_sidebar('footer-cta');			
                endif; ?>
            </div>

            <div class="footer__columns fade-in animation-chain">

                <div class="footer__columns__column footer__logo fade-in">
                   <?php echo '<div class="footer-logo"><a href="'.get_home_url().'"><span class="sr-only">'.get_bloginfo().'</span></a></div>'; ?>
                    <?php 
                    if ( is_active_sidebar( 'footer-1' ) ) :
                        dynamic_sidebar('footer-1');			
                    endif; ?>
                </div>

                <div class="footer__columns__column footer__nav fade-in">
                    <ul class="footer-menu">
                        <?php wp_nav_menu( array( 'theme_location' => 'footer', 'container' => '', 'items_wrap' => '%3$s' ) ); ?>
                    </ul>
                    <?php 
                    if ( is_active_sidebar( 'footer-2' ) ) :
                        dynamic_sidebar('footer-2');			
                    endif; ?>
                </div>

                <div class="footer__columns__column footer__links fade-in">
                    <?php 
                    if ( is_active_sidebar( 'footer-3' ) ) :
                        dynamic_sidebar('footer-3');			
                    endif; ?>
                </div>

            </div>

            <nav class="footer__social fade-in" aria-label="Social">
                <ul class="social-menu">
                    <?php wp_nav_menu( array( 'theme_location' => 'social', 'container' => '', 'items_wrap' => '%3$s', 'link_before' => '<span class="sr-only">','link_after' => '</span>' ) ); ?>
                </ul>
            </nav>        

            <nav class="footer__legal fade-in" aria-label="Legal">
                <ul class="footer-legal-menu">
                    <?php wp_nav_menu( array( 'theme_location' => 'footer-legal', 'container' => '', 'items_wrap' => '%3$s' ) ); ?>
                    <?php echo '<li>&copy;'.date('Y').' Strata Information Group. all rights reserved</li>'; ?>
                </ul>
            </nav>

        </div>
	</footer>

</div><!-- #page -->

<div class="header-pixel"></div>


<?php 
if(is_page(2)) {
	if(get_field('popup_active', 'options')) {
        
        if(get_field('popup_start', 'option')) {
            $today =  date( 'Y-m-d H:i:s', current_time( 'timestamp', 0 ) );
            $today = strtotime($today);

            $popstart = strtotime(get_field('popup_start', 'option'));
            
            
            if(get_field('popup_end', 'option')) {
                $popend = strtotime(get_field('popup_end', 'option'));
            } else {
                $popend = strtotime("+1 day", strtotime(get_field('popup_start', 'option')));
            }
            
            if (($today >= $popstart) && ($today <= $popend)) {        
               echo get_popup();
            }
        } else {
            echo get_popup();
        }
		
	}

if(get_field('schema','option')) {
echo get_field('schema','option');
}
}

$whitelist = array(
    '127.0.0.1',
    '::1'
);
if(!in_array($_SERVER['REMOTE_ADDR'], $whitelist)){
if(get_field('footer_scripts', 'option')) { 
echo get_field('footer_scripts', 'option').'
';
}
}
?>
<?php wp_footer(); ?>
</body>
</html>
