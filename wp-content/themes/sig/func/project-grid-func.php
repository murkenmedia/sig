<?php


if ( ! function_exists( 'get_project_grid' ) ) {
	/**
	 * GET PROJECT GRID
	 *
	 * @since 1.0.0
	 */
	function get_project_grid($id,$safecleanwater,$color='27, 106, 54') {
        
        $projectclass = $popup = $title = $img = $excerpt = $slug = $link1 = $link2 = $explorelink = $orglogo = '';
        
        
        $title = get_the_title($id);
        $slug = 'popup-'.sanitize_title($title);

        if(get_field('project_excerpt', $id)) {
            $excerptcopy = get_field('project_excerpt', $id);

            $excerptcopy = widowfix($excerptcopy);
            $excerpt = '
            <div class="project-grid__content__excerpt">
                <p>'.$excerptcopy.'</p>
            </div>';
            
            $projectclass = ' project-has-excerpt';
        }

        if(get_field('organization_logo', $id)) {
            $orgid = get_field('organization_logo', $id);
            $orglogo = wp_get_attachment_image($orgid, 'full');


            if(get_field('project_cta', $id)) {
                $cta = get_field('project_cta', $id);
                $ctatitle = $cta['title'];
                $ctaurl = $cta['url'];
                $ctatarget = $cta['target'];
                $explorelink = '<p class="is-external-link icon-opacity-full"><a href="'.$ctaurl.'" target="'.$ctatarget.'">'.$ctatitle.'</a></p>';
            }

        }

        $imgid = get_post_thumbnail_id($id);
        $img = wp_get_attachment_image($imgid, 'full');

        $popupcontent = get_post_gutenberg_blocks($id);


        $link1 = '<a href="#'.$slug.'" class="open-project-popup">';
        $link2 = '</a>';



        $popup = '
        <div id="'.$slug.'" class="mfp-hide project-popup">
            <div class="project-popup__img">
                '.$img.'
            </div>
            <div class="project-popup__content">
                <h3 class="mb-3">'.widowfix($title).'</h3>
                '.$popupcontent.'
                <div class="project-popup__footer">
                    <div class="project-popup__footer__col">
                        '.$safecleanwater.'
                    </div>
                    <div class="project-popup__footer__col">
                        '.$orglogo.$explorelink.'
                    </div>
                </div>
            </div>
        </div>';

        return '
        <div class="project-grid fade-in'.$projectclass.'">
            <a href="#'.$slug.'" class="open-project-popup project-grid__link" tabindex="-1"><span class="sr-only">'.__('Learn More about', 'sig').' '.$title.'</span></a>
            <div class="project-grid__content move-left delay-4">
                <div class="project-grid__content__title">
                    <h2>'.$link1.widowfix($title).$link2.'</h2>
                </div>
                '.$excerpt.'
                <div class="project-grid__content__bg" style="background-color:rgb('.$color.');"></div>
            </div>
            <div class="project-grid__bg">'.$img.'</div>
            '.$popup.'
        </div>';
        
    }
    
    
}



?>