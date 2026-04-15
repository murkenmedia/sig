<?php

add_filter( 'should_load_separate_core_block_assets', '__return_false' );

if ( ! function_exists( 'gutenberg_editor_styles' ) ) {
	/**
	 * EDITOR STYLES
	 *
	 * @since 1.0.0
	 */	
	function gutenberg_editor_styles() {
		// Load the theme styles within Gutenberg.
		$cssver = 1.05;
		wp_enqueue_style('my-gutenberg-editor-styles', get_theme_file_uri('style-gutenberg-editor.min.css'), array(), $cssver);

	}	
}
add_action('enqueue_block_editor_assets', 'gutenberg_editor_styles');
    
    
if (is_admin()) { 	
	if ( ! function_exists( 'disable_editor_fullscreen_by_default' ) ) {
	/**
	 * DISABLE DEFAULT FULLSCREEN MODE IN GUTENBERG
	 *
	 * @since 1.0.0
	 */
		function disable_editor_fullscreen_by_default() {
			$script = "jQuery( window ).load(function() { const isFullscreenMode = wp.data.select( 'core/edit-post' ).isFeatureActive( 'fullscreenMode' ); if ( isFullscreenMode ) { wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'fullscreenMode' ); } });";
			wp_add_inline_script( 'wp-blocks', $script );
		}
	}
	add_action( 'enqueue_block_editor_assets', 'disable_editor_fullscreen_by_default' );
}


function widowfix_blocks( $block_content, $block ) {
	if ( isset( $block['attrs']['className'] ) ) {
        $classes = explode( ' ', $block['attrs']['className'] );
        if ( in_array( 'widow-fix', $classes ) ) {
           $block_content = widowfix($block_content);
        }
	}
	return $block_content;
}

//add_filter( 'render_block', 'widowfix_blocks', 10, 2 );


if ( ! function_exists( 'custom_gutenberg_classes' ) ) {
	/**
	 * CUSTOM CSS STYLES
	 *
	 * @since 1.0.0
	 */		
	function custom_gutenberg_classes() {
		wp_enqueue_script(
			'sig-editor', 
			get_stylesheet_directory_uri() . '/assets/js/editor.js', 
			array( 'wp-blocks', 'wp-dom' ), 
			filemtime( get_stylesheet_directory() . '/assets/js/editor.js' ),
			true
		);
	}
}
add_action( 'enqueue_block_editor_assets', 'custom_gutenberg_classes' );


// Theme supports wide images, galleries and videos.


add_theme_support( 'align-wide' );

add_theme_support('disable-custom-gradients');
//add_theme_support('editor-gradient-presets', array());

add_theme_support( 'custom-line-height' );

add_theme_support( 'disable-custom-font-sizes' );

add_theme_support( 'editor-font-sizes', array(
    array(
        'name' => esc_attr__( 'Small', 'sig' ),
        'size' => '1.5rem',
        'slug' => 'small',
        //'shortName' => esc_attr__( 'S', 'sig' )
    ),
    array(
        'name' => esc_attr__( 'Regular', 'sig' ),
        'size' => '1.85rem',
        'slug' => 'regular',
        //'shortName' => esc_attr__( 'R', 'sig' )
    ),
    array(
        'name' => esc_attr__( 'Medium', 'sig' ),
        'size' => '2.25rem',
        'slug' => 'medium',
        //'shortName' => esc_attr__( 'M', 'sig' )
    ),
    array(
        'name' => esc_attr__( 'Large', 'sig' ),
        'size' => '3rem',
        'slug' => 'large',
        //'shortName' => esc_attr__( 'L', 'sig' )
    ),
    array(
        'name' => esc_attr__( 'Extra Large', 'sig' ),
        'size' => '3.75rem',
        'slug' => 'x-large',
        //'shortName' => esc_attr__( 'XL', 'sig' )
    ),
) );

function fix_gutenberg_typography_labels() {
  echo '<style>

  button[aria-label="Small"] div {
    display: none;
  }
  button[aria-label="Small"]:after {
      content: "S";
  }
  
  button[aria-label="Regular"] div {
    display: none;
  }
  button[aria-label="Regular"]:after {
      content: "R";
  }

  button[aria-label="Medium"] div {
    display: none;
  }
  button[aria-label="Medium"]:after {
      content: "M";
  }

  button[aria-label="Large"] div {
    display: none;
  }
  button[aria-label="Large"]:after {
      content: "L";
  }

  button[aria-label="Extra Large"] div {
    display: none;
  }
  button[aria-label="Extra Large"]:after {
      content: "XL";
  }
  </style>';
}

add_action('admin_head', 'fix_gutenberg_typography_labels');



add_theme_support( 'editor-color-palette', array(
    
    array(
		'name'  => esc_html__( 'Blue Dark', 'sig' ),
		'slug'  => 'blue-dark',
		'color' => '#001e5f',
	),
    array(
		'name'  => esc_html__( 'Blue', 'sig' ),
		'slug'  => 'blue',
		'color' => '#003eff',
	),
    array(
		'name'  => esc_html__( 'Blue Dark Medium', 'sig' ),
		'slug'  => 'blue-dark-medium',
		'color' => '#021bc3',
	),
    
    array(
		'name'  => esc_html__( 'Blue Medium', 'sig' ),
		'slug'  => 'blue-medium',
		'color' => '#0066fd',
	),
    
     array(
		'name'  => esc_html__( 'Blue Light Medium', 'sig' ),
		'slug'  => 'blue-light-medium',
		'color' => '#66a2ff',
	),
    
    array(
		'name'  => esc_html__( 'Blue Light', 'sig' ),
		'slug'  => 'blue-light',
		'color' => '#b7d3ff',
	),
    
    array(
		'name'  => esc_html__( 'Green', 'sig' ),
		'slug'  => 'green',
		'color' => '#5defa3',
	),
    
    array(
		'name'  => esc_html__( 'Orange', 'sig' ),
		'slug'  => 'orange',
		'color' => '#f48069',
	),
    
    array(
		'name'  => esc_html__( 'Tan', 'sig' ),
		'slug'  => 'tan',
		'color' => '#f0ebd2',
	),
    
    array(
		'name'  => esc_html__( 'Tan Light', 'sig' ),
		'slug'  => 'tan-light',
		'color' => '#f2f0e2',
	),
    array(
		'name'  => esc_html__( 'Grey Light', 'sig' ),
		'slug'  => 'grey-light',
		'color' => '#f3f2ec',
	),
    array(
		'name'  => esc_html__( 'Grey', 'sig' ),
		'slug'  => 'grey',
		'color' => '#868b8b',
	),
    array(
		'name'  => esc_html__( 'Dark', 'sig' ),
		'slug'  => 'dark',
		'color' => '#2f2f31',
	),	
    array(
		'name'  => esc_html__( 'Black', 'sig' ),
		'slug'  => 'black',
		'color' => '#000000',
	),
	array(
		'name'  => esc_html__( 'White', 'sig' ),
		'slug'  => 'white',
		'color' => '#ffffff',
       ),
  
    
) );


    
$tanlight = 'rgba(242 240 226,1)';
$bluelight = 'rgba(183 211 255,1)';
$bluedark = 'rgba(0 30 95,1)';
$blue = 'rgba(0 62 255,1)';
$greylight = 'rgba(243 242 236,1)'; //#f3f2ec;
add_theme_support('editor-gradient-presets', array(
    array(
        'name' => __('Tan Light to Blue', 'sig'),
        'gradient' => 'linear-gradient(70deg, '.$tanlight.' 30%, '.$bluelight.' 100%)',
        'slug' => 'tan-light-to-blue-light'
    ),
    array(
        'name' => __('Dark Blue to Blue', 'sig'),
        'gradient' => 'linear-gradient(180deg, '.$bluedark .' 0%, '.$blue.' 100%)',
        'slug' => 'blue-dark-to-blue'
    ),
    array(
        'name' => __('Blue Light to Tan White', 'sig'),
        'gradient' => 'linear-gradient(70deg, '.$bluelight.' 30%, '.$tanlight.' 100%)',
        'slug' => 'blue-light-to-tan-light',
    ),
    
    array(
        'name' => __('Dark Blue to Grey Light', 'sig'),
        'gradient' => 'linear-gradient(180deg, '.$bluedark .' 0%, '.$greylight.' 100%)',
        'slug' => 'blue-dark-to-grey-light'
    ),
));


/**
 * Block Editor: Auto Expand Advanced & All Sidebar Panels [SnipSnip.pro]
 *
 * Block Editor: Auto Expand Advanced &amp; All Sidebar Panels [SnipSnip.pro] - When using Block Editor, anytime the content in the sidebar changes, any panels that are closed will open automatically. https://snipsnip.pro/s/751
 */
if (!class_exists('Expand_Sidebar_Panels_On_Mutation')) {
  class Expand_Sidebar_Panels_On_Mutation {
    public function __construct() {
      add_action('admin_footer', array($this, 'add_inline_script'));
    }

    public function add_inline_script() {
      if (!function_exists('get_current_screen')) {
        return false;
      }
      $screen = get_current_screen();
      if (method_exists($screen, 'is_block_editor') && $screen->is_block_editor()) {
        ?>
        <script type="text/javascript">
      setTimeout(() => {

        (function () {
            function expandPanels() {
                const panelBodies = document.querySelectorAll('div.components-panel__body:not(.is-opened)');
                panelBodies.forEach((panelBody) => {
                    const buttons = panelBody.querySelectorAll('button.components-button');
                    buttons.forEach((button) => button.click());
                });
            }

            let activeTimer = null;
            let observer = null;

            function setupObserver() {
                const targetElement = document.querySelector('div.interface-navigable-region.interface-interface-skeleton__sidebar');

                if (targetElement) {
                    if (observer) {
                        observer.disconnect();
                    }

                    observer = new MutationObserver((mutationsList, observer) => {
                        for (let mutation of mutationsList) {
                            // Check if the mutation or its descendants match your desired criteria
                            if (mutation.type === 'childList' && mutation.target.classList.contains('block-editor-block-inspector')) {
                                if (activeTimer) {
                                    clearTimeout(activeTimer);
                                }
                                activeTimer = setTimeout(expandPanels, 500);
                            }
                        }
                    });

                    observer.observe(targetElement, { childList: true, subtree: true });
                } else {
                    setTimeout(setupObserver, 100);
                }
            }

            setupObserver();
            //console.log("Block Editor: Auto Expand Advanced & All Sidebar Panels [SnipSnip.pro]");
        })();

      }, 7373);
        </script>
        <?php
      }
    }
  }

  new Expand_Sidebar_Panels_On_Mutation();
}



?>