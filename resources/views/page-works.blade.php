@extends('layouts.app')

@php global $post; @endphp

@section('content')

  <div class="works title-wrapper">
    <span class="works title-span"></span>
    <h1 class="works title">
        {{ get_the_title() }}
    </h1>
  </div>

  <div class="container">
    <div class="row">

        @php
          $query_works = new WP_Query( array( 'post_type'      => 'works',
                                              'order'          => 'ASC',
                                              'orderby'        => 'date',
                                              'posts_per_page' =>  -1 ) );
          if( $query_works->have_posts() ) : 
              while ( $query_works->have_posts() ) : $query_works->the_post();
        @endphp

      <div class="col-12 col-md-6 col-lg-4 works work">
        <a href="{{ get_permalink() }}">
          <div class="works work-wrapper">
            @php
              if( has_post_thumbnail() ){
                  echo get_the_post_thumbnail();
              }
            @endphp
            <span class="works work-title">{{ get_the_title() }}</span>
          </div>
        </a>
      </div>
      @endwhile
      @endif  
    </div>
  </div>

@endsection