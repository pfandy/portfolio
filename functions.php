<?php

//Wordpress管理画面でJavaScriptファイルも編集できるようにする wp4.4以降
//参考　https://nelog.jp/wp_theme_editor_filetypes
function add_js_to_wp_theme_editor_filetypes_ex($default_types){
  $default_types[] = 'js';
  return $default_types;
}
add_filter('wp_theme_editor_filetypes', 'add_js_to_wp_theme_editor_filetypes_ex');

function myportfolio_setup(){

	//テーマ側で有効化することでフロントに適用されるGutenbergのCSS (C)
	add_theme_support('wp-block-styles');
	
	//縦横比を維持したレスポンシブを有効化
	add_theme_support('responsive-embeds');
	
	//テーマ製作者側で用意するCSS、エディタに適用する (E)
	add_theme_support('editor-styles');
	add_editor_style('editor-style.css');
	
	//ページのタイトルを有効化
	add_theme_support('title-tag');
	
	//link, style, scriptをHTML5仕様に適用
	add_theme_support('html5', array(
		'style',
		'script'
	));
	
	//アイキャッチ画像を有効化
	add_theme_support('post-thumbnails');
	
	//テーマにカスタムロゴを設定する。
	add_theme_support('custom-logo');
	
	// 全幅・幅広を有効化
	add_theme_support('align-wide');
	
	// メニューのロケーションを登録
	register_nav_menus( array(
		'primary' => 'ナビゲーション'
	));
	
}
add_action('after_setup_theme', 'myportfolio_setup');

function myportfolio_enqueue(){

	//Google Fontsの読み込み
	wp_enqueue_style(
		'myfonts',
		'https://fonts.googleapis.com/css?family=Berkshire+Swash&display=swap',
		array(),
		null
	);
	
	//テーマ製作者側で用意するCSS、フロントに適用する (D)
	wp_enqueue_style(
		'myportfolio-style',
		get_stylesheet_uri(),
		array(),
		filemtime(get_theme_file_path('style.css'))
	);
	
	//テーマ製作者側で用意するJS
	wp_enqueue_script( 
		'main-script', 
		get_template_directory_uri() . '/js/main.js' ,
		array(),
		filemtime(get_theme_file_path( 'js/main.js' )),
		true
	);
	
}
add_action('wp_enqueue_scripts', 'myportfolio_enqueue');