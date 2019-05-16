<!doctype html>
<html {!! get_language_attributes() !!}>
  @include('partials.head')
  <body @php body_class() @endphp>
    @php do_action('get_header') @endphp
    @include('partials.header')
    <div class="wrap">
      <div class="content">
        <div id="barba-wrapper">
          <main class="main barba-container">
            @yield('content')
          </main>
        </div>
      </div>
      @if (App\display_sidebar())
      <div class="container">
        <aside class="sidebar">
          @include('partials.sidebar')
        </aside>
      </div>
      @endif
    </div>
      @php do_action('get_footer') @endphp
      @include('partials.footer')
      @php wp_footer() @endphp  
  </body>
</html>
