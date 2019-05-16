@extends('layouts.app')

@section('content')

  @if (!have_posts())
    <p>
      {{ __('Ooops, qualcosa è andato storto! La pagina che stai cercando non esiste', 'sage') }}
    </p>
  @endif
@endsection
