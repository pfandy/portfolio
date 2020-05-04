<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">
	
	<?php wp_head(); ?>
	<link rel="shortcut icon" href="wp-content/uploads/2020/03/ya-favicon.ico">
</head>
<body <?php body_class(); ?>>
	<?php wp_body_open(); ?>
	
	<header class="myhead mycontainer">
		<div id="headerHamburger" class="alignfull">
			<nav class="hamburgerNav">
				<?php wp_nav_menu( array(
					'theme_location' => 'primary',
				)); ?>
			</nav>
			<?php 
				the_custom_logo();
				if (!has_custom_logo()) {
					bloginfo('name');
				}
			?>
			<a class="menu-trigger" href="#">
				<span></span>
				<span></span>
				<span></span>
			</a>
		</div>
		<div id="headerWhole" class="alignfull">
			<?php 
				the_custom_logo();
				if (!has_custom_logo()) {
					bloginfo('name');
				}
			?>
			<?php if( has_nav_menu('primary')): ?>
				<nav class="mynav">
					<?php wp_nav_menu( array(
						'theme_location' => 'primary',
					)); ?>
				</nav>
			<?php endif; ?>
		</div>
	</header>