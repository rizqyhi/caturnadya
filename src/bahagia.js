import Alpine from 'alpinejs'
import intersect from '@alpinejs/intersect'
import AOS from 'aos'

Alpine.plugin(intersect)

window.Alpine = Alpine

Alpine.start()
AOS.init()
