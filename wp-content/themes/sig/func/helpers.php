<?php


add_filter( 'excerpt_length', function( $length ) { return 80; } );

if ( ! function_exists( 'get_vimeo_id' ) ) {
	/**
	 * GET VIMEO ID
	 *
	 * @since 1.0.0
	 */
	function get_vimeo_id($url) {
		$pattern = '/(?:https?:\/\/)?(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/';
		
		if (preg_match($pattern, $url, $matches)) {
			return $matches[3];
		}
		return null;
	}
}

if ( ! function_exists( 'url_exists' ) ) {
	/**
	 * CHECK IF URL EXISTS
	 *
	 * @since 1.0.0
	 */
    function url_exists($url) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$url);
        // don't download content
        curl_setopt($ch, CURLOPT_NOBODY, 1);
        curl_setopt($ch, CURLOPT_FAILONERROR, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($ch);
        curl_close($ch);
        if($result !== FALSE)  {
            return true;
        } else {
            return false;
        }
    }
}

if ( ! function_exists( 'widowfix' ) ) {
	/**
	 * STOP WIDOWS
	 *
	 * @since 1.0.0
	 */
    function widowfix( $string ) {

      // Must contain a space
      if ( ! str_contains($string, ' ') ) {          
          $text = $string;
      } else {
          $string = rtrim($string);
          $words = explode( ' ', $string );
          $last = array_key_last( $words );
          $text = '';

          foreach ( $words as $index => $word ) {
            if ( 0 === $index ) {
              $text .= $word;
            } elseif ( $index === $last ) {
              //$text .= '<span class="widowfix-on">&nbsp;</span>';
              //$text .= '<span class="widowfix-off"> </span>';
              $text .= '&nbsp;';
              $text .= $word;
            } else {
              $text .= " {$word}";
            }
          }
      }
      return $text;
    }
}
   

if ( ! function_exists( 'get_custom_title' ) ) {
	/**
	 * GET CUSTOM TITLE
	 *
	 * @since 1.0.0
	 */
	function get_custom_title($id,$hidetitle=false) {
		$headerclass = $title = $divclass = '';
		if (get_field('custom_title', $id)) {
			$title = get_field('custom_title', $id);
		} else {
			$title = get_the_title($id);
		}
		if($hidetitle == true) {
			$divclass .= ' d-none';
		}
		if (strlen($title) >= 30) {$headerclass .= ' is-style-small';}
		return '
		<div class="header-title mb-4 mb-lg-5 fade-in '.$divclass.'">
			<h1 class="'.$headerclass.'">'.$title.'</h1>
		</div>';

	}
}
if ( ! function_exists( 'get_default_image' ) ) {
	/**
	 * GET IMAGE OR BACKUP IMAGE
	 *
	 * @since 1.0.0
	 */
	function get_default_image($id) {
		$img = $image = '';
		if (has_post_thumbnail($id)) {
			$imgid = get_post_thumbnail_id($id);
		} else {
			$imgid = get_field('default_grid_img', 'option' );
		}
        $img = wp_get_attachment_image($imgid, 'full', '', array('loading'=>'lazy' ));
		return $img;
	}
}


if ( ! function_exists( 'get_post_gutenberg_blocks' ) ) {
	/**
	 * GET GUTENBERG POST BLOCKS
	 *
	 * @since 1.0.0
	 */
	function get_post_gutenberg_blocks($post_id) {
		$post = get_post( $post_id );
		$content = '';

		if ( has_blocks( $post->post_content ) ) {
			$blocks = parse_blocks( $post->post_content );
			//print'<pre>';print_r($blocks);print'</pre>';
			foreach( $blocks as $block ) {
				$content .= render_block( $block );
			}
		}
		
		return $content;
	}
}

if ( ! function_exists( 'get_attachment_meta' ) ) {
	/**
	 * GET IMAGE ATTACHMENT META
	 *
	 * @since 1.0.0
	 */
	function get_attachment_meta( $attachment_id ) {

	$attachment = get_post( $attachment_id );
		return array(
			'alt' => get_post_meta( $attachment->ID, '_wp_attachment_image_alt', true ),
			'caption' => $attachment->post_excerpt,
			'description' => $attachment->post_content,
			'href' => get_permalink( $attachment->ID ),
			'src' => $attachment->guid,
			'title' => $attachment->post_title
		);
	}
}

if ( ! function_exists( 'get_attachment_desc' ) ) {
	/**
	 * GET IMAGE ATTACHMENT META
	 *
	 * @since 1.0.0
	 */
	function get_attachment_desc( $attachment_id ) {

		$attachment = get_post( $attachment_id );
		return $attachment->post_content;
	}
}


if ( ! function_exists( 'get_the_content_with_formatting' ) ) {
	/**
	 * GET CONTENT WITH FORMATTING
	 *
	 * @since 1.0.0
	 */
	function get_the_content_with_formatting($more_link_text = '(read more...)', $stripteaser = 0, $more_file = '') {
		$content = get_the_content($more_link_text, $stripteaser, $more_file);
		$content = apply_filters('the_content', $content);
		$content = str_replace(']]>', ']]&gt;', $content);
		$content = preg_replace( '|#more-[0-9]+|', '', $content );
		return $content;
	}
}

if ( ! function_exists( 'get_the_content_by_id' ) ) {
	/**
	 * GET CONTENT BY ID
	 *
	 * @since 1.0.0
	 */
	function get_the_content_by_id($id) {
		$content_post = get_post($id);
		$content = $content_post->post_content;
		$content = apply_filters('the_content', $content);
		$content = str_replace(']]>', ']]&gt;', $content);
		return $content;
	}
}

if ( ! function_exists( 'get_post_excerpt' ) ) {
	/**
	 * GET POST EXCERPT BY ID
	 *
	 * @since 1.0.0
	 */
	function get_post_excerpt($id) {
		$content = get_post_field('post_excerpt', $id);
		return $content;
	}
}



if ( ! function_exists( 'extra_search_form' ) ) {
	/**
	 * EXTRA SEARCH FORM
	 *
	 * @since 1.0.0
	 */
	function extra_search_form( $form ) {
		$form = '
		<form class="searchform" role="search" method="get" id="searchform" action="'. home_url( '/' ) .'">
			<label for="search">Search</label>
				<input name="s" id="search" size="15" type="text" placeholder="Write keyword and press enter">			
			<button type="submit" class="search-submit"><span class="search-icon"></span></button>
		</form>';
		return $form;
	}
}



if ( ! function_exists( 'get_archive_title' ) ) {
	/**
	 * ARCHIVE TITLES
	 *
	 * @since 1.0.0
	 */
	function get_archive_title( $title ) {
		if ( is_category() ) {
			$title = single_cat_title( '', false );
		} elseif ( is_tag() ) {
			$title = single_tag_title( '', false );
		} elseif ( is_author() ) {
			$title = '<span class="vcard">' . get_the_author() . '</span>';
		} elseif ( is_post_type_archive() ) {
			$title = post_type_archive_title( '', false );
		} elseif ( is_tax() ) {
			$title = single_term_title( '', false );
		}

		return $title;
	}
}
//add_filter( 'get_the_archive_title', 'get_archive_title' );




if ( ! function_exists( 'sig_comment' ) ) {
	/**
	 * COMMENTS
	 *
	 * @since 1.0.0
	 */
	function sig_comment( $comment, $args, $depth ) {
		$GLOBALS['comment'] = $comment;
		switch ( $comment->comment_type ) :
			case 'pingback' :
			case 'trackback' :
			// Display trackbacks differently than normal comments.
		?>
		<li <?php comment_class(); ?> id="comment-<?php comment_ID(); ?>">
			<div class="container comment-author vcard">
				<div class="row ">
					<div class="col-12">
						<p><?php _e( 'Pingback:', 'sig' ); ?> <?php comment_author_link(); ?> <?php edit_comment_link( __( '(Edit)', 'sig' ), '<span class="edit-link">', '</span>' ); ?></p>
					</div>
				</div>
			</div>
		<?php
				break;
			default :
			// Proceed with normal comments.
			global $post;
		?>
		<li <?php comment_class(); ?> id="comment-<?php comment_ID(); ?>">
			<div class="container comment-author vcard">
				<div class="row ">
					<div class="col avatar">
						<?php echo get_avatar( $comment, 100 ); ?>
					</div>

					<div class="col">
						<div class="container">
							<div class="row no-gutters">
								<div class="col-12 col-sm-7">
									<?php printf( '<h5 class="author"><cite><strong>%1$s</strong> %2$s</cite></h5>',
											get_user_meta( $comment->user_id, 'nickname', true ),
											( $comment->user_id === $post->post_author ) ? '<span class="post-author">' . __( 'Post author', 'sig' ) . '</span>' : ''
										);
									?>

								</div>
								<div class="col-12 col-sm-5 commentdate">
									<?php 
									printf( '<p class="comment-date"><a href="%1$s"><time datetime="%2$s">%3$s</time></a></p>',
											esc_url( get_comment_link( $comment->comment_ID ) ),
											get_comment_time( 'c' ),
											/* translators: 1: date, 2: time */
											sprintf( __( '%1$s at %2$s', 'sig' ), get_comment_date(), get_comment_time() )
										); ?>
								</div>
								<hr />

								<?php if ( '0' == $comment->comment_approved ) : ?>
									<div class="col-12"><p class="comment-awaiting-moderation"><?php _e( 'Your comment is awaiting moderation.', 'sig' ); ?></p></div>
								<?php endif; ?>

								<div class="col-11 comment-content comment"><?php comment_text(); ?></div>

								<div class="col-1 text-right"><?php edit_comment_link( __( 'Edit', 'sig' ), '<p class="edit-link">', '</p>' ); ?></div>



								<div class="col-12 reply">
									<?php comment_reply_link( array_merge( $args, array( 'reply_text' => __( 'Reply', 'sig' ), 'after' => ' <span>&darr;</span>', 'depth' => $depth, 'max_depth' => $args['max_depth'] ) ) ); ?>
								</div>

								<?php paginate_comments_links(); ?>

							</div>
						</div>
					</div>
				</div>
			</div>
		</li>
		<?php
			break;
		endswitch;
	}

}


if ( ! function_exists( 'disable_comment_url' ) ) {
	/**
	 * REMOVE COMMENT LINK
	 *
	 * @since 1.0.0
	 */
	function disable_comment_url($fields) { 
		unset($fields['url']);
		return $fields;
	}
}
add_filter('comment_form_default_fields','disable_comment_url');


if ( ! function_exists( 'custom_excerpt_length' ) ) {
	/**
	 * EXCERPT LENGTH
	 *
	 * @since 1.0.0
	 */
	function custom_excerpt_length( $length ) {
		return 50;
	}
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

if ( ! function_exists( 'excerpt_more' ) ) {
	/**
	 * EXCERPT MORE
	 *
	 * @since 1.0.0
	 */
	function excerpt_more( $more ) {
		return sprintf( '...');
	}
}
add_filter( 'excerpt_more', 'excerpt_more' );

if ( ! function_exists( ' get_excerpt_max_charlength' ) ) {
	/**
	 * EXCERPT MAX LENGTH
	 *
	 * @since 1.0.0
	 */
	function get_excerpt_max_charlength($id, $charlength) {
		$excerpt = get_the_excerpt($id);
		$charlength++;

		$final = '';

		if ( mb_strlen( $excerpt ) > $charlength ) {
			$subex = mb_substr( $excerpt, 0, $charlength - 5 );
			$exwords = explode( ' ', $subex );
			$excut = - ( mb_strlen( $exwords[ count( $exwords ) - 1 ] ) );
			if ( $excut < 0 ) {
				$final .= mb_substr( $subex, 0, $excut );
			} else {
				$final .= $subex;
			}
			$final .= '...';
		} else {
			$final = $excerpt;
		}

		return $final;
	}
}

?>