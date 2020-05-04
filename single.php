<?php get_header(); ?>

	<main class="mycontainer">
		<h1>Works</h1>
		<?php if(have_posts()): while(have_posts()): the_post(); ?>
			<article <?php post_class('mycontainer'); ?>>
			

			<div class="myposthead">
				<?php the_title( '<h2>', '</h2>'); ?>
				<time datetime="<?php echo esc_attr(get_the_date(DATE_W3C)); ?>">
					<?php echo esc_html(get_the_date('Y年F')); ?>
				</time>
				<?php the_category(); ?>
			</div>

			<?php the_content(); ?>
			</article>

		<?php endwhile; endif; ?>
	</main>

<?php get_footer(); ?>