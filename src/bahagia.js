import Alpine from 'alpinejs'
import intersect from '@alpinejs/intersect'
import AOS from 'aos'

Alpine.plugin(intersect)

window.Alpine = Alpine

Alpine.data('bahagia', () => ({
  showFooter: false,
  guest: {},
  disableRsvpButton: false,
  get isValidGuest() {
    return this.guest.name && this.guest.name !== ''
  },
  get isAttending() {
    return this.guest.rsvp && this.guest.rsvp === 'yes'
  },
  get isNotAttending() {
    return this.guest.rsvp && this.guest.rsvp === 'no'
  },
  get isAlreadyRsvp() {
    return this.guest.rsvp && this.guest.rsvp !== ''
  },
  async doRsvp(attending) {
    this.disableRsvpButton = true

    const response = await (
      await fetch(
        `/api/rsvp?name=${new URLSearchParams(location.search).get(
          'for'
        )}&attending=${attending}`
      )
    ).json()

    this.disableRsvpButton = false
    this.guest = response
  },
  async init() {
    this.guest = await (
      await fetch(
        `/api/get-guest?name=${new URLSearchParams(location.search).get('for')}`
      )
    ).json()
  }
}))

Alpine.start()
AOS.init()
