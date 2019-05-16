@extends('layouts.app')

@section('content')

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
        

        <div class="single_works content">
            {!! $post->post_content !!}
        </div>
    </div>

@endsection