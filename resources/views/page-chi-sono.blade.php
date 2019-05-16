@extends('layouts.app')

@section('content')
  
    <div class="chi_sono title-wrapper">
        <span class="chi_sono title-span"></span>
        <h1 class="chi_sono title">
            {{ get_the_title() }}
        </h1>
    </div>
    

    <div class="chi_sono content">
        {!! $post->post_content !!}
        <img src="@asset('images/mia-foto.png')" alt="mia foto" class="chi_sono mia-foto">
    </div>

    <div class="chi_sono title-servizi-wrapper">
        <span class="chi_sono title-servizi-span"></span>
        <h2 class="chi_sono title-servizi">
            {{ __('SERVIZI', 'sage') }}
        </h2>
    </div>

    <div class="container">
        <ul class="chi_sono lista-servizi">
            <li>Brand design</li>
            <li>Web Development
                <ul class="chi_sono servizi-web_development">
                    <li>Design</li>
                    <li>User interface</li>
                    <li>User experience</li>
                    <li>Search Engine Optimization</li>
                </ul>
            </li>
            <li>{{ __('Grafica per la stampa', 'sage') }}</li>
        </ul>
    </div>

@endsection