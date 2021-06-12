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
  $('#mobile-navbar').hide();
  window.history.pushState({}, "", pth)
  window.scrollTo(0,0)
  $('.page').map(function() {
    if ($(this).data('path') === pth) {
      $(this).show()
    } else {
      $(this).hide()
    }
  })
  if (window.location.pathname === "/workshops") { loadIframe() }
  else { $("body").css("overflow", "auto") }
}

function loadIframe() {
  const content = '#workshop-content'
  const loading = '#workshop-loading'
  const iframe = '#workshop-iframe'
  const source = 'https://docs.google.com/document/d/e/2PACX-1vSs3c3MrLNCt3WoWh2PjkgNFeJpCnGr4JnMxsDMm_cFcjg1NlSCOF90Q_CIj4-fuiy2evEAMqeGtKBo/pub?embedded=true'

  $("body").css("overflow", "hidden");
  $.get(source, (data, status) => {
    $(iframe).contents().find('head').append('<base target="_blank">')
    const modData = data.replace(
      /href="(https\:\/\/www\.google\.com\/url\?q\=)(.*?)(\&)([^\'\"]+)(\")/g,
      (match, p1, p2) => {
        p2 = p2.replace('%23', '#')
        return `href="${p2}"`
      }
    )
    console.log(modData)
    $(iframe).contents().find("body").html('');
    $(iframe).contents().find("body").append(modData)
    $(loading).hide()
    $(content).css('display', 'flex')
    $(iframe).contents().find("body").append('<style>p, span { color: rgb(34, 39, 90)!important; font-size: 34pt!important; padding-top: 30px!important; } a { color: var(--dark-blue)!important; } table { width: 100%; margin: auto; } .title > span { font-size: 45pt!important; font-weight: bold; }</style>')
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

if (window.location.pathname === "/workshops") loadIframe()
