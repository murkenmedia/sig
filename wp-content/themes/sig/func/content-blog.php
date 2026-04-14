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

if ( ! function_exists( 'get_post_block' ) ) {
	/**
	 * GET POST BLOCK
	 *
	 * @since 1.0.0
	 */
	
	function get_post_block($id,$pretitle='') {
		$blockclass = '';
        $lineclamp = 'line-clamp-6';
        $titleclass = ' has-regular-font-size';
		$title = widowfix(get_the_title($id));
        if(strlen($title) > 65) {
            $titleclass = ' has-small-font-size';
            $lineclamp = 'line-clamp-3';
        }

		$excerpt = get_the_excerpt($id);
        //$excerpt = wp_trim_words( $excerpt, 50 , '...' );

		$url = get_the_permalink($id);
        
		$img = get_default_image($id);

        //$postype = get_post_type($id);
        //$date = get_the_date('F j, Y', $id);

        $subtitle = '';
        if($pretitle = 'cpt') {
            $posttype = get_post_type($id);
            $cpt = get_insight_cpt_title($posttype);
            $subtitle = '<p class="tile__content__pretitle mb-2 sans-600 has-blue-medium-color text-uppercase has-small-font-size letter-spacing-1">'.$cpt.'</p>';
        }

		$content = '
		<article class="tile">
			<figure class="tile__img">
				<a href="'.$url.'" tabindex="-1">
                    <span class="sr-only">'.$title.'</span>
					'.$img.'
				</a>
			</figure>
            <div class="tile__content pt-1">
                '.$subtitle.'
                <h3 class="mb-3 has-blue-dark-color'.$titleclass.'"><a href="'.$url.'">'.$title.'</a></h3>                
                <p class="'.$lineclamp.' has-small-font-size">'.$excerpt.'</p>
                <div class="wp-block-button">
                    <a class="wp-block-button__link" tabindex="-1" href="'.$url.'">
                    <span>'.__('Read More', 'sig').'<span><span class="sr-only">: '.$title.'</span></a>
                </div>
            </div>
		</article>';
		

		return $content;
	}

}

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


if ( ! function_exists( 'get_post_block_with_filters' ) ) {
	/**
	 * GET POST BLOCK
	 *
	 * @since 1.0.0
	 */
	
	function get_post_block_with_filters($id,$class='',$cpt=array()) {
		$blockclass = '';
        $lineclamp = 'line-clamp-6';
        $titleclass = ' has-regular-font-size';
		$title = widowfix(get_the_title($id));
        if(strlen($title) > 65) {
            $titleclass = ' has-small-font-size';
            $lineclamp = 'line-clamp-3';
        }

        $classes = array();
        array_push($classes,$class);

        $posttype = get_post_type($id);
        $pretitle = $pretitletext = '';
        array_push($classes, $posttype);

        if(count($cpt) == 1) {
            switch ($posttype) {
                case "case-study":
                    $pretitletext = get_field('client_name', $id);

                    break;
                default:
                   $pretitletext = get_insight_cpt_title($posttype);

                    break;
            }


        } else {

            $pretitletext = get_insight_cpt_title($posttype);

        }

        $pretitle = '<p class="tile__content__pretitle mb-2 sans-600 has-blue-medium-color text-uppercase has-small-font-size letter-spacing-1">'.$pretitletext.'</p>';
        

        $terms = get_the_terms( $id, 'insight_topic' );						
        if ( $terms && ! is_wp_error( $terms ) ) : 
            foreach ( $terms as $term ) {
                $classes[] = $term->slug;
            }
        endif;

        /* $terms = get_the_terms( $id, 'post_tag' );						
        if ( $terms && ! is_wp_error( $terms ) ) : 
            foreach ( $terms as $term ) {
                $classes[] = $term->slug;
            }
        endif; */

		$excerpt = get_the_excerpt($id);
        if($excerpt == '') {
            $excerpt = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ';
        }
        //$excerpt = wp_trim_words( $excerpt, 50 , '...' );
		$url = get_the_permalink($id);
        
		$img = get_default_image($id);
        //F j, Y
        //$date = '<span class="date">'.get_the_date('n/j/y', $id).'</span>';

        /* <div class="wp-block-button">
            <a class="wp-block-button__link" tabindex="-1" href="'.$url.'">
            <span>'.__('Read More', 'sig').'<span><span class="sr-only">: '.$title.'</span></a>
        </div> */

		$content = '
		<article class="tile post-grid__tile '.esc_attr( implode( ' ', $classes ) ).'">
			<figure class="tile__img">
				<a href="'.$url.'" tabindex="-1">
                    <span class="sr-only">'.$title.'</span>
					'.$img.'
				</a>
			</figure>
            <div class="tile__content pt-1">
                '.$pretitle.'
                <h3 class="mb-3 has-blue-dark-color'.$titleclass.'"><a href="'.$url.'">'.$title.'</a></h3>
                
                <p class="'.$lineclamp.' has-small-font-size mb-0">'.$excerpt.'</p>
                
            </div>
		</article>';
		

		return $content;
	}

}
if ( ! function_exists( 'get_filter_post_blocks' ) ) {
	/**
	 * GET POST ALL BLOCKS
	 *
	 * @since 1.0.0
	 */
	function get_filter_post_blocks($args, $max = 9, $cpt=array()) {
		$blocks = $class = '';

		$the_query = new WP_Query( $args );

        $num = 0;
		if ( $the_query->have_posts() ) {
                
            while ( $the_query->have_posts() ) {
                $the_query->the_post();
                $postid = get_the_id();

                $class='';
                if($num < $max) {
                    $class='filter-active';
                }
                $blocks .= get_post_block_with_filters($postid,$class,$cpt);

                $num++;
            }

            wp_reset_postdata();
        }

        return $blocks;	

	}
		
}
	

if ( ! function_exists( 'get_related_insights' ) ) {
	/**
	 * GET RELATED BLOG
	 *
	 * @since 1.0.0
	 */
	function get_related_insights($postid='',$topicarr='',$cpt=array(),$type = '',$max=3) { 
        
        $excludearr = array();
        array_push($excludearr, $postid);
        
        $postcount = 0;
        //$max = 3;
        $related = '';

        $cptarr = array('post', 'case-study', 'webinar');
        if(!empty($cpt)) {
            $cptarr = $cpt;
        }

        $args = array( 
            'post_type' => $cptarr,
            'post_status' => 'publish',
            'tax_query' => array(
                array(
                    'taxonomy' => 'insight_topic',
                    'field'    => 'term_id',
                    'terms'    => $topicarr,
                )
            ),
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
                    $related .= get_post_block($id);
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
                'post_type' => $cptarr,
                'post_status' => 'publish',
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
                        $related .= get_post_block($id,'cpt');
                        break;
                }
            
                $postcount++;
            endwhile;
            wp_reset_postdata();
            
        }
        
        
        
        /////////////SHOW THE CATEGORY
        /* if($postcount < $max) {
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
            
        } */
        
        return $related;
        
    }
    
}

if ( ! function_exists( 'get_insight_cpt_title' ) ) {
	/**
	 * GET INSIGHT GRID BLOCK
	 *
	 * @since 1.0.0
	 */
	function get_insight_cpt_title($cpt) {
        $title = '';
        switch ($cpt) {
            case 'post':
                $title = 'Insights';
                break;
            case "case-study":
                $title = 'Case Studies';                
                break;
            case "events":
                $title = 'Events';                
                break;
            case "webinar":
                $title = 'Webinars';                
                break;
            default:
                $title = ucfirst($cpt);
        }

        return $title;
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

        $posttype= get_post_type($id);

        $cpt = get_insight_cpt_title($posttype);
        //$date = get_the_date('F d, Y', $id);
        //<span class="blog-related-link__date">'.ucfirst($postype).'</span>
        
        return '
        <li class="blog-related-link">
            <span class="blog-related-link__cpt sans-bold text-uppercase letter-spacing-1">'.$cpt.'</span>
            <a class="blog-related-link__link" href="'.$url.'">'.$title.'</a>
            
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

if ( ! function_exists( 'get_related_insights_articles' ) ) {
	/**
	 * GET RELATED BLOG
	 *
	 * @since 1.0.0
	 */
    function get_related_insights_articles($id) {
        
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
