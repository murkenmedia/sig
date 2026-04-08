<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package SIG
 */

global $post;
$id = $post->ID;

$pagetitle = $content_markup = $hero = $headerpad = '';

$isadmin = false;
if (is_admin()) {
    $isadmin =  true;
}

$hidetitle = false;
$notitle = false;

if(get_field('page_options', $id)) {
	$options = get_field('page_options', $id);

	if(in_array('hide_title', $options)) {
		$hidetitle = true;
	}
	
	if(in_array('no_title', $options)) {
		$notitle = true;
	}
}


$blocks = parse_blocks( $post->post_content );
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
$parentid = $post->post_parent;
$breadcrumb = get_hero_breadcrumb($id,$parentid );
if ($hero == '') {
    $hero = get_hero_header($id,$breadcrumb);
} else {
    $hero = '<div class="header-pad">'.$hero.'</div>';
}

?>

<section id="post-<?php the_ID(); ?>" <?php post_class('site-content'); ?>>
 <?php 
	echo $hero;


	if($isadmin) {
		the_content();
	} else {
        if($content_markup == '') {
            echo '<p class="text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>';
        } else {
            echo $content_markup;
        }
		
	}
?>
</section>