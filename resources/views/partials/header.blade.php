<header class="banner">
  <div class="container">
    <!--Navbar mobile-->
    <nav class="navbar navbar-light amber lighten-4 mb-4">
        <!-- Collapse button -->
        <button class="navbar-toggler first-button" type="button" data-toggle="collapse" data-target="#navbarSupportedContent20"
          aria-controls="navbarSupportedContent20" aria-expanded="false" aria-label="Toggle navigation">
          <div class="animated-icon1"><span></span><span></span><span></span></div>
        </button>
        <!-- Collapsible content -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent20">
          <!-- Links -->
          @if (has_nav_menu('primary_navigation'))
            {!! wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav']) !!}
          @endif
          <!-- Links -->
      </div>
        <!-- Collapsible content -->
    </nav>
    <!--/.Navbar-->
    <nav class="nav-primary">
      @if (has_nav_menu('primary_navigation'))
        {!! wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav']) !!}
      @endif
    </nav>
  </div>
</header>
