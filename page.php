<?php get_header(); ?>

	<main class="mycontainer">
		<h1><?php the_title(); ?></h1>
		<div id="content-container">
			<?php if(have_posts()): while(have_posts()): the_post(); ?>
				<?php the_content(); ?>
			<?php endwhile; endif; ?>
		</div>
	</main>

<?php get_footer(); ?>