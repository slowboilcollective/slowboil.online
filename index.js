var is_mobile = window.matchMedia("(max-device-width: 680px)").matches
var is_animating = false

function fade_nav_on_main() {
  if (is_mobile) return
  const y = $(this).scrollTop()
  if (y > 700) {
    $('.navbar-container').fadeIn()
  } else {
    $('.navbar-container').fadeOut()
  }
}

function onScroll() {
  const st = $(this).scrollTop()
  if (!is_animating) fade_nav_on_main()
  if (!is_mobile && st > 1200 && st < 2400) {
    $('#participants').fadeIn()
  } else {
    $('#participants').fadeOut()
  }
  if (st > 5300) {
    loadIframe()
  }

  if (st < $('#workshop-content').offset().top) {
    $('#workshop-iframe').attr('scrolling', 'no')
  } else {
    $('#workshop-iframe').attr('scrolling', 'auto')
  }
}

$(document).scroll(onScroll)

function goTo(pth) {
  is_animating = true
  $('#mobile-navbar').hide();
  window.history.pushState({}, "", pth)
  $('.page').map(function() {
    if ($(this).data('path') === pth) {
    console.log($(this).data('path'))
    console.log(pth)

      $('html, body').animate({
        scrollTop: $(this).offset().top
      }, 1000);
    }
  })
  is_animating = false
}

$('.participants-participant').click(function() {
  const info = $(this).next()
  info.slideToggle()
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

function loadIframe() {
  const content = '#workshop-content'
  const loading = '#workshop-loading'
  const iframe = '#workshop-iframe'
  const source = 'https://docs.google.com/document/d/e/2PACX-1vSs3c3MrLNCt3WoWh2PjkgNFeJpCnGr4JnMxsDMm_cFcjg1NlSCOF90Q_CIj4-fuiy2evEAMqeGtKBo/pub?embedded=true'

  // $("body").css("overflow", "hidden");
  $.get(source, (data, status) => {
    $(iframe).contents().find('head').append('<base target="_blank">')
    const modData = data.replace(
      /href="(https\:\/\/www\.google\.com\/url\?q\=)(.*?)(\&)([^\'\"]+)(\")/g,
      (match, p1, p2) => {
        p2 = p2.replace('%23', '#')
        return `href="${p2}"`
      }
    )
    $(iframe).contents().find("body").html('');
    $(iframe).contents().find("body").append(modData)
    $(loading).hide()
    $(content).css('display', 'flex')
    $(iframe).contents().find("body").append('<style>p, span { color: rgb(34, 39, 90)!important; font-size: 14pt!important; padding-top: 30px!important; } a { color: var(--dark-blue)!important; } table { width: 100%; margin: auto; } .title > span { font-size: 45pt!important; font-weight: bold; } body { margin: 0 auto !important; max-width: 600px !important; padding-bottom: 10em !important; }</style>')

    if (is_mobile) {
      $(iframe).contents().find('body').append('<style>body { margin: 0 1em !important; }')
    }
  })
}

$('.navbar-container').hide()
onScroll()
loadIframe()
