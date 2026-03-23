<?php
/**
 * Template part for displaying a message that posts cannot be found
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package SIG
 */

?>
<section class="no-results not-found">
	<header class="page-header">
		<h1 class="page-title is-style-small text-center"><?php esc_html_e( 'Nothing Found', 'sig' ); ?></h1>
	</header>

	<div class="page-content">
		<?php
		if ( is_search() ) :
			?>

			<p class="text-center is-style-medium mb-5"><?php esc_html_e( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'sig' ); ?></p>
			<?php
			get_search_form();

		else :
			?>

			<p class="text-center is-style-medium mb-5"><?php esc_html_e( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'sig' ); ?></p>
			<?php
			get_search_form();

		endif;
		?>
	</div>
</section>