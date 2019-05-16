<article @php post_class() @endphp>

  <div class="container">
    <div class="single_works thumbnail-img">
        @if( has_post_thumbnail() ) {!! get_the_post_thumbnail() !!} @endif  
    </div>  
    <div class="single_works title-wrapper">
        <span class="single_works title-span"></span>
        <h1 class="single_works title">
            {{ get_the_title() }}
        </h1>
  </div>
    
  <div class="entry-meta">
    @include('partials/entry-meta')
  </div>

  <div class="entry-content">
    @php the_content() @endphp
  </div>

  <footer>
    {!! wp_link_pages(['echo' => 0, 'before' => '<nav class="page-nav"><p>' . __('Pagine:', 'sage'), 'after' => '</p></nav>']) !!}
  </footer>
  @php comments_template('/partials/comments.blade.php') @endphp
</article>
