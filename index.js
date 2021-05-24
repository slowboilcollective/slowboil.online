$('.navbar-container').hide()
$('.subnavbar-container').hide()

function fade_nav_on_main() {
  if (window.location.pathname !== '/') return
  const y = $(this).scrollTop()
  if (y > 700) {
    $('.navbar-container').fadeIn()
    // $('.subnavbar-container').fadeIn()
  } else {
    $('.navbar-container').fadeOut()
    // $('.subnavbar-container').fadeOut()
  }
}

$(document).scroll(function() {
  fade_nav_on_main()
})

/* ROUTING */
let PATHNAME = window.location.pathname

function goTo(pth) {
  window.history.pushState({}, "", pth)
  $('.page').map(function() {
    if ($(this).data('path') === pth) {
      $(this).show()
    } else {
      $(this).hide()
    }
  })
}

// go to path if given
if (window.location.pathname !== "/") {
  goTo(window.location.pathname)
} else {
  $('.page').map(function() {
    if ($(this).data('path') === '/' || $(this).data('path') === '/about') {
      $(this).show()
    } else {
      $(this).hide()
    }
  })
}


