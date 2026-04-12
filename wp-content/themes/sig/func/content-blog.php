<?php

if ( ! function_exists( 'get_blog_title' ) ) {
	/**
	 * GET BLOG TITLE
	 *
	 * @since 1.0.0
	 */
    
    function get_blog_title() {         
        $blogid = get_option( 'page_for_posts' );        
        return get_the_title($blogid);
    }
}


if ( ! function_exists( 'get_blog_hero' ) ) {
	/**
	 * GET BLOG HERO
	 *
	 * @since 1.0.0
	 */
	function get_blog_hero($id) {
        
        $date = $title = $pretitle = '';
        
        /*if (has_post_thumbnail($id)) {
			$imgid = get_post_thumbnail_id($id);	

		} else {
			$imgid = get_field('blog_hero', 'option' );
		}*/
        
        if (get_field('hero_img', $id )) {
			$imgid = get_field('hero_img', $id);
		} else {
			$imgid = get_field('blog_hero', 'option' );
		}
        $img = wp_get_attachment_image($imgid, 'full', '', array('loading'=>'lazy' ));

        return '
        <div class="hero alignfull blog-hero">
            <div class="hero__image alignfull">
                '.wp_get_attachment_image($imgid, 'full', '', array('class'=>'hero__image__img', 'onload'=> "this.className='in-view hero__image__img'")).'
            </div>
            
        </div>';        
    }
}

/* if ( ! function_exists( 'get_post_block' ) ) {

	
	function get_post_block($id) {
		$blockclass = '';
		$title = get_the_title($id);
		$date = get_the_date('F j, Y', $id);		
		$excerpt = get_the_excerpt($id);
        $excerpt = wp_trim_words( $excerpt, 50 , '...' );
		$url = get_the_permalink($id);
        
		$img = get_default_image($id);
		
		$content = '
		<article class="post-grid three-col-grid__item">
			<figure class="post-grid__img">
				<a href="'.$url.'" tabindex="-1">
                    <span class="sr-only">'.$title.'</span>
					'.$img.'
				</a>
			</figure>
            <div class="post-grid__content">
                <h3 class="post-grid__content__title mb-2 sans-bold has-regular-font-size"><a href="'.$url.'" tabindex="-1">'.$title.'</a></h3>
                <p class="post-grid__content__date mb-2 has-blue-medium-color weight-600">'.$date.'</p>
                <p class="line-clamp">'.$excerpt.'</p>
                <div class="wp-block-button is-style-border-btn post-grid__content__btn">
                    <a class="wp-block-button__link" href="'.$url.'">
                    '.__('Read More', 'sig').'<span class="sr-only">: '.$title.'</span></a>
                </div>
            </div>
		</article>';
		

		return $content;
	}

} */

if ( ! function_exists( 'get_post_blocks' ) ) {
	/**
	 * GET POST BLOCKS
	 *
	 * @since 1.0.0
	 */
	function get_post_blocks($args,$loadposts=false,$page=1) {
		$blocks = $class = '';

		$args['paged'] = $page;
		$the_query = new WP_Query( $args );

		if ( $page > $the_query->max_num_pages ) {
			$blocks = '
            <div class="post-grid__posts__message">
                <p class="text-center">'. __('No more posts.', 'sig').'</p>
            </div>';
		} else {
			if ( $the_query->have_posts() ) {
                
				while ( $the_query->have_posts() ) {
					$the_query->the_post();
					$postid = get_the_id();
					$blocks .= get_post_block($postid);
				}

				if($loadposts == true) {
					if($the_query->max_num_pages == $page ) {

					} else {
                        
                        //LOAD MORE
                        $btntext = __('Load More', 'sig');
                        
						$blocks .= '
						<div class="post-grid__posts__message">
							<div class="wp-block-button fullwidth next-posts-link">'
                                .get_next_posts_link($btntext, $the_query->max_num_pages ).'
                            </div>
						</div>';
					}
				}

				wp_reset_postdata();
			}

		}
		return $blocks;	
	}
	
}

if ( ! function_exists( 'get_related_blog_articles' ) ) {
	/**
	 * GET RELATED BLOG
	 *
	 * @since 1.0.0
	 */
    function get_related_blog_articles($id) {
        
        $related = $cats =  $title = '';
        
        $catids = array();

        $posttype = get_post_type($id);


        $title = __('Related Articles', 'sig');
        
        $postids = array();
        
        $type = 'random';
        if(get_field('related_options', $id)) {
            $type = get_field('related_options', $id);
        }
        
        
        //BLOG NEWS ANC CEO BLOG
        $articles = get_field('related_articles', $id);

        if( $articles ) {
            foreach( $articles as $article ):
                array_push($postids, $article);
            endforeach;                
        }
        
        ///BLOG AND NEWS
        if($type == 'categories') {            
            $cats = get_field('related_categories', $id);
            if ( ! empty( $cats ) ) {
                foreach( $cats as $cat ):
                    array_push($catids, $cat);
                endforeach;                
            }            
        }
    
        
        ////BLOG
        if($type == 'random') {

            $categories = get_the_category($id);
            if ( ! empty( $categories ) ) {                    
                foreach( $categories as $category ) {
                    array_push($catids, $category->term_id);
                }                            
            }
        }


        $args = array( 
            'post_type' => $posttype,
            'post_status' => 'publish',
            'posts_per_page'=>3,
            'orderby'=> 'date', 
            'order' => 'DESC',
            'post__not_in' => array($id),
            'post__in' => $postids,
            'cat' => $catids
        );
        

        $loop = new WP_Query( $args );
        while ( $loop->have_posts() ) : $loop->the_post();
            $pid = get_the_ID(); 
            $purl = get_permalink($pid);
            $ptitle = get_the_title($pid);

            $related .= '
            <li>
                <a href="'.$purl.'">'.$ptitle.'</a>
            </li>';

        endwhile;
        wp_reset_postdata();
        
        
        
        if($related != '') {
            return '
            <div class="blog-sidebar-block">
                <h4 class="wp-block-heading is-style-default has-bluedark-color">'.$title.'</h4>
                <div class="related-blog-articles">
                    <ul class="wp-block-list is-style-arrow-links">
                        '.$related.'  
                    </ul>
                </div>
            </div>';
        }        
    }        
}


if ( ! function_exists( 'get_related_blog' ) ) {
	/**
	 * GET RELATED BLOG
	 *
	 * @since 1.0.0
	 */
	function get_related_blog($postid='',$tagsarr='',$catsarr='',$type = '',$max=3) { 
        
        $excludearr = array();
        array_push($excludearr, $postid);
        
        $postcount = 0;
        //$max = 3;
        $related = '';
        
        $args = array( 
            'post_type' => 'post',
            'post_status' => 'publish',
            'tag__and' => $tagsarr,
            'category__in' => $catsarr,
            'post__not_in' => $excludearr,
            'posts_per_page'=>$max,
        );
        
        ///////////EXACT MATCH
        $loop = new WP_Query( $args );
        while ( $loop->have_posts() ) : $loop->the_post();
            $id = get_the_ID();        
            array_push($excludearr, $id);
        
            switch ($type) {
                case 'link':
                    $related .= get_blog_related_link($id);
                    break;
                default:
                    $related .= get_post_block($id,$type);
                    break;
            }

            $postcount++;
        endwhile;
        wp_reset_postdata();
        
        
        
        /////////////NOT ENOUGH EXACT MATCHES
        if($postcount < $max) {
            
            //$related .= '. second round: ';
        
            $remaining = $max-$postcount;

            $args = array( 
                'post_type' => 'post',
                'post_status' => 'publish',
                'tag__in' => $tagsarr,
                'category__in' => $catsarr,
                'post__not_in' => $excludearr,
                'posts_per_page'=>$remaining,
            );

            $loop = new WP_Query( $args );
            while ( $loop->have_posts() ) : $loop->the_post();
                $id = get_the_ID();        
                array_push($excludearr, $id);
            
                switch ($type) {
                    case 'link':
                        $related .= get_blog_related_link($id);
                        break;
                    default:
                        $related .= get_post_block($id,$type);
                        break;
                }
            
                $postcount++;
            endwhile;
            wp_reset_postdata();
            
        }
        
        
        
        /////////////SHOW THE CATEGORY
        if($postcount < $max) {
            //$related .= '. third round: ';
        
            $remaining = $max-$postcount;

            $args = array( 
                'post_type' => 'post',
                'post_status' => 'publish',
                'category__in' => $catsarr,
                'post__not_in' => $excludearr,
                'posts_per_page'=>$remaining,
                'orderby'=>'rand'
            );

            $loop = new WP_Query( $args );
            while ( $loop->have_posts() ) : $loop->the_post();
                $id = get_the_ID();        
                switch ($type) {
                    case 'link':
                        $related .= get_blog_related_link($id);
                        break;
                    default:
                        $related .= get_post_block($id,$type);
                        break;
                }
            endwhile;
            wp_reset_postdata();
            
        }
        
        return $related;
        
    }
    
}
if ( ! function_exists( 'get_blog_related_link' ) ) {
	/**
	 * GET INSIGHT GRID BLOCK
	 *
	 * @since 1.0.0
	 */
	function get_blog_related_link($id) { 
        $url = get_the_permalink($id);
        $title = get_the_title($id);
        $date = get_the_date('F d, Y', $id);
        
        return '
        <li class="blog-related-link">
            <a class="blog-related-link__link" href="'.$url.'">'.$title.'</a>
            <span class="blog-related-link__date">'.$date.'</span>
        </li>';
    }
    
}


if ( ! function_exists( 'get_author_block' ) ) {
	/**
	 * GET INSIGHT GRID BLOCK
	 *
	 * @since 1.0.0
	 */
	function get_author_block($author = array()) {
        
        $url = $img = $name = '';
        
        if(isset($author->name)) {
            
            $name = $author->name;
            $id = $author->term_id;
            $imgid = get_field( 'author_img', 'term_'.$id);
            $img = wp_get_attachment_image($imgid, 'medium', '');
            $slug = $author->slug;
            $url = get_home_url().'/authors/'.$slug; 
        }
        
        return '
            <div class="blog-author">
                <figure class="blog-author__img mb-0">
                    <a href="'.$url.'" tabindex="-1">
                        '.$img.'
                    </a>
                </figure>
                <p class="blog-author__name mb-0"><a href="'.$url.'"><span class="sr-only">Read More Articles by </span>'.$name.'</a></p>
            </div>';
        
    }
    
}
