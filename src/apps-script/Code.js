function doGet(request) {
  if (request.parameter.action && request.parameter.action === 'getGuest') {
    return JsonResponse(getGuest(request.parameter.name))
  }

  if (request.parameter.action && request.parameter.action === 'doRsvp') {
    return JsonResponse(
      doRsvp(request.parameter.name, request.parameter.attending)
    )
  }

  return JsonResponse({
    success: false,
    message: 'invalid_action'
  })
}

function JsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  )
}

function getGuest(name) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Guestlist')
  var logs = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Logs')
  var guest = sheet.getRange('A:A').createTextFinder(name).findNext()
  var result

  if (!guest) {
    result = {
      success: false,
      message: 'guest_not_found'
    }
  } else {
    result = {
      success: true,
      name: guest.getValue(),
      rsvp: guest.offset(0, 1).getValue()
    }
  }

  logs.appendRow([JSON.stringify(result)])

  return result
}

function doRsvp(name, attending) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Guestlist')
  var logs = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Logs')
  var guest = sheet.getRange('A:A').createTextFinder(name).findNext()
  var result

  if (!guest) {
    result = {
      success: false,
      message: 'guest_not_found'
    }
  } else {
    guest.offset(0, 1).setValue(attending)
    guest.offset(0, 2).setValue(new Date().toISOString())

    result = {
      success: true,
      message: `rsvped_${attending}`
    }
  }

  logs.appendRow([JSON.stringify(result)])

  return result
}
