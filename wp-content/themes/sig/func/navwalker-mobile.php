<?php


class MobileMenuWalker extends Walker_Nav_Menu { 
    
  /**
   * Start Level
   *
   */
  function start_lvl( &$output, $depth = 0, $args = array() ) {
    $indent = str_repeat( "\t", $depth );
    $submenu = ($depth > 0) ? ' sub-menu' : '';
    $output	.= "\n$indent<ul class=\"sub-menu$submenu depth_$depth\" role=\"presentation\">\n";
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
     
    $classes = empty( $item->classes ) ? array() : (array) $item->classes;

    //$classes[] = ($args->has_children) ? 'dropdown' : '';
    $classes[] = ($item->current || $item->current_item_ancestor) ? 'active' : '';
    $classes[] = 'menu-item-' . $item->ID;

   /* if($depth && $args->has_children)
    {
      $classes[] = 'dropdown-submenu';
    }*/
      
    $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args ) );
    $class_names = ' class="' . esc_attr( $class_names ) . '" ';
     
    $id = apply_filters( 'nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args );
    $id = strlen( $id ) ? ' id="' . esc_attr( $id ) . '"' : '';

    $output .= $indent . '<li' . $id . $value . $class_names . $li_attributes . ' role="presentation">';
     
    $attributes = ! empty( $item->attr_title ) ? ' title="' . esc_attr( $item->attr_title ) .'"' : '';
    $attributes .= ! empty( $item->target ) ? ' target="' . esc_attr( $item->target ) .'"' : '';
    $attributes .= ! empty( $item->xfn ) ? ' rel="' . esc_attr( $item->xfn ) .'"' : '';
    $attributes .= ! empty( $item->url ) ? ' href="' . esc_attr( $item->url ) .'"' : '';
     
	  
	$arrow = '';
	  
    if($depth == 0) {
        
        if($args->has_children) {
            $attributes .= ' class="overlay-parent-link overlay-link" role="menuitem" aria-haspopup="true" aria-expanded="false"';
            
        } else {
            $attributes .= ' class="overlay-parent-link overlay-link" role="menuitem" aria-haspopup="false"';
        }
		
		
		if($args->has_children) {
			$arrow = '<div class="overlay-nav-arrow" tabindex="0"><span class="sr-only">Expand '.$item->title.' Menu</span></div>';
		}
        
    } else {
        $attributes .= ' class="overlay-sub-link overlay-link" role="menuitem"';
    }
    
      
    
    $attributes .= ($args->has_children) ? ' ' : ''; 
	  
	
     
    $item_output = $args->before;
	
	$item_output .= '<a'. $attributes .'>';
	$item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
    $item_output .= $arrow.'</a>';
    $item_output .= $args->after;     
     
    $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
      
    

  }

  /**
   * Display Element
   *
   */
  //function display_element( $element, &$children_elements, $max_depth, $depth=0, $args, &$output ) 
	function display_element( $element, &$children_elements, $max_depth, $depth, $args, &$output )  {
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


?>