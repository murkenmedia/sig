    <?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package SIG
 */

$whitelist = array(
    '127.0.0.1',
    '::1'
);
$track = true; 
if(in_array($_SERVER['REMOTE_ADDR'], $whitelist)){
    $track = false; 
}

global $post;
if($post->ID == null) {
    $id = get_the_ID();
} else {
    $id = $post->ID;
}
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
<?php if($track){ 
if(get_field('google_analytics', 'option')) { 
    echo get_field('google_analytics', 'option').'
';
}
} ?>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<?php wp_head(); ?>	
	<?php 
	$div = 'div'; 
	if (is_page('Home')):
		$div = 'h1';
	endif; 
	$pageclasses = '';
    if(!is_search() && !is_archive() && !is_category()) {
        if(get_field('page_options', $id))  {		
            $pageoptions = get_field('page_options', $id);
            $pageclasses = implode(' ', $pageoptions);
        }
    }

	?>
<?php if($track){ 
if(get_field('head_scripts', 'option')) { 
echo get_field('head_scripts', 'option').'
'; 
} 
}?>
</head>
<body <?php body_class($pageclasses); ?>>
<?php if($track){ 
if(get_field('body_scripts', 'option')) { 
echo get_field('body_scripts', 'option').'
'; 
}
}?>
<a class="skip-link" href="#content"><?php _e( 'Skip to the content', 'sig' ); ?></a> 
<?php wp_body_open(); ?>
<?php if(!wp_is_mobile()) : ?>
<div id="loading-screen"><div class="loading-icon"><div class="spinner"><div class="right-side"><div class="bar"></div></div><div class="left-side"><div class="bar"></div></div></div></div></div>
<?php endif; ?>
<div id="page" class="site">
	<header class="masthead" role="banner">
        
        <div class="masthead__row flex-justify-between">
            <div class="masthead__logo">
                <?php echo '<'.$div.' id="logo">
                    <a href="'.home_url().'">
                        <span class="sr-only">'.get_bloginfo().'</span>
                        <div class="logo__rings"></div>
                        <div class="logo__wordmark"></div>
                    </a>                    
                </'.$div.'>'; ?>
            </div>

            <nav class="masthead__nav navbar" aria-label="Main" role="menu">					
                <ul class="main-nav" role="presentation">
                    <?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => '', 'items_wrap' => '%3$s', 'item_spacing' => 'discard',  'walker'  => new MegaMenuWalker() )); ?>
                </ul>
            </nav>
            
            <nav class="masthead__utility navbar" aria-label="Utility" role="menu">					
                <ul class="utility-nav" role="presentation">
                    <?php wp_nav_menu( array( 'theme_location' => 'utility', 'container' => '', 'items_wrap' => '%3$s', 'item_spacing' => 'discard' )); ?>
                </ul>                
                <div class="masthead__search">		
                    <?php get_search_form(); ?>
                </div>
                
                <div class="masthead__toggle">
                    <button class="overlay-toggle-btn collapsed" type="button" aria-controls="overlay-menu" aria-expanded="false" aria-label="Toggle navigation">
                      <span></span> <span></span> <span></span>
                    </button>
                </div>
            </nav>
            
            <div class="masthead__bg"></div>
            
        </div>
        <div class="masthead__overlay" id="overlay-menu">
			<div class="masthead__overlay__inner">
				<nav class="navbar masthead__overlay__nav" aria-label="Overlay" role="menu">
                    <ul class="overlay-nav" role="presentation">
                        <?php wp_nav_menu( array( 'theme_location' => 'mobile', 'container' => '', 'items_wrap' => '%3$s', 'item_spacing' => 'discard', 'walker'  => new MobileMenuWalker() )); ?>
                    </ul>
				</nav>
			</div>
		</div>
	</header>	
	<main id="content" role="main">
