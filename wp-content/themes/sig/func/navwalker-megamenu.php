<?php
 
/**
* Extended Walker class for Mega Menu
* Edited to support n-levels submenu and a Mega Menu.
* @author @jaycbrf4 
* @license CC BY 4.0 https://creativecommons.org/licenses/by/4.0/
*/
//$navimages = '';

class MegaMenuWalker extends Walker_Nav_Menu { 
    
  /**
   * Start Level
   *
   */
    function start_lvl( &$output, $depth = 0, $args = array() ) {
        $indent = str_repeat( "\t", $depth );
        $submenu = ($depth > 0) ? ' sub-menu' : '';

        if($depth == 0) {
            $output	.= "\n$indent<ul class=\"main-nav__dropdown dropdown-container dropdown-menu$submenu depth_$depth\" role=\"presentation\">\n";
        } else {
            $output	.= "\n$indent<ul class=\"main-nav__dropdown dropdown-menu$submenu depth_$depth\" role=\"presentation\">\n";
        }
        
    }
 
  /**
   * Start Element
   *
   */
  function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
      
    //global $navimages;      
    $indent         = ( $depth ) ? str_repeat( "\t", $depth ) : '';
    $li_attributes  = '';
    $class_names    = $value = '';
    $hasMegaMenu    = is_active_sidebar( 'mega-menu-item-' . $item->ID );
     
    $classes = empty( $item->classes ) ? array() : (array) $item->classes;

    $classes[] = ($args->has_children || $hasMegaMenu) ? 'dropdown' : '';
    $classes[] = ($item->current || $item->current_item_ancestor) ? 'active' : '';
    $classes[] = 'menu-item-' . $item->ID;

    if($depth && $args->has_children) {
        $classes[] = 'dropdown-submenu';
    }
      
    $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args ) );
    $class_names = ' class="' . esc_attr( $class_names ) . '" ';
     
    $id = apply_filters( 'nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args );
    $id = strlen( $id ) ? ' id="' . esc_attr( $id ) . '"' : '';

    $output .= $indent . '<li' . $id . $value . $class_names . $li_attributes . ' role="presentation">';
     
    $attributes = ! empty( $item->attr_title ) ? ' title="' . esc_attr( $item->attr_title ) .'"' : '';
    $attributes .= ! empty( $item->target ) ? ' target="' . esc_attr( $item->target ) .'"' : '';
    $attributes .= ! empty( $item->xfn ) ? ' rel="' . esc_attr( $item->xfn ) .'"' : '';
    $attributes .= ! empty( $item->url ) ? ' href="' . esc_attr( $item->url ) .'"' : '';

    if($depth == 0) {
        $attributes .= ' class="mega-parent-link depth-'.$depth.'" role="menuitem" aria-haspopup="true" aria-expanded="false"';
    } else {
         $attributes .= ' class="mega-sub-link depth-'.$depth.'" role="menuitem"';
    }
    
      
    $attributes .= ($args->has_children || $hasMegaMenu) ? ' ' : ''; 
     
    $item_output = $args->before;
    $item_output .= '<a'. $attributes .'>';
      
    if($args->has_children || $hasMegaMenu) {
        $item_output .= '<span class="link-wrap" role="presentation">'.$args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after.'</span>';
    } else {
        $item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;        
    }
      
    $item_output .= '</a>';
      
    $item_output .= $args->after;     
     
    $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );

    if ($hasMegaMenu) {
        
        $output .= '
        <div class="mega-menu dropdown-container" role="presentation">
            <div class="mega-menu__inner" role="presentation">
                <ul id="mega-menu-'.$item->ID.'" class="mega-menu__content dropdown-menu depth_'.$depth.'" role="presentation">';
        
        $menu = $dynamicSidebar = $imageSidebar = $figure = '';
        switch ($item->ID) {
            case 39:
                 $menu = 'solutions';
                break;
            case 44:
                $menu = 'platforms';
                break;
            case 47:
                $menu = 'about';
                break;
        }            
        $dynamicSidebar = wp_nav_menu( array( 'theme_location' => $menu, 'container' => '', 'items_wrap' => '%3$s', 'echo' => false, 'item_spacing' => 'discard', 'walker'  => new MegaDropDown_Walker()) );

        //ob_end_clean();
        $output .=  $dynamicSidebar;        
        
        
        $output .= '
                </ul>
                <span class="mega-menu__inner__gradient left-gradient" role="presentation"></span>
                <span class="mega-menu__inner__gradient right-gradient" role="presentation"></span>
           </div>
        </div>';
    }
  }

  /**
   * Display Element
   *
   */
  //function display_element( $element, &$children_elements, $max_depth, $depth=0, $args = array(), &$output ) 
	function display_element( $element, &$children_elements, $max_depth, $depth, $args, &$output ) {
    //v($element);
    if ( !$element )
    return;
     
    $id_field = $this->db_fields['id'];
     
    //display this element
    if ( is_array( $args[0] ) )
    $args[0]['has_children'] = ! empty( $children_elements[$element->$id_field] );
    else if ( is_object( $args[0] ) )
    $args[0]->has_children = ! empty( $children_elements[$element->$id_field] );
    $cb_args = array_merge( array(&$output, $element, $depth), $args);
    call_user_func_array(array(&$this, 'start_el'), $cb_args);
     
    $id = $element->$id_field;

    // descend only when the depth is right and there are childrens for this element
    if ( ($max_depth == 0 || $max_depth > $depth+1 ) && isset( $children_elements[$id]) ) 
    {
      foreach( $children_elements[ $id ] as $child )
      {
        if ( !isset($newlevel) ) 
        {
          $newlevel = true;
          //start the child delimiter
          $cb_args = array_merge( array(&$output, $depth), $args);
          call_user_func_array(array(&$this, 'start_lvl'), $cb_args);
        }

        $this->display_element( $child, $children_elements, $max_depth, $depth + 1, $args, $output );
      }

      unset( $children_elements[ $id ] );
    }
     
    if ( isset($newlevel) && $newlevel )
    {
      //end the child delimiter
      $cb_args = array_merge( array(&$output, $depth), $args);
      call_user_func_array(array(&$this, 'end_lvl'), $cb_args);
    }
     
    //end this element
    $cb_args = array_merge( array(&$output, $element, $depth), $args);
    call_user_func_array(array(&$this, 'end_el'), $cb_args);
  }
}

class MegaDropDown_Walker extends Walker_Nav_Menu {

    function start_el( &$output, $item, $depth=0, $args=array(),$current_object_id=0 ) {
        
        //global $navimages;      
        
        $this->curItem = $item;
        $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';
        $class_names = $value = '';
        
        if($item->title == '***START COLUMN') {            
            $output .= '<div class="mega-menu__column" role="presentation">';
        } else if ($item->title == '***END COLUMN') {            
            $output .= '</div>';            
        } else {
            
            
            $classes = empty( $item->classes ) ? array() : (array) $item->classes;
            $classes[] = 'menu-item-' . $item->ID;
            
            $description = '';
            if(!empty( $item->post_content )) {
                if($item->post_content != ' ') {
                    $description = '<div class="mega-menu__description" role="presentation">'.htmlspecialchars($item->post_content).'</div>';
                }                
            }


            $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args ) );
            $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';
            $id = apply_filters( 'nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args );
            $id = $id ? ' id="' . esc_attr( $id ) . '"' : '';


            $atts = array();
            $atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
            $atts['target'] = ! empty( $item->target )     ? $item->target     : '';
            $atts['rel']    = ! empty( $item->xfn )        ? $item->xfn        : '';
            $atts['href']   = ! empty( $item->url )        ? $item->url        : '';
            $atts['slug']   = ! empty( $item->slug )        ? $item->slug      : '';
            $atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args );
            $attributes = '';      

            $item_output = '';
            foreach ( $atts as $attr => $value ) {
                if ( ! empty( $value ) ) {
                    $value = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
                    $attributes .= ' ' . $attr . '="' . $value . '"';
                }
            }

            $attributes .= ' class="mega-sub-link" role="menuitem" ';

            $output .= '<li '.$class_names.'>';

            $output .= '<a'. $attributes. '>';
            $output .= apply_filters( 'the_title', $item->title, $item->ID );

            // Check if it is a submenu
            if ( $depth == 1 ) {            
                 $output .= '</a>';

            } elseif ( $depth == 0 ) {
                $item_output .= '</a>'.$description;
            }

            $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
        }
    }

    
}

