/* global $, Materialize */

$(document).ready(function () {
  $('.button-collapse').sideNav()
  $('.dropdown-button').dropdown({
    constrainWidth: false
  })

  Materialize.updateTextFields()
})
