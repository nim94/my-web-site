@extends('layouts.app')

@section('content')
  
<div class="chi_sono title-wrapper">
  <span class="chi_sono title-span"></span>
  <h1 class="chi_sono title">
      {{ get_the_title() }}
  </h1>
</div>
    
    <div class="container">
      <div class="contatti contatti-wrapper">
        <div class="contatti lista-contatti">
          <div class="address">
            <img src="@asset('images/location_blu.png')" alt="indirizzo">
            <span>{{ get_field('indirizzo') }}</span>
          </div>
          <div class="tel">
            <img src="@asset('images/phone_blu.png')" alt="numero di telefono">
            <a href="tel:{{ get_field('telefono') }}">{{ get_field('telefono') }}</a>
          </div>
          <div class="mail">
            <img src="@asset('images/mail_blu.png')" alt="mail">
            <a href="mailto:{{ get_field('mail') }}">{{ get_field('mail') }}</a>
          </div>
        </div>
      </div>
    </div>

@endsection