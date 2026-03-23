<?php

add_filter('allowed_http_origins', 'add_allowed_origins');
function add_allowed_origins($origins) {
    $origins[] = 'localhost:3000';
	$origins[] = 'sig';
	$origins[] = 'getflywheel.com';
    $origins[] = 'wpengine.com';
    $origins[] = 'wpenginepowered.com';
    return $origins;
}

if ( ! function_exists( 'preconnect_scripts' ) ) {
function preconnect_scripts() { ?> 
<link rel="preload" href="<?php echo get_stylesheet_directory_uri(); ?>/fonts/SIG/sig.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="preconnect" href="https://stats.g.doubleclick.net" />
<link rel="preconnect" href="http://www.googletagmanager.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link rel="preconnect" href="https://www.gstatic.com" />
<link rel="preconnect" href="https://use.typekit.net" />
<link rel="preconnect" href="https://p.typekit.net" />
<?php }
}
add_action( 'wp_head', 'preconnect_scripts', 1 );

if ( ! function_exists( 'sig_scripts' ) ) {
	function sig_scripts() {     
		
        $jscustom = 1.01;
        
        $jsvendor = 1.00;
		//wp_enqueue_script('modernizr', get_stylesheet_directory_uri() . '/assets/js/modernizr-custom.js',array( 'jquery' ), 1.0, false);
                
		wp_enqueue_style( 'sig', get_stylesheet_directory_uri().'/style.min.css', array(), wp_get_theme()->get('Version') );        

		wp_enqueue_script( 'sig-scripts', get_template_directory_uri() . '/assets/js/sig_scripts.min.js', array( 'jquery' ), $jsvendor, true );
        
		wp_enqueue_script( 'sig', get_template_directory_uri() . '/assets/js/sig.min.js', array( 'jquery' ), $jscustom, true );	
		
	}
}
add_action( 'wp_enqueue_scripts', 'sig_scripts' );

		   
?>