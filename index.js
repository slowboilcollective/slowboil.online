var is_mobile = window.matchMedia("(max-device-width: 480px)").matches

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
  if (is_mobile) return
  fade_nav_on_main()
})

/* ROUTING */
let PATHNAME = window.location.pathname

function goTo(pth) {
  $('#mobile-navbar').toggle();
  window.history.pushState({}, "", pth)
  window.scrollTo(0,0)
  $('.page').map(function() {
    if ($(this).data('path') === pth) {
      $(this).show()
    } else {
      $(this).hide()
    }
  })
}

// go to path if given
if (window.location.pathname !== "/" || window.location.pathname === '') {
  goTo(window.location.pathname)
} else {
  $('.navbar-container').hide()
  $('.subnavbar-container').hide()
  $('.page').map(function() {
    if ($(this).data('path') === '/' || $(this).data('path') === '/about') {
      $(this).show()
    } else {
      $(this).hide()
    }
  })
}

$('.participants-participant').click(function() {
  const info = $(this).next()
  info.slideDown()
})

$('.participants-participant-info').mouseout(function() {
  $(this).slideUp()
})


$('#mobile-hamburger').click(function() {
  $('#mobile-navbar').toggle();
})


if (is_mobile) {
  $('.navbar-container').hide()
  $('.subnavbar-container').hide()
  $('#mobile-navbar').hide()
}
