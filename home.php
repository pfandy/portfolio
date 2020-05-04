<?php get_header(); ?>
	<main class="mycontainer">
		<h1><?php bloginfo('name'); ?></h1>
		<p id="top-description"><?php bloginfo('description'); ?></p>
		<section id="top-works">
			<h2>Works</h2>
			<div id="works-gallery-container" class="alignwide">
				<a id="works-gallery-prev" class="works-gallery-button" href="#">
					<span></span>
					<span></span>
				</a>
				<a id="works-gallery-next" class="works-gallery-button" href="#">
					<span></span>
					<span></span>
				</a>
				<ul id="works-gallery">
					<?php if(have_posts()): while(have_posts()): the_post(); ?>
						<?php if( has_post_thumbnail() ): ?>
							<li class="works-thumbnails">
								<figure>
									<a href="<?php the_permalink(); ?>">
										<?php the_post_thumbnail(); ?>
									</a>
									<figcaption>
										<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
									</figcaption>
								</figure>
							</li>
						<?php endif; ?>
					<?php endwhile; endif; ?>
				</ul>
			</div>
		</section>
		<section id="my-thought">
			<h2>My Thought</h2>
			<div id="top-message" class="alignwide">
				<h3>
					Smiles
				</h3>
				<p id="myquote">
					価値やビジョンに直に触れて感じる『リアルな感動や喜び』、それが最高の笑顔を生み出します。<br>
					最高の笑顔に繋がる『体験への架け橋』を作りたい。
				</p>
				<figure id="smile-photo" class="slider">
					<?php
						function eyecatchPhoto(){
							$path = '../wp/wp-content/themes/myportfolio/top-smiles/';
							$candidates = scandir($path); // 引数のパスのディレクトリ内のファイル名を返す。
							$candidatesNumber = count($candidates) - 2; // 候補の画像の数

							foreach($candidates as &$value){
								$value = '<img class="slider-view-candidates" src="' . $path . $value . '" alt="sliderview-candidates">';
							}
							array_splice($candidates,0, 2); // 配列の0番目から2つの要素（"."、".."）を削除

							for($i = 0; $i < $candidatesNumber; $i++){
								echo $candidates[$i];
							}
						}
						eyecatchPhoto();
					?>
					<nav id="slider-nav">
						<a id="slider-prev">Prev</a>
						<ul id="slider-navList"></ul>
						<a id="slider-next">Next</a>
					</nav>
				</figure>
			</div>
			<div id="wonderful-experience">
				<h3>
					<span class="rotateX">Wonderful Experiences</span>
				</h3>
				<?php
					function experiencePhotos(){
						echo '<ul id="top-experiences-photos" class="alignwide">';

						$displayNumber = 4; // 【表示する画像の数】

						$path = '../wp/wp-content/themes/myportfolio/experiences/';
						$candidates = scandir($path); // 引数のパスのディレクトリ内のファイル名を返す
						$candidatesNumber = count($candidates) - 2; // 候補の画像の数

						foreach ($candidates as &$value){
							$value = '<img src="' . $path . $value . '" alt="experiences" class="experience-photo">';
						}
						array_splice($candidates, 0, 2); // 配列の0番目から2つの要素（"."、".."）を削除
						$check = array_fill(0, $candidatesNumber, 0); // array_fill(a, b, c) a番目からb個分の要素にcの値を代入し、この配列を初期化する。
						$a = 0;
						while($a < $displayNumber){ //表示する画像の数
							$i = rand(0, $candidatesNumber - 1); // 乱数を発生
							if( $check[$i] != 1 ){
								$check[$i] = 1;
								echo '<li>' . $candidates[$i] . '</li>';
								$a++;
							}
						}

						echo '</ul>';
					}
					experiencePhotos();
				?>
				<div id="photo-overlay">
					<figure id="fullscreen-photo-frame">
						<img src="../wp/wp-content/themes/myportfolio/experiences/experience03.png" alt="experience-photo" id="fullscreen-photo">
						<a href="#" class="cancel-button">
							<span></span>
							<span></span>
						</a>
					</figure>
				</div>
			</div>
			
		</section>

	</main>
		
<?php get_footer(); ?>