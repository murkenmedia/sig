<?php
/**
 * Hero
 *
 * @package SIG
 * @since   1.0.0
 */

global $post;

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$block_classes = array(
	'hero',
	$block['align'],	
	$className,
);

$class = $title = $titleclass = $titletext = $imgid = $classes = $heroscreen = $bgvideo = $pretitle = $posttitle = $testimonialsbtn = $darkenupper = $darkenlower = $bluebg = $blueimgbg = '';

$customtitle = $today = $hidetitle = $screenbg = $customcontent = $headervideo = $showparent = $showtestimonialsbtn = $tanbg = $usefeatured = $customheroheight = $titlebox = $alignbottom = false;

$id = get_the_id();

$pageoptions = array();
if(get_field('page_options', $id)) {
    $pageoptions = get_field('page_options', $id);
}

//OPTIONS
$subpage = true;

/*
$contentarr = $stylearr = $imgarr = array();
if(get_field('hero_content')) {
    $contentarr = get_field('hero_content');
}

if(get_field('hero_style')) {
    $stylearr = get_field('hero_style');
}

if(get_field('hero_image')) {
    $imgarr = get_field('hero_image');
}

$optionsarr = get_field('options');

$options = array_merge($contentarr, $stylearr, $imgarr, $optionsarr);*/


/*
#title1 : Hero Content
hide-title : Hide Page Title
custom-title : Custom Page Title
show-parent : Show Pre-Title Parent Link
custom-content : Custom Content
#title2 : Hero Style
darken-bg : Darken BG
dark-nav-bg : Dark Nav BG
tall-hero : Tall Hero
medium-hero : Medium Hero
#title3 : Hero Image
use-featured : Use Featured Image
custom-image : Custom Image
video-bg-fullscreen : Fullscreen Video BG
video-bg : Video BG
*/

$options = get_field('options');


if( !empty($options) ): 
    foreach( $options as $option ):
        if ($option == 'hide-title') {
            $hidetitle = true;
        }
        if ($option == 'show-parent') {
            $showparent = true;
        }
        if ($option == 'custom-title') {
            $customtitle = true;
        }
        if ($option == 'darken-bg') {
            $screenbg = true;
        }
        if ($option == 'darken-upper') {
            $darkenupper = '<div class="hero__darken-lower"></div>';
        }
        if ($option == 'darken-lower') {
            $darkenlower = '<div class="hero__darken-upper"></div>';
        }
        if ($option == 'blue-bg-gradient') {
            array_push($block_classes, 'has-blue-gradient-bg');
            $bluebg = '<div class="hero__bluegradient"></div>';
            $blueimgbg = '<div class="hero__image__bluebg"></div>';
        }
        if ($option == 'custom-content') {
            array_push($block_classes, 'custom-content');
            $customcontent = true;
        }
        if ($option == 'video-bg-fullscreen') {
            $headervideo = true;
            $subpage = false;            
        }
        if ($option == 'video-bg') {
            $headervideo = true;
            $subpage = false;
            array_push($block_classes, 'secondary-hero-video');
        }
        if($option == 'full-hero') {
            $customheroheight = true;
            array_push($block_classes, 'full-hero');
        }

        if($option == 'tall-hero') {
            $customheroheight = true;
            array_push($block_classes, 'tall-hero');
        }

        if($option == 'medium-hero') {
            $customheroheight = true;
            array_push($block_classes, 'medium-hero');
        }

        if($option == 'align-content-center') {
            array_push($block_classes, 'align-content-center');
        }
        
        if($option == 'use-featured') {
            $usefeatured = true;
        }
    endforeach;
endif;


////IS SECONDARY PAGE ADJUST HEIGHT
if($subpage && $customheroheight == false) {
    array_push($block_classes, 'secondary-hero');
}


/////////BG IMAGE
if($usefeatured) {
    if (has_post_thumbnail( $id ) ) {
        $imgid = get_post_thumbnail_id($id);
    } else {
        $imgid = get_field('default_hero', 'options');        
    } 
} else {
    if (get_field('bg')) {
        $imgid = get_field('bg');
    } else {
        $imgid = get_field('default_hero', 'options');
    }
}
$imgdiv = '
<div id="hero__image" class="hero__image alignfull active">
    '.wp_get_attachment_image($imgid, 'full', '', array('class'=>'hero__image__img', 'onload'=> "this.className='in-view hero__image__img'")).'
</div>';


//////////BREADCRUMB NAV
if($showparent == true) {
    $parentid = '';
    if(get_field( "custom_parent" )) {
        $parentid = get_field( "custom_parent" );
    } else {
        $parentid = $post->post_parent;
    }
    
    if($parentid != '') {
        $pretitle = '
        <p class="hero__content__pretitle has-white-color text-uppercase is-style-subtitle d-block text-center mb-2 fade-in">
            <a href="'.get_permalink($parentid).'" >'.get_the_title($parentid).'</a>
        </p>';
    }    
}
/////////////HERO TITLE
if($customtitle == true) {
    $titletext = get_field( "custom_title" );
    if (str_contains($titletext, '<br />')) {
        $titleclass .= ' ignore-br-lg';
    }
} else {
    $titletext = get_the_title($id);
}
$titleshow = ' d-block';
$titlefade = ' fade-in';
if ($hidetitle  == true || in_array('hide_title', $pageoptions)) {
    $titleshow = ' d-none';
} else {
    
    if($titlebox) {
        $titleclass .= ' has-large-font-size';
        $titleshow = ' d-table';
        array_push($block_classes, 'has-title-box');
        $titlefade = '';
        $pretitle = '<div class="hero__content__titlebox">';
        $posttitle = '</div>';
    }
    
    
}
$title = $pretitle.'<h1 class="hero__content__title '.$titleclass.$titleshow.$titlefade.'">'.$titletext.'</h1>'.$posttitle;


$headertitle = '';
if($title !== '') {
    $headertitle = $title;
}
$hiddentitle = '';

//////////////CUSTOM CONTENT
if($customcontent) {
    $hiddentitle = '<h1 class="d-none">'.$titletext.'</h1>';
}


if(in_array('no_title', $pageoptions)) {
    $headertitle = $hiddentitle = '';
}

////////////BG SCREEN
if ($screenbg) {
    $opacity = get_field('bg_opacity');
    $heroscreen .= '
    <div class="hero__screen" style="opacity:0.'.$opacity.'" ></div>';
}


////////////////VIDEO
if ($headervideo) {
    
    if(get_field('align_content_bottom')) {
		array_push($block_classes, 'secondary-hero');
	}
	if(get_field('hide_video_title')) {
		array_push($block_classes, 'hide-video-title');
	}
	if(get_field('video_description')) {
		$videodescription = get_field('video_description');
	} else {
		 $videodescription = __('There is no audio associated with the video.', 'sig');
	}
    
    if(get_field('video_placeholder')) {
        $posterid = get_field('video_placeholder');        
        $imgdiv = '<div id="hero__image" class="hero__image alignfull active">'.wp_get_attachment_image($posterid, 'full', '', array('class'=>'hero__image__img', 'onload'=> "this.className='in-view hero__image__img'")).'</div>';
    }
    
    
    array_push($block_classes, 'in-view');
	
	$autoplay = ' autoplay-video';
    
	
	$desktopvid = $mobilevid = $videoclass = '';
        
    $desktopvid = get_field('desktop_mp4');
    $mobilevid = get_field('mobile_mp4');
    $loadvideo = $desktopvid;
    $videoclass = '';
    if ( wp_is_mobile() ) {
        $videoclass = ' mobile-video';
        $loadvideo = $mobilevid;
    }

    $bgvideo = '
    <video id="hero__video" class="hero__video '.$videoclass.$autoplay.'" playsinline muted preload="none" tabindex="-1" aria-label="'.$videodescription.'" >
        <source id="hero__video__src" type="video/mp4" data-mobile="'.$mobilevid.'" data-src="'.$desktopvid.'" data-loop="" src="'.$loadvideo.'" />
        Your browser does not support the video tag.
    </video>
    <div id="hero__controls" class="hero__controls" data-state="hidden">
        <button id="hero__controls__playpause" class="hero__controls__playpause paused-btn" data-state="pause"><span class="sr-only">'.__('Play/Pause Video', 'sig').'</span></button>        
    </div>';
    
    array_push($block_classes, 'has-hero-video in-view');
}



?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">
    <div class="hero__content has-white-color animation-chain">
        <?php echo $hiddentitle;
        if($customcontent) { ?>
            <InnerBlocks />
        <?php  
        } else {
             echo $headertitle;
        } ?>
    </div>
    <?php echo $testimonialsbtn.
    $bgvideo.
    $heroscreen.
    $darkenlower.
    $darkenupper.
    $bluebg.
    $blueimgbg.
    $imgdiv; 
    ?>    
</div>
