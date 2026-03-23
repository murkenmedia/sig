<form role="search" method="get" class="search-form" action="<?php echo esc_url(home_url( '/')); ?>">
    <label class="search-label">
        <span class="screen-reader-text"><?php echo _x( 'Search for:', 'label', 'sig' ) ?></span>
        <input type="search" class="search-field" placeholder="<?php echo esc_attr_x( 'Search', 'placeholder', 'sig' ) ?>" value="<?php echo get_search_query() ?>" name="s" title="<?php echo esc_attr_x( 'Search for:', 'label', 'sig' ) ?>" />
    </label>
	<div class="submit-wrap">
    <input type="submit" class="search-submit" value="<?php echo esc_attr_x( 'Search', 'submit button', 'sig' ) ?>" />
	</div>
</form>
